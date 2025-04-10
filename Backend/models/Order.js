const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
    email: String,
    area: String,
    distance: Number
  },
  items: Array,
  paymentMethod: String,
  deliveryFee: Number,
  receiptImage: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
