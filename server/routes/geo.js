const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/geo-reverse', async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Missing lat or lon query parameters" });
    }

    try {
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
        const response = await axios.get(url);

        res.json(response.data);
    } catch (error) {
        console.error("❌ Reverse geocoding failed:", error.message);
        res.status(500).json({ error: "Reverse geocoding failed" });
    }
});

module.exports = router;
