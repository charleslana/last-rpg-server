import CharacterClassEnum from '../../enum/characterClassEnum';
import SkillTypeEnum from '../../enum/skillTypeEnum';
import { celebrate, Joi, Segments } from 'celebrate';

export const skillCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().trim().max(255).required(),
        characterClass: Joi.string()
          .valid(...Object.values(CharacterClassEnum))
          .required(),
        type: Joi.string()
          .valid(...Object.values(SkillTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const skillUpdateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().trim().max(255).required(),
        characterClass: Joi.string()
          .valid(...Object.values(CharacterClassEnum))
          .required(),
        type: Joi.string()
          .valid(...Object.values(SkillTypeEnum))
          .required(),
      },
    },
    { abortEarly: false }
  );
};
