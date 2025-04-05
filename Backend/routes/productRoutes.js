const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
import { toast } from "react-hot-toast";

// ✅ Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ DECREASE quantity by 1 (on addToCart)
router.put("/:id/increase", async (req, res) => {
  try {
    const { quantity } = req.body; // required for +1
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: quantity || 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to increase quantity" });
  }
});

router.put("/:id/decrease", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to decrease quantity" });
  }
});

toast.success("Removed from cart!");


module.exports = router;
