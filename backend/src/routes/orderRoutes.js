import express from "express";
import { createOrder, getOrders, getUserOrders, cancelOrder, updateOrderStatus, deleteOrder } from "../controller/orderController.js";
import Authmiddleware from "../middlewares/authMiddleware.js";
import AdminAuthMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", Authmiddleware, createOrder);
router.get("/allorders", AdminAuthMiddleware, getOrders);
router.get("/userorder", Authmiddleware, getUserOrders);
router.put("/status/:id", AdminAuthMiddleware, updateOrderStatus);
router.put("/:id/cancel/:productId", Authmiddleware, cancelOrder)
router.delete("/:id/product/:productId", deleteOrder)

export default router;