import * as Joi from 'joi';

export const CreateUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    document: Joi.string()
});