import characterRoute from './characterRoutes';
import publicRoute from './publicRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/public', publicRoute);
routes.use('/character', characterRoute);

export default routes;
