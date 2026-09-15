import {
  userSignup,
  userLogin,
  allUsers,
  deleteUser,
  adminLogin,
  adminSignup
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.get("/allusers", allUsers);

router.post("/login", userLogin);

router.post("/signup", userSignup);

router.post("/adminsignup", adminSignup);

router.post("/adminlogin", adminLogin)

router.delete("/:id", deleteUser);

export default router;
