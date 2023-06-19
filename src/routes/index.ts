import characterRoute from './characterRoute';
import publicRoute from './publicRoute';
import userCharacterRoute from './userCharacterRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/public', publicRoute);
routes.use('/character', characterRoute);
routes.use('/user/character', userCharacterRoute);

export default routes;
