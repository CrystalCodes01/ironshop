const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({ // describe the stucture of the object
  name: { type: String },
  price: { type: Number, default: 1 },
  imageUrl: { type: String, default: '/images/data.gif' },
  description: { type: String }
});

// Model
//  constructor function that allows us to interact with a single collection

const Product = mongoose.model('Product', ProductSchema); // call the Schema

// Important!! //
module.exports = Product;
