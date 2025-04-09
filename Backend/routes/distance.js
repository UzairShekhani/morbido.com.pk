const express = require('express');
const axios = require('axios');
const router = express.Router();

const SHOP_LOCATION = "24.847628984056585,67.0579537149963"; // Happy Palace School

router.post("/calculate", async (req, res) => {
  const { address } = req.body;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
      {
        params: {
          origins: SHOP_LOCATION,
          destinations: address,
          key: "AIzaSyDbZjILZ_-8uNlUCyLvq4-ACFMDyKkw-z0", // ← Replace with working key
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
