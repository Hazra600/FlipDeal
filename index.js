const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());

const port = 3000;

// Server side values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; // 2 points per $1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartFinalTotal = newItemPrice + cartTotal;
  res.send(cartFinalTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryTime;
  if (shippingMethod === 'Standard') {
    deliveryTime = distance / 50;
  } else {
    deliveryTime = distance / 100;
  }

  res.send(deliveryTime.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
