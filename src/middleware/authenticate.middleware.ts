import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import DecodeType from "../types/decode.type";
import HandlerError from "../handler/handler.error";
import UserService from "../service/user.service";

const handleUnauthorizedError = (next: NextFunction) => {
    const error: HandlerError = new HandlerError('Não autorizado.', 401);
    next(error);
};

const authenticateMiddleware = async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const authHeader = request.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
                if (decode) {
                    const { user } = decode as DecodeType;
                    const userLogged = await UserService.getAuth(user.id, user.authToken);
                    if (!userLogged) {
                        return handleUnauthorizedError(next);
                    }
                    request.user = {
                        id: user.id as number, roles: user.roles,
                    };
                    return next();
                }
                return handleUnauthorizedError(next);
            }
            return handleUnauthorizedError(next);
        }
        return handleUnauthorizedError(next);
    } catch (error) {
        handleUnauthorizedError(next);
    }
};

export default authenticateMiddleware;