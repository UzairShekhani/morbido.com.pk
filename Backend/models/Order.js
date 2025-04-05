const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  status: {
    type: String,
    default: "Pending", // ✅ default status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
