import authenticateMiddleware from '../middleware/authenticateMiddleware';
import CharacterController from '../controller/characterController';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import UserRoleEnum from '../enum/userRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  characterCreateMiddleware,
  characterUpdateMiddleware,
} from '../middleware/celebrate/characterCelebrate';

const characterRoute = express.Router();

characterRoute
  .route('/')
  .post(
    characterCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.create
  );

characterRoute
  .route('/')
  .get(authenticateMiddleware, CharacterController.findAll);

characterRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    CharacterController.findOne
  );

characterRoute
  .route('/')
  .put(
    characterUpdateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.update
  );

characterRoute
  .route('/:id')
  .delete(
    idParamMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    CharacterController.delete
  );

export default characterRoute;
