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

    console.log("📦 Google Distance API Response:", JSON.stringify(response.data, null, 2));

    const distanceData = response.data?.rows?.[0]?.elements?.[0];
    if (!distanceData || !distanceData.distance?.value) {
      console.error("❌ Distance not found in API response");
      return res.status(400).json({ error: "Could not fetch distance" });
    }

    const result = response.data.rows[0].elements[0];

if (!result || result.status !== "OK" || !result.distance) {
  return res.status(400).json({ error: "Address not recognized by Google Maps. Please choose a suggested one." });
}

const distanceInMeters = result.distance.value;
res.json({ distance: distanceInMeters });
    res.json({ distance: distanceInMeters });
  } catch (error) {
    console.error("🔥 Error getting distance:", error.message);
    res.status(500).json({ error: "Failed to calculate distance" });
  }
});


module.exports = router;
