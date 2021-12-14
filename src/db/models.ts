import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    defaultScope: {
        attributes: { exclude: ["deletedAt"]}
    },
    paranoid: true,
    tableName: "users"
})
export class User extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER.UNSIGNED
    })
    id!: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    name!: string;

    @HasMany(() => Favorite)
    favorites!: Favorite[];
}


@Table({
    defaultScope: {
        attributes: { exclude: ["deletedAt"]}
    },
    paranoid: true,
    tableName: "favorites"
})
export class Favorite extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER.UNSIGNED
    })
    id!: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER.UNSIGNED
    })
    @ForeignKey(() => User)
    userId!: string;

    @Column({
        allowNull: false,
        type: DataType.STRING
    })
    title!: string;

    @BelongsTo(() => User)
    user!: User;
}

export default [User, Favorite];