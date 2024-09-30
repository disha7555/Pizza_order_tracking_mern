const express = require('express');
const cartRouter = express.Router();
const cartController=require('../controllers/cartController');
//to add items to cart for particular user
//cartRouter.post('/add_cart',cartController.addCartItems);
cartRouter.post('/cart/add', cartController.addCartItems);
//to fetch items added to the cart by particular user
cartRouter.get('/cart/:userId/item/:itemId',cartController.listCartItems);

//  to fetch all cart items for a specific user
cartRouter.get('/cart/:userId', cartController.listAllCartItems);

module.exports=cartRouter;