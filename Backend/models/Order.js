const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    paymentMethod: String, // JazzCash, Bank Transfer, COD
    deliveryFee: Number,
    receiptImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
