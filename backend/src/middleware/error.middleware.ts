import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: {
      message: `Route ${req.originalUrl} not found`
    }
  });
};
