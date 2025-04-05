// routes/flavorRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getFlavors,
  getFlavorById,
  createFlavor,
  updateFlavor,
  deleteFlavor,
} = require("../controllers/flavorController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.get("/", getFlavors);
router.get("/:id", getFlavorById);
router.post("/", upload.single("image"), createFlavor);
router.put("/:id", upload.single("image"), updateFlavor);
router.delete("/:id", deleteFlavor);
// routes/flavorRoutes.js
router.put("/:id", updateFlavor);




module.exports = router;