import { Router } from "express";
import { categoryRouter } from "../modules/category/category.routes";

export const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Category service is healthy",
    statusCode: 200,
    data: { uptime: process.uptime() },
  });
  
});

router.use(categoryRouter);
