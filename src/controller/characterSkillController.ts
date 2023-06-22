import CharacterSkillService from '../service/characterSkillService';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

export default class CharacterSkillController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create skill character ${JSON.stringify(request.body)}`);
    try {
      const { userId, userCharacterId, skillId } = request.body;
      const handler = await CharacterSkillService.save(
        userId,
        userCharacterId,
        skillId
      );
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
    logger.info(`Get all skills character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await CharacterSkillService.getAll(request.user.id, id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get skill character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await CharacterSkillService.get(request.user.id, id));
    } catch (error) {
      next(error);
    }
  }
}
