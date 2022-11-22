const Joi = require('joi');

const validateController = {

    register: function (data) {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(50),
            email: Joi.string().email().required().min(3).max(50),
            password: Joi.string().required().min(6).max(20),
            admin: Joi.boolean().default(false)
        })
        return schema.validate(data)
    },

    login: function (data) {
        const schema = Joi.object({
            email: Joi.string().email().required().min(3).max(50),
            password: Joi.string().required().min(6).max(20)
        })
        return schema.validate(data)
    }

}

module.exports = validateController;