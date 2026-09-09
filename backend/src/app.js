import express from "express";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter)

export default app;