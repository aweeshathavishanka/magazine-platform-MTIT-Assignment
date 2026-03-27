import dotenv from "dotenv";
import { Environment } from "../types";

dotenv.config();

const requiredEnvVars = ["MONGODB_URL"];

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
  port: Number(process.env.PORT ?? 3000),
  mongodbUrl: process.env.MONGODB_URL as string,
  serviceName: "article-service",
  swaggerDevUrl: process.env.SWAGGER_DEV_URL ?? "http://localhost:3000",
  swaggerProdUrl: process.env.SWAGGER_PROD_URL ?? "https://api.example.com",
};
