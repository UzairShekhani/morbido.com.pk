const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
    area: String
  },
  items: Array,
  paymentMethod: String,
  receiptImage: String,
  deliveryFee: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
});