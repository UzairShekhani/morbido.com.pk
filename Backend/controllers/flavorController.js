const Flavor = require("../models/Flavor");
const fs = require("fs");
const path = require("path");

// Get all flavors
exports.getFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find();
    res.json(flavors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single flavor by ID
exports.getFlavorById = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) return res.status(404).json({ message: "Flavor not found" });
    res.json(flavor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create new flavor
exports.createFlavor = async (req, res) => {
  try {
    const { name, heading, price } = req.body;
    let imagePath = req.file ? req.file.filename : "";

    const newFlavor = new Flavor({ name, heading, price, image: imagePath });
    await newFlavor.save();
    res.json(newFlavor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update flavor
exports.updateFlavor = async (req, res) => {
  const { quantity } = req.body;
  try {
    const updated = await Flavor.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", err });
  }
};


// Delete flavor
exports.deleteFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) return res.status(404).json({ message: "Flavor not found" });

    // Delete image file if exists
    if (flavor.image) {
      const imgPath = path.join(__dirname, "..", "uploads", flavor.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Flavor.findByIdAndDelete(req.params.id);
    res.json({ message: "Flavor deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};