import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const notFound = (req: Request, res: Response): void => {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('❌ Unhandled error:', err);
  sendError(res, err.message || 'Internal server error.', 500);
};
