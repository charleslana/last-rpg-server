import logger from '../utils/logger';
import SkillModel from '../model/skillModel';
import SKillService from '../service/skillService';
import { NextFunction, Request, Response } from 'express';

export default class SkillController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Create skill ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as SkillModel;
      const handler = await SKillService.save(data);
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
    logger.info('Get all skills');
    try {
      return response.status(200).json(await SKillService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Get skill with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await SKillService.get(id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Update skill ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as SkillModel;
      const handler = await SKillService.update(data);
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
    logger.info(`Delete skill with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const handler = await SKillService.delete(id);
      return handler.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
