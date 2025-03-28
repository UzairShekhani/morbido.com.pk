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

// ✅ Update existing main slider
exports.updateMainSlider = async (req, res) => {
  const { heading, paragraph, bgColor } = req.body;

  try {
    const slider = await MainSlider.findById(req.params.id);
    if (!slider) return res.status(404).json({ error: "Slide not found" });

    slider.heading = heading;
    slider.paragraph = paragraph;
    slider.bgColor = bgColor;

    if (req.file) {
      // Delete old image
      const oldPath = path.join(__dirname, "..", "uploads", slider.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      slider.image = req.file.filename;
    }

    const updated = await slider.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update slide" });
  }
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
