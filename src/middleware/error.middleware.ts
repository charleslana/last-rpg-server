import { NextFunction, Request, Response } from "express";
import HandlerError from "../handler/handler.error";

const errorMiddleware = (error: HandlerError, _request: Request, response: Response, next: NextFunction) => {
    const message = error.message || 'Erro interno do servidor';
    const statusCode = error.statusCode || 500;
    return response.status(statusCode).json({ statusCode, message });
};

export default errorMiddleware;