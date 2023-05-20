import { NextFunction, Request, Response } from "express";
import HandlerError from "../handler/handler.error";
import IUserRole from "../interface/user.role.interface";

const roleMiddleware = (roles: string[] = []) => {
    return [(request: Request, _response: Response, next: NextFunction) => {
        const userRoles = request.user.roles.filter((role: IUserRole) => {
            return roles.includes(role.name);
        });
        if (roles.length > 0 && userRoles.length === 0) {
            const error: HandlerError = new HandlerError('Não autorizado.', 401);
            return next(error);
        }
        return next();
    },];
};

export default roleMiddleware;