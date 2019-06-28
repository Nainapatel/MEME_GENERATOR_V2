
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoryName = new Schema({
	categoryName:{type:String},
	
});

module.exports = mongoose.model('categoryName', categoryName);