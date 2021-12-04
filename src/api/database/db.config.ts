import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
             rejectUnauthorized: false
        }
    }
});

export default sequelize;
