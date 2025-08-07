require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');
const geoRoute = require('./routes/geo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoute);
app.use('/api', geoRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
