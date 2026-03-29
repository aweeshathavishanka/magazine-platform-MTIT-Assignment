import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/db";

import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API documentation for User Service",
    },
    servers: [
      {
        url: BASE_URL,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes

// Swagger route
app.use(
  "/api/v1/users/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

app.use("/api/v1/users", userRoutes);

// health check
app.get("/", (req, res) => {
  res.send("User Service Running");
});

// Connect DB then start server
connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
  });
});
