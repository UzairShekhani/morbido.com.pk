const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// ✅ Image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// ✅ Create Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;
    const image = req.file?.filename;

    const product = new Product({ name, price, quantity, category, image });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// ✅ Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ✅ Update Product
// Increase quantity
// PUT /api/products/:id/decrease
// PUT /api/products/:id/decrease
router.put("/:id/decrease", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to decrease quantity" });
  }
});

// PUT /api/products/:id/increase
// server/routes/productRoutes.js

router.put("/:id/increase", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: quantity || 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to increase product quantity" });
  }
});




module.exports = router;
