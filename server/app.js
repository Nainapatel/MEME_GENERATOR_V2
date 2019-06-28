var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var CategoryNamecontroller = require('./src/controllers/categoryName.controller');
var cors = require('cors');


var bodyParser = require('body-parser');         

app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());        
app.use(cors());                            

var categoryNameModel = require('./src/models/categoryName.model');
var categoryNameRoutes = require('./routes/categoryName_routes');


app.use('/api', categoryNameRoutes)
app.use('/api', categoryNameRoutes)
app.use('/api', categoryNameRoutes)



mongoose.connect("mongodb://localhost:27017/meme_api");
console.log("connected");

module.exports = app;

