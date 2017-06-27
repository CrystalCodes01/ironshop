// SEED FILE
// JS file that saves to database when you run it
// (makes onboarding easier and allows repopulation of DB after delete)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ironshop');
const Product = require('../models/product-model.js');

const productInfoArray = [
  {
      name: 'Phone Case',
      price: 9.99,
      imageUrl: '/images/phone.gif',
      description: ''
  },
  {
      name: 'Bean Bag',
      price: 25,
      imageUrl: '/images/beanbag.gif',
      description: ''
  },
  {
      name: 'Tissues',
      price: 13.72,
      imageUrl: '/images/tissue.gif',
      description: ''
  },
  {
      name: 'Yoga Mat',
      price: 29.99,
      imageUrl: 'http://i.imgur.com/XtpFrW7.jpg',
      description: 'Keeps your knees safe, slip proof, sweat proof. Top of the line',
  },
  {
      name: '20" monitor',
      price: 249.99,
      imageUrl: 'http://i.imgur.com/5ICGeY0.jpg',
      description: 'Large enough for even the heaviest gamer. Crisp, fresh, no dead pixels guarantee',
  },
  {
      name: 'Soylent',
      price: 54.99,
      imageUrl: 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
      description: 'You never have to leave your computer! All you can eat nutrition!',
  }
];

Product.create (
  productInfoArray, // 1st argument -> array of Product info obects
  (err, productResults) => { // 2nd argument -> callback!
    if (err) {
      console.log('DATABASE ERROR!');
      return; // <-- stop the process if error
    }
    else {
      productResults.forEach((oneProd) => {
        console.log('New Product! ' + oneProd.name);
      });
    }
  }
);
