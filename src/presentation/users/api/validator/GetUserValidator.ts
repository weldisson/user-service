import * as Joi from "joi";

export const GetUserValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});
