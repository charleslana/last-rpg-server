import authenticateMiddleware from '../middleware/authenticateMiddleware';
import express from 'express';
import UserController from '../controller/userController';
import { userUpdateNameMiddleware } from '../middleware/celebrate/userCelebrate';

const userRoute = express.Router();

userRoute.route('/details').get(authenticateMiddleware, UserController.find);

userRoute
  .route('/change-name')
  .put(
    userUpdateNameMiddleware(),
    authenticateMiddleware,
    UserController.changeName
  );

export default userRoute;
