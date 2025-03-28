// controllers/productController.js

const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;
  const image = req.file ? req.file.filename : "";
  const product = new Product({ name, price, quantity, category, image });
  await product.save();
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  // (same code I gave you earlier)
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product?.image) {
    const fs = require("fs");
    const path = require("path");
    const imgPath = path.join(__dirname, "..", "uploads", product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};
