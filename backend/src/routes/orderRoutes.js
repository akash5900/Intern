import express from "express";
import { createOrder, getOrders, deleteOrder } from "../controller/orderController.js";
import Authmiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/allorders", getOrders)
router.post("/create", Authmiddleware, createOrder);
router.delete("/:id", deleteOrder)

export default router;