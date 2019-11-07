const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product.route');

function createApp() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(path.resolve(__dirname, 'client', 'dist', 'frontend')));

  app.use('/api/products', productRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
  });

  return app;
}

module.exports = {
  createApp
};
