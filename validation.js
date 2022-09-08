// Validation
const Joi = require('@hapi/joi')

// Food Item Create
const createFoodItemValidation = (data) => {
    const schema = {
        item_name : Joi.string().required(),
        category : Joi.string().required(),
        price : Joi.string().required(),
        image_url : Joi.string().required(),
    }
    return Joi.validate(data, schema)
};

// Add to cart
const addCartValidation = (data) => {
    const schema = {
        food_item_slug : Joi.string().required()
    }
    return Joi.validate(data, schema)
};

module.exports.createFoodItemValidation = createFoodItemValidation;
module.exports.addCartValidation = addCartValidation;