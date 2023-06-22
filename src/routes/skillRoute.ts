import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import SkillController from '../controller/skillController';
import UserRoleEnum from '../enum/userRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  skillCreateMiddleware,
  skillUpdateMiddleware,
} from '../middleware/celebrate/skillCelebrate';

const skillRoute = express.Router();

skillRoute
  .route('/')
  .post(
    skillCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    SkillController.create
  );

skillRoute.route('/').get(authenticateMiddleware, SkillController.findAll);

skillRoute
  .route('/:id')
  .get(idParamMiddleware(), authenticateMiddleware, SkillController.findOne);

skillRoute
  .route('/')
  .put(
    skillUpdateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    SkillController.update
  );

skillRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    SkillController.delete
  );

export default skillRoute;
