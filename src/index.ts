import express, { Application } from "express";
// import * as dotenv from "dotenv";
import "dotenv/config";
import SpotifyWebApi from "spotify-web-api-node";
import lyricsFinder from "lyrics-finder";
import bodyParser from "body-parser";
import path from "path";
import "module-alias/register";
import sequelize from "./api/database/db.config";
import Favorites from "./api/model/Favorites";
import accessEnv from "#root/helpers/accessEnv";
import "#root/db/connection";
// import "#root/server/startServer";
import { ApolloServer } from "apollo-server-express";
import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/typeDefs";
import cors from "cors";

const PORT = accessEnv("PORT", 3001);
const REDIRECT_URI = accessEnv("REDIRECT_URI");
const CLIENT_ID = accessEnv("CLIENT_ID");
const CLIENT_SECRET = accessEnv("CLIENT_SECRET");

const app: Application = express();
const buildPath = path.join(__dirname, "build");

sequelize.sync().then(() => console.log("db is ready"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));
app.use(cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

async function startServer() {
  const apolloServer = new ApolloServer({ resolvers, typeDefs});
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });
}
startServer();

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(
      req.query.artist as string,
      req.query.track as string
    )) || "No Lyrics Found";
  res.json({ lyrics });
});

app.get("/api/favorites", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page as string);
  const sizeAsNumber = Number.parseInt(req.query.size as string);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
    size = sizeAsNumber;
  }

  const favorites = await Favorites.findAndCountAll({
    limit: size,
    offset: page * size,
    order: [["id", "ASC"]],
  });
  res.send({
    content: favorites.rows,
    totalPages: Math.ceil(favorites.count / size),
    totalFavorites: favorites.count,
  });
});

// app.post("/api/addfavorite", async (req, res) => {
//     //do something
// });

try {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) console.log(`Error occured: ${error.message}`);
}
