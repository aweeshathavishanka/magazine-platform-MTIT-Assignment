export const successResponse = (
  message: string,
  statusCode: number,
  data: unknown
) => {
  return {
    success: true,
    message,
    statusCode,
    data
  };
};

export const errorResponse = (
  code: number,
  message: string,
  service = "comment-service"
) => {
  return {
    status: "error",
    code,
    message,
    service,
    timestamp: new Date().toISOString()
  };
};