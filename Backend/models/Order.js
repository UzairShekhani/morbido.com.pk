import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  items: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
