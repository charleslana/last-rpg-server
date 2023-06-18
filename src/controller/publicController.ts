import logger from '../utils/logger';
import PublicService from '../service/publicService';
import { NextFunction, Request, Response } from 'express';

export default class PublicController {
  public static getServerVersion(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get server version');
    try {
      return response.status(200).json(PublicService.getServerVersion());
    } catch (error) {
      next(error);
    }
  }
}
