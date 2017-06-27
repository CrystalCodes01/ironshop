const express = require('express');
const Product = require('../models/product.js');
const router = express.Router();

router.get('/products', (req, res, next) => {
  Product.find((err, productResults) => { // database query
    if (err) {
      next(err);
      return;
    }
    res.render('product-list.ejs', {
      productsAndStuff: productResults
    });
  });
});

// # Step 1 of form submission
router.get('/products/new', (req, res, next) => { // RESTFUL route
  res.render('new-product.ejs');
});

// # Step 2 of form submission
// <form method="post" action="/products"

router.post('/products', (req, res, next) => {
  const theProduct = new Product ({
    name: req.body.productName,
    price: req.body.productPrice,
    iamgeUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });

  theProduct.save((err) => {
    if (err) {
      next(err);
      return;
    }
    // redirect is STEP #3
    // you can only redirect to a URL
    res.redirect('/products');
  });
});

router.get('/product/details', (req, res, next) => {
Product.findById(
  req.query.myId,  // 1st argument -> the id to find in the DB
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



// # Step 1 of updating
app.get('product/edit', (req, res, next) => {
  Product.findById (
    req.query.myId,
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



module.exports = router;
