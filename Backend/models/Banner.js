const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: String,
  location: String, // "home" or "product"
});

module.exports = mongoose.model("Banner", bannerSchema);
