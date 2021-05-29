const Joi = require('joi');

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .messages({
                'string.empty': `"E-mail" cannot be an empty field`,
                'string.email': `"E-mail" must obey an e-mail pattern`,
                'any.required': `"E-mail" is a required field`
              }),
        password: Joi.string()
            .required()
            .messages({
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
              })
    });

    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;

const signupValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .required()
            .min(3)
            .messages({
                'string.empty': `"First Name" cannot be an empty field`,
                'string.min': `"First Name" should have a minimum length of 3`,
                'any.required': `"First Name" is a required field`
              }),
        surName: Joi.string()
            .required()
            .min(3)
            .messages({
                'string.empty': `"Surname" cannot be an empty field`,
                'string.min': `"Surname" should have a minimum length of 3`,
                'any.required': `"Surname" is a required field`
              }),
        email: Joi.string()
            .required()
            .email()
            .messages({
                'string.empty': `"E-mail" cannot be an empty field`,
                'string.email': `"E-mail" must obey an e-mail pattern`,
                'any.required': `"E-mail" is a required field`
              }),
        password: Joi.string()
            .min(7)
            .required()
            // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)
            .messages({
                'string.empty': `"Password" cannot be an empty field`,
                'string.min': `"Password" should have a minimum length of 7`,
                'object.regex': `"Password" must contain at least one uppercase letter, one lowercase letter, numbers and special characters`,
                "string.pattern.base": `"Password" must contain at least one uppercase letter, one lowercase letter, numbers and special characters`,
                'any.required': `"Password" is a required field`
              }),
        
    });

    return schema.validate(data);
}

module.exports.signupValidation = signupValidation;

const imageFilter =(req, file, cb)=> {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;