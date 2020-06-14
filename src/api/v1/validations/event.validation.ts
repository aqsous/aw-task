import * as Joi from '@hapi/joi';

export const createEvent = Joi.object().keys({
  name: Joi.string().required(),
});

export const listEvents = Joi.object().keys({});
