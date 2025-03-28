// ✅ sliderController.js
const MainSlider = require("../models/MainSlider");
const CircleSlider = require("../models/CircleSlider");
const fs = require("fs");
const path = require("path");

// ========== MAIN SLIDER ==========
exports.getMainSliders = async (req, res) => {
  const sliders = await MainSlider.find();
  res.json(sliders);
};

exports.createMainSlider = async (req, res) => {
  const { heading, paragraph, bgColor } = req.body;
  const image = req.file ? req.file.filename : "";
  const newSlide = new MainSlider({ heading, paragraph, bgColor, image });
  await newSlide.save();
  res.json(newSlide);
};

exports.deleteMainSlider = async (req, res) => {
  const slide = await MainSlider.findById(req.params.id);
  if (slide?.image) {
    const imgPath = path.join(__dirname, "..", "uploads", slide.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  await MainSlider.findByIdAndDelete(req.params.id);
  res.json({ message: "Main Slider Deleted" });
};

// ========== CIRCLE SLIDER ==========
exports.getCircleSliders = async (req, res) => {
  const sliders = await CircleSlider.find();
  res.json(sliders);
};

exports.createCircleSlider = async (req, res) => {
  const { flavor, price } = req.body;
  const image = req.file ? req.file.filename : "";
  const newSlide = new CircleSlider({ flavor, price, image });
  await newSlide.save();
  res.json(newSlide);
};

exports.deleteCircleSlider = async (req, res) => {
  const slide = await CircleSlider.findById(req.params.id);
  if (slide?.image) {
    const imgPath = path.join(__dirname, "..", "uploads", slide.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }
  await CircleSlider.findByIdAndDelete(req.params.id);
  res.json({ message: "Circle Slider Deleted" });
};
