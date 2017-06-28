const mongoose = require('mongoose');
const Review = require('./review-model.js');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({ // describe the stucture of the object
  name: {
  type: String,
  required: true,
  minlength:3, // minlength & maxlength are for strings only
  maxlength: 255
 },
  price: {
  type: Number,
  default: 1,
  min: 0,
  max: 1000
},
  imageUrl: { type: String, default: '/images/data.gif' },
  description: { type: String },

  category: {
    type: String,
    enum: [ 'Tech', 'Food', 'Apparel', 'Home', 'Footwear' ]
  },

  // Add a field inside of product documents called "reviews"
  // an array of ReviewModel ojbect with content stars and author
  reviews: [ Review.schema ]
});



// Model
//  constructor function that allows us to interact with a single collection

const Product = mongoose.model('Product', ProductSchema); // call the Schema

// Important!! //
module.exports = Product;
