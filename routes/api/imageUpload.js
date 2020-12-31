const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();

route.get('/photo', (req, res) => {
  res.json({
    image: 'Images Api',
  });
});

module.exports = route;
