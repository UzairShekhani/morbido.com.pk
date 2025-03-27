const mongoose = require('mongoose');

const circleSliderSchema = new mongoose.Schema({
  flavor: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model("CircleSlider", circleSliderSchema);
