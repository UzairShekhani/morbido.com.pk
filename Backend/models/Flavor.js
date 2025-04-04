const mongoose = require("mongoose");

const flavorSchema = new mongoose.Schema({
  name: String,
  image: String,
  quantity: {
    type: Number,
    default: 0, // ✅ default quantity
  },
});

module.exports = mongoose.model("Flavor", flavorSchema);
