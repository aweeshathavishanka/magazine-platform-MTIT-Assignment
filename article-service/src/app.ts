import cors from "cors";
import express from "express";
import helmet from "helmet";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import { notFoundHandler } from "./common/middlewares/notFoundHandler";
import { router } from "./routes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(globalErrorHandler);
