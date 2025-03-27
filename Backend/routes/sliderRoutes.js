// ✅ sliderRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getMainSliders,
  createMainSlider,
  deleteMainSlider,
  getCircleSliders,
  createCircleSlider,
  deleteCircleSlider,
} = require("../controllers/sliderController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Main Sliders
router.get("/main", getMainSliders);
router.post("/main", upload.single("image"), createMainSlider);
router.delete("/main/:id", deleteMainSlider);

// Circle Sliders
router.get("/circle", getCircleSliders);
router.post("/circle", upload.single("image"), createCircleSlider);
router.delete("/circle/:id", deleteCircleSlider);

module.exports = router;