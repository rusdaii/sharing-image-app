const Joi = require('joi');

exports.register = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  password: Joi.string().required(),
});

exports.login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
