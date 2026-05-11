const Joi = require("joi");

//////////////////////////////////////////////////////
// REGISTER
//////////////////////////////////////////////////////
exports.registerSchema =
  Joi.object({

    name:
      Joi.string()
        .min(2)
        .max(50)
        .required(),

    email:
      Joi.string()
        .email()
        .required(),

    password:
      Joi.string()
        .min(6)
        .required(),

    organizationName:
      Joi.string()
        .min(2)
        .required(),

    //////////////////////////////////////////////////////
    // RBAC ROLE
    //////////////////////////////////////////////////////
    role:
      Joi.string()
        .valid(
          "admin",
          "manager",
          "student"
        )
        .default(
          "student"
        ),
  });

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////
exports.loginSchema =
  Joi.object({

    email:
      Joi.string()
        .email()
        .required(),

    password:
      Joi.string()
        .required(),
  });