const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  link: String,
  image: String, // store filename from multer
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Banner", bannerSchema);
