import express from 'express';
import PublicController from '../controller/publicController';
import UserController from '../controller/userController';
import {
  userCreateMiddleware,
  userLoginMiddleware,
} from '../middleware/celebrate/userCelebrate';

const publicRoute = express.Router();

publicRoute.route('/version').get(PublicController.getServerVersion);

publicRoute.route('/user').post(userCreateMiddleware(), UserController.create);

publicRoute.route('/auth').post(userLoginMiddleware(), UserController.auth);

export default publicRoute;
