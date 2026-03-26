import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// SERVICES (from .env)
const USER_SERVICE = process.env.USER_SERVICE_URL;
const ARTICLE_SERVICE = process.env.ARTICLE_SERVICE_URL;
const CATEGORY_SERVICE = process.env.CATEGORY_SERVICE_URL;
const COMMENT_SERVICE = process.env.COMMENT_SERVICE_URL;
const SUBSCRIPTION_SERVICE = process.env.SUBSCRIPTION_SERVICE_URL;
const MEDIA_SERVICE = process.env.MEDIA_SERVICE_URL;

// USER SERVICE
app.use(
  "/api/v1/users",
  createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
  }),
);

// ARTICLE SERVICE
app.use(
  "/api/v1/articles",
  createProxyMiddleware({
    target: ARTICLE_SERVICE,
    changeOrigin: true,
  }),
);

// CATEGORY SERVICE
app.use(
  "/api/v1/categories",
  createProxyMiddleware({
    target: CATEGORY_SERVICE,
    changeOrigin: true,
  }),
);

// COMMENT SERVICE
app.use(
  "/api/v1/comments",
  createProxyMiddleware({
    target: COMMENT_SERVICE,
    changeOrigin: true,
  }),
);

// SUBSCRIPTION SERVICE
app.use(
  "/api/v1/subscriptions",
  createProxyMiddleware({
    target: SUBSCRIPTION_SERVICE,
    changeOrigin: true,
  }),
);

// MEDIA SERVICE
app.use(
  "/api/v1/media",
  createProxyMiddleware({
    target: MEDIA_SERVICE,
    changeOrigin: true,
  }),
);

// Swagger routes (optional but recommended)
app.use(
  "/api-docs/users",
  createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/users": "/api-docs" },
  }),
);

app.use(
  "/api-docs/articles",
  createProxyMiddleware({
    target: ARTICLE_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/articles": "/api-docs" },
  }),
);

app.use(
  "/api-docs/categories",
  createProxyMiddleware({
    target: CATEGORY_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/categories": "/api-docs" },
  }),
);

app.use(
  "/api-docs/comments",
  createProxyMiddleware({
    target: COMMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/comments": "/api-docs" },
  }),
);

app.use(
  "/api-docs/subscriptions",
  createProxyMiddleware({
    target: SUBSCRIPTION_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/subscriptions": "/api-docs" },
  }),
);

app.use(
  "/api-docs/media",
  createProxyMiddleware({
    target: MEDIA_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/api-docs/media": "/api-docs" },
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
