
const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY";
const SHOP_LOCATION = "24.847628984056585,67.0579537149963"; // Happy Palace School location

router.post("/calculate", async (req, res) => {
  const { address } = req.body;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
      {
        params: {
          origins: SHOP_LOCATION,
          destinations: address,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const distanceInMeters = response.data.rows[0].elements[0].distance.value;
    res.json({ distance: distanceInMeters });
  } catch (error) {
    console.error("Error getting distance:", error.message);
    res.status(500).json({ error: "Failed to calculate distance" });
  }
});

module.exports = router;
