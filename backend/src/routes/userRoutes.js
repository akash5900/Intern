import {
  userSignup,
  userLogin,
  allUsers,
  deleteUser,
  adminLogin,
  adminSignup,
  getProfie,
  userLogout,
  adminLogout,
  editUser
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

router.post("/logout", userLogout);

router.post("/adminlogout", adminLogout);

router.get("/admin/me", AdminAuthMiddleware, (req, res) => {
  return res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

router.patch("/profile/edit", Authmiddleware, editUser);

router.delete("/:id", deleteUser);

export default router;
