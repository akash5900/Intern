import express from "express";
import { createCategory, getCategory, getSingleCategory,  updateCategory, deleteCategory } from "../controller/categoryController.js";

const router = express.Router();

router.get("/allcategory", getCategory);
router.get("/:id", getSingleCategory);
router.post("/create", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory)

export default router;