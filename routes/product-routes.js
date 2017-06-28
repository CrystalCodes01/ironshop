const express = require('express');
const Product = require('../models/product.js');
const router = express.Router();

router.get('/product', (req, res, next) => {
  Product.find((err, productResults) => { // database query
    if (err) {
      next(err);
      return;
    }
    res.render('product-list.ejs', {
      productAndStuff: productResults
    });
  });
});

// # Step 1 of form submission
router.get('/product/new', (req, res, next) => { // RESTFUL route
  res.render('new-product.ejs');
});

// # Step 2 of form submission
// <form method="post" action="/product"

router.post('/product', (req, res, next) => {
  const theProduct = new Product ({
    name: req.body.productName,
    price: req.body.productPrice,
    iamgeUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });

  theProduct.save((err) => {
    // If there was not a valadation error
    if (err && theProduct.errors === undefined) {
      next(err);
      return;
    }
    // If there were errors and they were valadation errors
    if (err && theProduct.errors) {
      res.locals.nameValadationError = theProduct.errors.name;
      res.locals.priceValadationError = theProduct.errors.price;
      res.locals.imageUrlValadationError = theProduct.errors.imageUrl;
      res.locals.descriptionValadationError = theProduct.errors.description;
      res.render('new-product.ejs');
      return;
    }

    // redirect is STEP #3
    // you can only redirect to a URL
    res.redirect('/product');
  });
});

router.get('/product/:myId', (req, res, next) => {

Product.findById(
  req.params.myId,  // 1st argument -> the id to find in the DB
  (err, productFromDb) => { // 2nd argument -> callback
    if (err) {
      next(err);
      return;
    }
      res.locals.productDetails = productFromDb;
      res.render('product-details.ejs');
    }
  );
});



// # Step 1 of updating - refer to edit product.ejs & product list.ejs
router.get('/product/:myId/edit', (req, res, next) => {
  Product.findById (
    req.params.myId,
    (err, productFromDb) => {
      if (err) {
        next(err);
        return;
      }
        res.locals.productDetails = productFromDb;
        res.render('edit-product.ejs');
      }
  );
});


router.post('/product/:myId/update', (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.myId, // 1st argument -> id of document to update

    {               // 2nd argument -> id of document to update
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.body.productImageUrl,
      description: req.body.productDescription
    },

    (err, productFromDb) => {  // 3rd argument -> callback
      if (err) {
        next(err);
        return;
      }
        res.redirect('/product/' + productFromDb._id);
    }
  );
});

router.post('/product/:myId/delete', (req, res, next) => {
  Product.findByIdAndRemove(
    req.params.myId,            // 1st argument -> id of document to remove

    (err, productFromDb) => {  // 2nd argument -> callback
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }

      // If removed successfully, redirect to a URL.
      res.redirect('/product');
        // you can ONLY redirect to a URL 🌏
    }
  );
});

module.exports = router;
