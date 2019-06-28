var express = require('express');
var categoryNamerouter = express.Router();
var CategoryNamecontroller = require('../src/controllers/categoryName.controller');


categoryNamerouter.get('/category',CategoryNamecontroller.getCategoryName)
categoryNamerouter.get('/stickers/:name',CategoryNamecontroller.getStickers)
categoryNamerouter.get('/readdir',CategoryNamecontroller.readDir)



module.exports = categoryNamerouter