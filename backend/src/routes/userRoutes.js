import {
  userSignup,
  userLogin,
  allUsers,
  deleteUser,
  adminLogin,
  adminSignup,
  getProfie,
} from "../controller/userController.js";
import AdminAuthMiddleware from "../middlewares/adminMiddleware.js";
import Authmiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/allusers", allUsers);

router.get("/profile", Authmiddleware, getProfie);

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.post("/adminsignup", adminSignup);

router.post("/adminlogin", adminLogin);

router.delete("/:id", deleteUser);

export default router;
