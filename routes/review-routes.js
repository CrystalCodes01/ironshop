const express = require('express');
const Review = require('../models/review-model.js');
const Product = require('../models/product.js');
const router  = express.Router();

// ROUTE #1 -> displau the form to create a new review
router.get('/product/:productId/reviews/new', (req, res, next) => {
  Product.findById(
    req.params.productId,
    (err, productFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.productDetails = productFromDb;
      res.render('review-views/new-review-form.ejs');
    }
  );
});
// ROUTE #2 -> receive that form submission for database
router.post('/product/:productId/reviews', (req, res, next) => {
  Product.findById(
    req.params.productId,  // 1st argument -> id of the product
    (err, productFromDb) => { // 2nd argument -> callback
      if (err) {
        next(err);
        return;
      }

      const theReview = new Review ({
        author: req.body.reviewAuthor,
        stars: req.body.reviewStars,
        content: req.body.reviewContent
      });
      // Adding the review to the product's "reviews" array
      productFromDb.reviews.push(theReview);

      // Save the product with the new review
      productFromDb.save((err) => {
        if (err) {
        next(err);
        return;
      }
      res.redirect('/product/' + productFromDb._id);
      });
    }
  );
});


module.exports = router;
