const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      items: req.body.items,
    });
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Order save failed" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};
