import { Router } from "express";
import { articleRouter } from "../modules/article/article.routes";

export const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Article service is healthy",
    statusCode: 200,
    data: { uptime: process.uptime() },
  });
});

router.use(articleRouter);
