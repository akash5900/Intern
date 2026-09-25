import express from "express";
import { createOrder } from "../controller/orderController.js";
import Authmiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", Authmiddleware, createOrder);

export default router;