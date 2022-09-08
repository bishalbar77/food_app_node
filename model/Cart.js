const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    food_item_slug: {
        type: String,
        required: true,
        max: 1024
    },
    slug: {
        type: String,
        required: true,
        unique:true,
        max: 1024
    },
    item_name : {
        type: String,
        max:1024
    },
    category: {
        type: String,
        max:1024
    },
    price: {
        type: String,
        max: 1024
    },
    image_url: {
        type: String,
        max:1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', cartSchema);