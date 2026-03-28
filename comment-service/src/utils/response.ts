export const successResponse = (res: any, message: string, data: any = null, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    data
  });
};

export const errorResponse = (res: any, message: string, code = 500, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    code,
    message,
    service: "comment-service",
    timestamp: new Date().toISOString()
  });
};