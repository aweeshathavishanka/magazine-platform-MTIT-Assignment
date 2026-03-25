import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// USER SERVICE
app.use(
  "/api/v1/users",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  }),
);

// OTHER SERVICES (future)
app.use(
  "/api/v1/articles",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
  }),
);

app.use(
  "/api/v1/categories",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
  }),
);

app.use(
  "/api/v1/comments",
  createProxyMiddleware({
    target: "http://localhost:3004",
    changeOrigin: true,
  }),
);

app.use(
  "/api/v1/subscriptions",
  createProxyMiddleware({
    target: "http://localhost:3005",
    changeOrigin: true,
  }),
);

app.use(
  "/api/v1/media",
  createProxyMiddleware({
    target: "http://localhost:3006",
    changeOrigin: true,
  }),
);

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
