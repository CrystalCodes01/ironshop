const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
  content: { type: String },
  stars: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  author: { type: String }
});

const ReviewModel = mongoose.model('Review', reviewSchema); // call the Schema

module.exports = ReviewModel;
