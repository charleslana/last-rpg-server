import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import roleMiddleware from '../middleware/roleMiddleware';
import UserCharacterController from '../controller/userCharacterController';
import UserRoleEnum from '../enum/userRoleEnum';
import { idParamMiddleware } from '../middleware/celebrate/commonCelebrate';
import {
  userCharacterCreateMiddleware,
  userCharacterUpdateSlotMiddleware,
} from '../middleware/celebrate/userCharacterCelebrate';

const userCharacterRoute = express.Router();

userCharacterRoute
  .route('/')
  .post(
    userCharacterCreateMiddleware(),
    authenticateMiddleware,
    roleMiddleware([UserRoleEnum.Admin]),
    UserCharacterController.create
  );

userCharacterRoute
  .route('/')
  .get(authenticateMiddleware, UserCharacterController.findAll);

userCharacterRoute
  .route('/:id')
  .get(
    idParamMiddleware(),
    authenticateMiddleware,
    UserCharacterController.findOne
  );

userCharacterRoute
  .route('/slot')
  .put(
    userCharacterUpdateSlotMiddleware(),
    authenticateMiddleware,
    UserCharacterController.updateSlot
  );

export default userCharacterRoute;
