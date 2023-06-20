import { celebrate, Joi, Segments } from 'celebrate';

export const userCharacterCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        userId: Joi.number().required(),
        characterId: Joi.number().required(),
      },
    },
    { abortEarly: false }
  );
};

export const userCharacterUpdateSlotMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: Joi.array()
        .items(
          Joi.object().keys({
            characterId: Joi.number().required(),
            slot: Joi.number().integer().min(1).max(3).required(),
          })
        )
        .unique('slot')
        .unique('characterId')
        .min(3)
        .max(3)
        .required(),
    },
    { abortEarly: false }
  );
};
