import {
  userSignup,
  userLogin,
  allUsers,
  userLogout,
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.get("/allusers", allUsers);
router.get("/login", userLogin);

router.post("/signup", userSignup);

router.delete("/:id", userLogout);

export default router;
