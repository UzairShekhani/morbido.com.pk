const express = require("express");
const multer = require("multer");
const Order = require("../models/Order");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ✅ Place Order
router.post("/", upload.single("receipt"), async (req, res) => {
  try {
    const { customer, items, paymentMethod, deliveryFee } = req.body;

    const newOrder = new Order({
      customer: JSON.parse(customer),
      items: JSON.parse(items),
      paymentMethod,
      deliveryFee,
      receiptImage: req.file ? req.file.filename : null
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: "Order failed", details: err.message });
  }
});

// ✅ Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// ✅ Update Order Status
router.put("/:id/status", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

module.exports = router;
