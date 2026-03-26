import dotenv from "dotenv";
import { Environment } from "../types";

dotenv.config();

const requiredEnvVars = ["MONGODB_URI"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const parseEnvironment = (value?: string): Environment => {
  if (value === "production" || value === "test" || value === "development") {
    return value;
  }

  return "development";
};

export const env = {
  nodeEnv: parseEnvironment(process.env.NODE_ENV),
  port: Number(process.env.PORT ?? 3002),
  mongodbUrl: process.env.MONGODB_URI as string,
  serviceName: "category-service",
  swaggerDevUrl: process.env.SWAGGER_DEV_URL ?? "http://localhost:3002",
  swaggerProdUrl: process.env.SWAGGER_PROD_URL ?? "https://api.example.com",
  articleServiceUrl: process.env.ARTICLE_SERVICE_URL ?? "http://localhost:3000",
};