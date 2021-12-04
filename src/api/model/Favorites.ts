import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db.config";

interface FavoritesAttributes {
    id: number;
    title: string;
}

class Favorites extends Model<FavoritesAttributes>
    implements FavoritesAttributes {
        public id!: number;
        public title!: string;

        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

Favorites.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "favorites",
        timestamps: false,
    }
);

export default Favorites;