import express, { Application } from "express";
import * as dotenv from "dotenv";
import SpotifyWebApi from "spotify-web-api-node";
import lyricsFinder from "lyrics-finder";
import bodyParser from "body-parser";
import path from "path";
import sequelize from "./api/database/db.config";
import Favorites from "./api/model/Favorites";

const buildPath = path.join(__dirname, "build");

dotenv.config();
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => console.log("db is ready"));

const app: Application = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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
  app.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
  });
} catch (error) {
  console.log(`Error occured: ${error.message}`);
}
