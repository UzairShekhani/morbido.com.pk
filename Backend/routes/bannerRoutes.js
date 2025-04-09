const express = require("express");
const multer = require("multer");
const Banner = require("../models/Banner");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Create banner
router.post("/", upload.single("image"), async (req, res) => {
  const newBanner = new Banner({
    image: req.file.filename,
    location: req.body.location,
  });

  await newBanner.save();
  res.json(newBanner);
});

// ✅ Get all banners
router.get("/", async (req, res) => {
  const banners = await Banner.find();
  res.json(banners);
});

// ✅ Delete
router.delete("/:id", async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
