import { celebrate, Joi, Segments } from 'celebrate';

export const userCreateMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().trim().max(50).required().messages({
          'string.email': 'O campo {{#label}} deve conter um e-mail válido.',
        }),
        password: Joi.string().required().min(6).max(50),
        passwordConfirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    },
    { abortEarly: false }
  );
};

export const userUpdateNameMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string()
          .pattern(/^[a-zA-ZÀ-ú0-9_]*$/)
          .trim()
          .min(3)
          .max(20)
          .required(),
      },
    },
    { abortEarly: false }
  );
};

export const userLoginMiddleware = () => {
  return celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().trim().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false }
  );
};
