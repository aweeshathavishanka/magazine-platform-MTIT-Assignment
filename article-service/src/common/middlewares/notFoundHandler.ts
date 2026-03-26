import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../utils/httpStatus";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  (error as Error & { statusCode?: number }).statusCode = HTTP_STATUS.NOT_FOUND;
  next(error);
};
