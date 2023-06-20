import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Address = db.define(
    "address",
    {
        house_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        village_no: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amphur: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: true,
        }, tel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Address;
