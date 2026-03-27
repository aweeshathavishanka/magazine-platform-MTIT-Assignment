import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import commentRoutes from "./routes/comment.routes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5004;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
  res.send("Comment Service is running");
});

app.use("/api/v1/comments", commentRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Comment Service API",
      version: "1.0.0",
      description: "API documentation for Comment Service"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Route not found",
    service: "comment-service",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Comment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});