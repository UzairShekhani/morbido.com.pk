const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all banners
router.get("/", getAllBanners);
// GET single banner
router.get("/:id", getBannerById);
// CREATE banner
router.post("/", upload.single("image"), createBanner);
// UPDATE banner
router.put("/:id", upload.single("image"), updateBanner);
// DELETE banner
router.delete("/:id", deleteBanner);

module.exports = router;
