const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// Import Routes
const defaultRoute = require('./routes/default');
const foodRoute = require('./routes/foodItems');
const cartRoute = require('./routes/cart');
const port = process.env.PORT || 5000;

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () => console.log('Connected to DB')
);

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/', defaultRoute);
app.use('/api/food', foodRoute);
app.use('/api/cart', cartRoute);

app.listen(port, () => console.log('Server running at ' + port));