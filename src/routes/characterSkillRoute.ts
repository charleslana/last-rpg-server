import authenticateMiddleware from '../middleware/authenticateMiddleware';
import CharacterSkillController from '../controller/characterSkillController';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import UserRoleEnum from '../enum/userRoleEnum';
import { characterSkillCreateMiddleware } from '../middleware/celebrate/characterSkillCelebrate';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';

const characterSkillRoute = express.Router();

characterSkillRoute
  .route('/')
  .post(
    characterSkillCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterSkillController.create
  );

characterSkillRoute
  .route('/all/:id')
  .get(authenticateMiddleware, CharacterSkillController.findAll);

characterSkillRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    CharacterSkillController.findOne
  );

export default characterSkillRoute;
