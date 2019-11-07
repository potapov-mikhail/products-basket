const errorHandler = require('../utils/error');
const Product = require('../models/product.model');
const { compute } = require('../utils/compute-all-price');

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    errorHandler(req, e);
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    errorHandler(res, e);
  }
}

async function createProduct(req, res) {
  const {name, currency, price} = req.body;
  const product = new Product({
    name,
    currency,
    price
  });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (e) {
    errorHandler(res, e);
  }
}

async function updateProduct(req, res) {
  const updated = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    );
    res.status(200).json(product);
  } catch (e) {
    errorHandler(res, e);
  }
}

async function deleteProduct(req, res) {
  try {
    await Product.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Removed'});
  } catch (e) {
    errorHandler(req, e);
  }
}

async function computeAllPrice(req, res) {
  try {
    const { products } = req.body;

    if (!products) {
      res.status(400).json({ message: 'Bad request' });
    }

    const result = await compute(products);
    res.status(200).json(result);

  } catch (e) {
    errorHandler(req, e);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  computeAllPrice
};
