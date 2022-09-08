const router = require('express').Router();
const { addCartValidation } = require('../validation');
var uniqueSlug = require('unique-slug')
var cors = require('cors');
const FoodItem = require('../model/FoodItem');
const Cart = require('../model/Cart');

const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};

router.use(cors(corsOpts));

router.get('/', async (req, res) => {
    const cartItems = await Cart.find();
    res.send({data:cartItems});
});

router.post('/add', async (req, res) => {
    // Validation
    const {error} = addCartValidation(req.body);
    if(error) return res.status(400).send({data:error.details[0].message});

    // Check if food item exits
    const foodItemExists = await FoodItem.findOne({item_slug: req.body.food_item_slug});
    if(!foodItemExists) return res.status(404).send({data:"Food Item doesn't exists!"});

    // add to cart
    const item = new Cart({
        food_item_slug: req.body.food_item_slug,
        item_name: foodItemExists.item_name,
        category: foodItemExists.category,
        price: foodItemExists.price,
        image_url: foodItemExists.image_url,
        slug: uniqueSlug(),
    });
    try {
        const addToCart = await item.save();
        res.send({data:addToCart});
    } catch (e) {
        res.status(400).send({data:e});
    }
});

router.post('/remove', async (req, res) => {

    // Validation
    const {error} = addCartValidation(req.body);
    if(error) return res.status(400).send({data:error.details[0].message});

    // Check if cart item exits
    const cartItem = await Cart.findOne({food_item_slug: req.body.food_item_slug});
    if(!cartItem) return res.status(404).send({data:"Item not found in cart!"});

    // add to cart
    await Cart.findOneAndDelete({ food_item_slug: req.body.food_item_slug });
    try {
        res.status(200).send({data:"Food item removed from cart!"});
    } catch (e) {
        res.status(400).send({data:e});
    }
});

module.exports = router;