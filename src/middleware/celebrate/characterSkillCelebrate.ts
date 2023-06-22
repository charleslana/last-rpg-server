import { celebrate, Joi, Segments } from 'celebrate';

export const characterSkillCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        userId: Joi.number().required(),
        userCharacterId: Joi.number().required(),
        skillId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};
