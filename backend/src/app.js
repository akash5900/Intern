import express from "express";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/categoryRoutes.js";
import userRouter from "./routes/userRoutes.js"

import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);

export default app;