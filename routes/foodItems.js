const router = require('express').Router();
const { createFoodItemValidation } = require('../validation');
var uniqueSlug = require('unique-slug')
var cors = require('cors');
const FoodItem = require('../model/FoodItem');

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
    const foodItems = await FoodItem.find()
    res.send({data:foodItems});
});

router.post('/create', async (req, res) => {
    // Validation
    const {error} = createFoodItemValidation(req.body);
    if(error) return res.status(400).send({data:error.details[0].message});

    // Creating a FoodItem object
    const item = new FoodItem({
        item_name: req.body.item_name,
        item_slug: uniqueSlug(),
        category: req.body.category,
        image_url: req.body.image_url,
        price: req.body.price,
    });
    try {
        const foodItem = await item.save();
        res.send({data:foodItem});
    } catch (e) {
        res.status(400).send({data:e});
    }
});

module.exports = router;