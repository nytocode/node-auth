class AppError extends Error {
  status: "fail" | "error";
  code: number;
  isOperational: boolean;

  constructor(message: string, code: number) {
    super(message);
    this.status = `${code}`.startsWith("4") ? "fail" : "error";
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
