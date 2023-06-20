import logger from '../utils/logger';
import UserCharacterService from '../service/userCharacterService';
import { NextFunction, Request, Response } from 'express';

export default class UserCharacterController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create user character ${JSON.stringify(request.body)}`);
    try {
      const { userId, characterId } = request.body;
      const handler = await UserCharacterService.save(userId, characterId);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get all user characters');
    try {
      return response
        .status(200)
        .json(await UserCharacterService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get user character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserCharacterService.get(id, request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async updateSlot(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update user character slot ${JSON.stringify(request.body)}`);
    try {
      const { characters } = request.body;
      const handler = await UserCharacterService.updateAllSlot({
        userId: request.user.id,
        characters: characters,
      });
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
