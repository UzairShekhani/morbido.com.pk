import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST - Create Order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: "Order creation failed" });
  }
});

// GET - Fetch all Orders (for Admin Panel)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

export default router;
