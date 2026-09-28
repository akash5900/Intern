import express from "express";
import Authmiddleware from "../middlewares/authMiddleware.js";
import AdminAuthMiddleware from "../middlewares/adminMiddleware.js";
import { createAddress, getUserAddresses, getAllAddresses, updateAddress, deleteAddress } from "../controller/addressController.js";

const router = express.Router();

router.post("/create", Authmiddleware, createAddress);
router.get("/useraddresses", Authmiddleware, getUserAddresses);
router.get("/alladdresses", AdminAuthMiddleware, getAllAddresses)
router.put("/:id", Authmiddleware, updateAddress)
router.delete("/:id", Authmiddleware, deleteAddress)

export default router;