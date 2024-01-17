import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.code = err.code || 500;
  err.status = err.status || "error";

  res.status(err.code).json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;
