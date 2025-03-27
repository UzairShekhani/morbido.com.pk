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
  try {
    const { name, heading, price } = req.body;
    let updateData = { name, heading, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const existing = await Flavor.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Flavor not found" });

    // Remove old image if new one uploaded
    if (req.file && existing.image) {
      const oldPath = path.join(__dirname, "..", "uploads", existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updatedFlavor = await Flavor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedFlavor);
  } catch (error) {
    res.status(400).json({ message: error.message });
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