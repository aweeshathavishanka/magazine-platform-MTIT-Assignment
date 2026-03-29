import http from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { env } from "./config/env";

let server: http.Server;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  server = app.listen(env.port, "0.0.0.0", () => {
    console.log(`category-service running on port ${env.port}`);
  });
};

const gracefulShutdown = async (signal: NodeJS.Signals): Promise<void> => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      await disconnectDatabase();
      console.log("Shutdown complete.");
      process.exit(0);
    });
  } else {
    await disconnectDatabase();
    process.exit(0);
  }

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

startServer().catch((error) => {
  console.error("Failed to start category-service:", error);
  process.exit(1);
});
