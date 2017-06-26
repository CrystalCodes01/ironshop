const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  price: { type: Number, default: 1 },
  imageUrl: { type: String, default: '/images/data.gif' },
  description: { type: String }
});

// Model
//  Constuctor function 

const Product = mongoose.model('Product', ProductSchema);

// Important!! //
module.exports = Product;
