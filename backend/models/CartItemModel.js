import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const CartItems = db.define(
    "cartitems",
    {
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
        food_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
    }
);

export default CartItems;
