import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// @ts-ignore
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Comment Service API",
      version: "1.0.0",
      description: "Full Comment Microservice for Magazine Platform - Dinidu"
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    tags: [{ name: "Comments", description: "All comment related endpoints" }]
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/comments", commentRoutes);

// MongoDB connection (with fallback)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/magazine-platform";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

app.listen(PORT, () => {
  console.log(`🚀 Comment Service running on http://localhost:${PORT}`);
  console.log(`📖 Swagger docs: http://localhost:${PORT}/api-docs`);
});