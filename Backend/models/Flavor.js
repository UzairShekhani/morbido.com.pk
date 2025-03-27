// models/Flavor.js
const mongoose = require("mongoose");

const flavorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String },
  price: { type: Number },
  image: { type: String }, // multer ke through uploaded filename
  // future fields ke liye jagah bachi hai (like stock, category, etc.)
}, {
  timestamps: true // automatic createdAt, updatedAt
});

module.exports = mongoose.model("Flavor", flavorSchema);
