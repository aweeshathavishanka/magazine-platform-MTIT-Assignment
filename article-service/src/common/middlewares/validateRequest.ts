import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });

    next();
  };
};
