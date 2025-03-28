const mongoose = require('mongoose');

const mainSliderSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  image: String,
  bgColor: String // ✅ add this line
});

module.exports = mongoose.model("MainSlider", mainSliderSchema);
