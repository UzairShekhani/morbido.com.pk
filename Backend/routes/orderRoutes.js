const express = require("express");
const multer = require("multer");
const router = express.Router();
const Order = require("../models/Order");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("receipt"), async (req, res) => {
  try {
    const { customer, items, paymentMethod, deliveryFee } = req.body;
    const newOrder = new Order({
      customer: JSON.parse(customer),
      items: JSON.parse(items),
      paymentMethod,
      deliveryFee,
      receiptImage: req.file ? req.file.filename : null,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error("❌ Order Error:", error);
    res.status(500).json({ error: "Order failed", details: error.message });
  }
});

module.exports = router;
