const Banner = require("../models/Banner");

exports.getAllBanners = async (req, res) => {
  const banners = await Banner.find();
  res.json(banners);
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Not found" });
    res.json(banner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.filename;
    }

    const newBanner = new Banner({
      title,
      subtitle,
      link,
      image: imagePath,
    });
    await newBanner.save();
    res.json(newBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;
    let updateData = { title, subtitle, link };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Banner deleted" });
};
