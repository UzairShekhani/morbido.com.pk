require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Routes import
const bannerRoutes = require("./routes/bannerRoutes");
const flavorRoutes = require("./routes/flavorRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); // ✅ yahan hona chahiye

// ✅ Routes use
app.use("/api/banners", bannerRoutes);
app.use("/api/flavors", flavorRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // ✅ iske neeche hona chahiye import ke

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
