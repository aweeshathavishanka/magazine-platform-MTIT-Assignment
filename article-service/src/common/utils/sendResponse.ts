import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export const sendResponse = <T>(
  res: Response,
  payload: ApiResponse<T>,
): void => {
  res.status(payload.statusCode).json(payload);
};
