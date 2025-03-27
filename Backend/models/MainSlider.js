const mongoose = require('mongoose');

const mainSliderSchema = new mongoose.Schema({
  heading: String,
  paragraph: String,
  image: String,
});

module.exports = mongoose.model("MainSlider", mainSliderSchema);
