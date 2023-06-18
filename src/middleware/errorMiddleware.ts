import HandlerError from '../handler/handlerError';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: HandlerError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const error = err.error || true;
  const message = err.message || 'Erro interno do servidor';
  const statusCode = err.statusCode || 500;
  return response.status(statusCode).json({ error, message });
};

export default errorMiddleware;
