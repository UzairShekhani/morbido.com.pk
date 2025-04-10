const express = require("express");
const axios = require("axios");
const router = express.Router();

const SHOP_LOCATION = "24.847628984056585,67.0579537149963";

router.post("/calculate", async (req, res) => {
  const { address } = req.body;
  const key = process.env.GOOGLE_MAPS_API_KEY;

  try {
    console.log("📍 Destination Address:", address);

    const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
      params: {
        origins: SHOP_LOCATION,
        destinations: address,
        key,
      },
    });

    const result = response.data?.rows?.[0]?.elements?.[0];

    if (!result || result.status !== "OK" || !result.distance) {
      console.error("❌ Invalid distance response:", result);
      return res.status(400).json({ error: "Invalid address. Please select from suggestions." });
    }

    const distanceInMeters = result.distance.value;
    res.json({ distance: distanceInMeters });

  } catch (error) {
    console.error("🔥 Error getting distance:", error.message);
    res.status(500).json({ error: "Failed to calculate distance" });
  }
});

module.exports = router;
