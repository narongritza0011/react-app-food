import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Carts = db.define(
    "carts",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Carts;
