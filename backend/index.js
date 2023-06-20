import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import Foods from "./models/FoodModel.js";
import Address from "./models/AddressModel.js";
import Cart from "./models/CartModel.js";
import CartItem from "./models/CartItemModel.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  await Users.sync();
  await Foods.sync();
  await Address.sync();
  await Cart.sync();
  await CartItem.sync();

} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.static('public'))

app.listen(5000, () => console.log("Server running at port 5000"));
