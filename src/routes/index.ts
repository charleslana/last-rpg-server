import characterRoute from './characterRoute';
import characterSkillRoute from './characterSkillRoute';
import publicRoute from './publicRoute';
import skillRoute from './skillRoute';
import userCharacterRoute from './userCharacterRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/public', publicRoute);
routes.use('/character', characterRoute);
routes.use('/user/character', userCharacterRoute);
routes.use('/skill', skillRoute);
routes.use('/character/skill', characterSkillRoute);

export default routes;
