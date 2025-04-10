import express from 'express';
import multer from 'multer';
import path from 'path';
import Banner from '../models/Banner.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/banners'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});

const upload = multer({ storage });

// Create new banner
router.post('/', upload.single('image'), async (req, res) => {
  const { location } = req.body;
  const newBanner = new Banner({
    image: `/uploads/banners/${req.file.filename}`,
    location,
  });
  await newBanner.save();
  res.status(201).json(newBanner);
});

// Get banners by location
router.get('/:location', async (req, res) => {
  const banners = await Banner.find({ location: req.params.location });
  res.json(banners);
});

// Delete banner
router.delete('/:id', async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: 'Banner deleted successfully' });
});

export default router;
