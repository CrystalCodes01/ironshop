const mongoose = require('mongoose');
const Review = require('./review-model.js');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({ // describe the stucture of the object
  name: {
  type: String,
  required: [true, 'Please tell us your product name'],
  minlength: [3, 'Name must be 3 characters or longer'], // minlength & maxlength are for strings only
  maxlength: [1000, 'Name cannot be longer than 255 characters']
 },
  price: {
  type: Number,
  default: 1,
  min: [3, 'Price must be at least $3'],
  max: [1000, 'Price cannot be higher than $1000']
},
  imageUrl: {
    type: String,
    default: '/images/data.gif' },

   description: { type: String },

  // category: {
  //   type: String,
  //   enum: [ 'Tech', 'Food', 'Apparel', 'Home', 'Footwear' ]
  // },

  // Add a field inside of product documents called "reviews"
  // an array of ReviewModel ojbect with content stars and author
  reviews: [ Review.schema ]
});



// Model
//  constructor function that allows us to interact with a single collection

const Product = mongoose.model('Product', ProductSchema); // call the Schema

// Important!! //
module.exports = Product;
