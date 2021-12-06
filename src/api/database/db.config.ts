import {Sequelize} from "sequelize";
import "dotenv/config";
import "module-alias/register";
import accessEnv from "#root/helpers/accessEnv";

const CONNECTION_STRING = accessEnv("CONNECTION_STRING");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
             rejectUnauthorized: false
        }
    }
});

export default sequelize;
