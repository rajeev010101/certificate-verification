const Joi = require("joi");

exports.createSchema = Joi.object({
  name: Joi.string().required(),
  course: Joi.string().required(),
  templateId: Joi.string().required(),
  email: Joi.string().optional()
});