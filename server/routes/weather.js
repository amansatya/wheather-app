const express = require('express');
const axios = require('axios');
const router = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
router.get('/', async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const geoRes = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
            params: {
                q: location,
                limit: 1,
                appid: WEATHER_API_KEY,
            },
        });

        if (geoRes.data.length === 0) {
            return res.status(404).json({ error: 'City not found' });
        }

        const { lat, lon } = geoRes.data[0];

        const currentWeatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                units: 'metric',
                appid: WEATHER_API_KEY,
            },
        });

        const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat,
                lon,
                units: 'metric',
                appid: WEATHER_API_KEY,
            },
        });

        const forecastData = forecastRes.data.list.reduce((acc, item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});

        const response = {
            location: geoRes.data[0].name,
            country: geoRes.data[0].country,
            current: {
                temp: currentWeatherRes.data.main.temp,
                description: currentWeatherRes.data.weather[0].description,
                icon: currentWeatherRes.data.weather[0].icon,
                humidity: currentWeatherRes.data.main.humidity,
                wind: currentWeatherRes.data.wind.speed,
            },
            forecast: Object.entries(forecastData).slice(1, 6).map(([date, entries]) => {
                const temps = entries.map(e => e.main.temp);
                const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
                const { description, icon } = entries[0].weather[0];
                return { date, avgTemp, description, icon };
            }),
        };

        res.json(response);
    } catch (err) {
        console.error("🔥 FULL ERROR:", err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;