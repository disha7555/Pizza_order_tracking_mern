const express = require('express');
const menuRouter = express.Router();
const menuController = require('../controllers/menuController');

menuRouter.get('/list_items', menuController.index);

module.exports=menuRouter;