import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../../config/env";
import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../utils/httpStatus";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const timestamp = new Date().toISOString();

  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      code: HTTP_STATUS.BAD_REQUEST,
      message: "Invalid request data",
      service: env.serviceName,
      timestamp,
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
      service: env.serviceName,
      timestamp,
      details: err.details,
    });
    return;
  }

  const fallbackStatus =
    (err as Error & { statusCode?: number }).statusCode ??
    HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(fallbackStatus).json({
    status: "error",
    code: fallbackStatus,
    message: err.message || "Unexpected server error",
    service: env.serviceName,
    timestamp,
  });
};
