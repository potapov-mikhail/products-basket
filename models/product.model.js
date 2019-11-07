const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['RUB', 'USD', 'EUR']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('products', productSchema);
