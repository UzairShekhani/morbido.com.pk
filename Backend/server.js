require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Static folder for uploaded images

// ✅ Routes Import
const bannerRoutes = require("./routes/bannerRoutes");
const flavorRoutes = require("./routes/flavorRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ Order route added

// ✅ Use Routes
app.use("/api/banners", bannerRoutes);
app.use("/api/flavors", flavorRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // ✅ Use order route

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend server running on port ${PORT}`));
