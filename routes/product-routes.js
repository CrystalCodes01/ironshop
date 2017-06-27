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



module.exports = router;
