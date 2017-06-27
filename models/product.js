const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  price: { type: Number, default: 1 },
  imageUrl: { type: String, default: '/images/data.gif' },
  description: { type: String }
});

// Model
//  constructor function that allows us to interact with a single collection

const Product = mongoose.model('Product', ProductSchema);

// Important!! //
module.exports = Product;
