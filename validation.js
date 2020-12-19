const joi = require("@hapi/joi");

const registerValidation = data => {
    const schema = joi.object({
        firstname: joi
        .string()
        .min(3)
        .required(),
  
        lastname: joi
        .string()
        .min(3)
        .required(),
  
      email: joi
        .string()
        .min(6)
        .required()
        .email(),
      phone: joi.number().min(9),
      password: joi
        .string()
        .min(6)
        .required(),
        address: joi
        .string()
        .min(5)
        .max(70)
    });
    return schema.validate(data);
  };
  const loginValidation = data => {
    const schema = joi.object({
      email: joi
        .string()
        .min(6)
        .required()
        .email(),
  
      password: joi
        .string()
        .min(6)
        .required()
    });
    return schema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;