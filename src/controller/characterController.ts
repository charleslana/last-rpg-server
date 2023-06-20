import CharacterModel from '../model/characterModel';
import CharacterService from '../service/characterService';
import logger from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

export default class CharacterController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create character ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as CharacterModel;
      const handler = await CharacterService.save(data);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info('Get all characters');
    try {
      return response.status(200).json(await CharacterService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await CharacterService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update character ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as CharacterModel;
      const handler = await CharacterService.update(data);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Delete character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await CharacterService.delete(id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
