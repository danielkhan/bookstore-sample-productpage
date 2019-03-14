const express = require('express');
const axios = require('axios');

const { services } = require('../config');

const router = express.Router();
const { products } = require('../data');

async function getDetails(productId) {
  const url = `${services.details.name}/${services.details.endpoint}/${productId}`;
  const response = await axios.get(url);
  return response.data;
}

async function getReviews(productId) {
  const url = `${services.reviews.name}/${services.reviews.endpoint}/${productId}`;
  const response = await axios.get(url);
  return response.data;
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Bookstore' });
});

router.get('/productpage', async (req, res, next) => {
  try {
    const product = products[0];
    const { details, reviews } = await Promise.all(
      [getDetails(product.id), getReviews(product.id)],
    );
    return res.render('productpage', { product, details, reviews });
  } catch (err) {
    return next(err);
  }
});

router.get('/health', (req, res) => res.send('Product page is healthy'));


module.exports = router;
