import { Router } from "express";

export const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Article service is healthy",
    statusCode: 200,
    data: { uptime: process.uptime() },
  });
});
