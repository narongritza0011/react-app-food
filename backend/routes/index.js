import express from "express";
import upload from "../upload.js";
import {
  getUsers,
  Register,
  Login,
  Logout,
  GetProfile,
  UpdateProfile,
} from "../controllers/Users.js";

import {
  getUsersList,
  GetUserById,
  UpdateUserById,
  deleteUserById,
  ResetPasswordUserById,
} from "../controllers/UserController.js";
import {
  createMenuFood,
  getAllMenuFoods,
  updateMenuFood,
  deleteMenuFood, getFoodById
} from "../controllers/FoodController.js";

import {
  GetAddressByUserId,
  UpdateAddressByUserId,

} from "../controllers/AddressController.js";

import {
  getFoods,
} from "../controllers/users/Food.js";

import {
  addToCart, getCart
} from "../controllers/users/Cart.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

//auth
router.get("/api/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//profile
router.get("/api/profile/:id", verifyToken, GetProfile);
router.put("/api/profile/:id", verifyToken, UpdateProfile);

//user crud
router.get("/api/users/list", verifyToken, getUsersList);
router.get("/api/user/:id", verifyToken, GetUserById);

router.put("/api/users/:id", verifyToken, UpdateUserById);

router.delete("/api/users/:id", verifyToken, deleteUserById);
router.post("/api/users/reset-password/", verifyToken, ResetPasswordUserById);

//food crud
router.post("/api/menu-foods", verifyToken, upload.single("image"), createMenuFood);
router.get("/api/menu-foods", verifyToken, getAllMenuFoods);
router.get("/api/menu-foods/:id", verifyToken, getFoodById);
router.put("/api/menu-foods/:id", verifyToken, upload.single("image"), updateMenuFood);
router.delete("/api/menu-foods/:id", verifyToken, deleteMenuFood);
//address 
// router.post('/api/address/', createAddress)
router.get('/api/address/:id', verifyToken, GetAddressByUserId)
router.put('/api/address/:id', verifyToken, UpdateAddressByUserId)



//user 
//food
router.get('/user/api/foods/', getFoods)


//Cart
router.post('/user/api/cart/:id', addToCart)

router.get('/user/api/cart/:id', getCart)


export default router;
