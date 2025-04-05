// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/orderController");
const Order = require("../models/Order"); // ✅ YOU FORGOT THIS IMPORT

// Create order
router.post("/", placeOrder);

// Get all orders
router.get("/", getOrders);

// ✅ Update Order Status
router.put("/:id/status", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ error: "Failed to update status", details: err });
  }
});

module.exports = router;
