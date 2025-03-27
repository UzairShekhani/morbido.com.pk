const mongoose = require('mongoose');

const mainSliderSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  url: String,
});

module.exports = mongoose.model("MainSlider", mainSliderSchema);
