import express from "express";
import Authmiddleware from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controller/cartController.js";

const router = express.Router();

router.post("/add", Authmiddleware, addToCart);
router.get("/usercart", Authmiddleware, getCart);
router.delete("/:id", removeFromCart);

export default router;
