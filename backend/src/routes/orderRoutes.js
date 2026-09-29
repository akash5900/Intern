import express from "express";
import { createOrder, getOrders, getUserOrders, deleteOrder } from "../controller/orderController.js";
import Authmiddleware from "../middlewares/authMiddleware.js";
import AdminAuthMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", Authmiddleware, createOrder);
router.get("/allorders", AdminAuthMiddleware, getOrders);
router.get("/userorder", Authmiddleware, getUserOrders)
router.delete("/:id", deleteOrder)

export default router;