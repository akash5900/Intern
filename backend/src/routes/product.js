import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/allproducts", getProducts);
router.get("/category", getProductsByCategory);
router.get("/:id", getProduct);
router.post("/createproduct", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
