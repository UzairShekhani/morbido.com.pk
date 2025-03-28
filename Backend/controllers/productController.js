const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, price, category, quantity, image } = req.body;
  const newProduct = new Product({ name, price, category, quantity, image });
  await newProduct.save();
  res.json(newProduct);
};
