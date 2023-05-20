import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import UserService from "../service/user.service";
import IUser from "../interface/user.interface";

export default class UserController {

    public static async create(request: Request, response: Response, next: NextFunction) {
        logger.info(`Create user ${JSON.stringify(request.body)}`);
        try {
            const user = request.body as IUser;
            const handler = await UserService.save(user);
            return handler.toJSON(response);
        } catch (error) {
            next(error);
        }
    }

    public static async find(request: Request, response: Response, next: NextFunction) {
        logger.info(`Get user data ${request.user.id}`);
        try {
            return response.status(200).json(await UserService.get(request.user.id));
        } catch (error) {
            next(error);
        }
    }

    public static async login(request: Request, response: Response, next: NextFunction) {
        logger.info(`Authenticate user ${request.body.email}`);
        try {
            const { email, password } = request.body;
            return response
                .status(200)
                .json(await UserService.authenticate(email, password));
        } catch (error) {
            next(error);
        }
    }
}