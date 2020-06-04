const Joi = require('@hapi/joi');

//Register Validation

const registerValidation = data  => {
    const schema = Joi.object({
        id: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        email: Joi.string().min(6).required(),
        doctor: Joi.string(),
        address: Joi.string(),
        kinds: Joi.string(),
        phoneNum: Joi.string()
    });
    const registerV = schema.validate(data);
    return registerV;
};

const loginValidation = data => {
    const schema = Joi.object({
        id: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    const loginV = schema.validate(data);
    return loginV;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;