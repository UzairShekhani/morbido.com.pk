import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  location: { type: String, required: true }, // "home" or "product"
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
