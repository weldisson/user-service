import * as Joi from "joi";

export const CreateUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  document: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^[0-9]+$/)
    .required(),
});
