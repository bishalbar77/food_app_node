const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    item_name : {
        type: String,
        max:1024
    },
    item_slug: {
        type: String,
        required: true,
        unique:true,
        max: 1024
    },
    category: {
        type: String,
        required: true,
        max:1024
    },
    price: {
        type: String,
        required: true,
        max: 1024
    },
    image_url: {
        type: String,
        required: true,
        max:1024
    },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);