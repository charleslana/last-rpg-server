import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import ConfigService from "../service/config.service";

export default class ConfigController {
    public static getServerVersion(_request: Request, response: Response, _next: NextFunction) {
        logger.info('Get server version');
        return response.status(200).json(ConfigService.getServerVersion());
    }
}