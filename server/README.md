# 🌦️ Weather App (Server Side) – Express + Node

Welcome to the **server** folder of the Weather App! This backend powers the weather data API for the full MERN stack project, handling requests for weather data (today and the next 5 days) and delivering clean JSON to your React frontend.

---

## 🎯 App Summary

- **Feature:** Show weather for today and the next 5 days.
- **Flow:**
    - Search any place → backend fetches weather for today and next 5 days from an external API → returns data for clean, dynamic frontend UI → fully deployed on Render/Vercel.

---

## 🗂️ Folder Structure

```
server/
├── routes/
│   └── weather.js        # Main route for all weather data endpoints!
│   └── geo.js            # Current user location weather data
├── .gitignore
├── index.js              # Express app entry point
├── package.json
└── package-lock.json
```

---

## ⚙️ Main Components & Why They're Used

| Component        | Purpose & Why Used |
|------------------|--------------------|
| **Express**      | Create REST API, handle routing and middleware |
| **axios**        | Fetch external weather APIs easily |
| **dotenv**       | Securely load API keys/config from `.env` |
| **cors**         | Allow frontend to talk to backend |

---

## 🗂️ `routes/` Folder

- **weather.js:**
    - All API logic lives here!
    - Modularizes weather data handling, making it easy to expand (add new sources, caching, etc.)
    - Example structure:
      ```js
      router.get('/weather', async (req, res) => {
        // 1. Geocode city → lat/lon
        // 2. Fetch today's weather and 5-day forecast
        // 3. Parse/group forecast by day
        // 4. Send cleaned JSON
      });
      ```
- **geo.js:**
    - All reverse geocoding logic lives here!
    - Modularizes place lookup by coordinates (lat/lon), making it easy to expand (add new sources, caching, etc.)
    - Example structure:
      ```js
      router.get('/geo-reverse', async (req, res) => {
        // 1. Read lat/lon from query params
        // 2. Fetch location details using OpenWeatherMap reverse geocoding API
        // 3. Return location data as JSON
        // 4. Handle errors gracefully
      });
      ```

---

## 🛠️ How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Add your API keys to `.env`:**
   ```
   WEATHER_API_KEY=your_api_key_here
   ```
3. **Start the server:**
   ```bash
   node index.js
   ```
4. **Connect your frontend to:**
    - Weather data:
      ```
      GET /api/weather?location={YourCity}
      ```
      The backend will respond with weather data for today and the next 5 days.
    - Reverse geocoding (current location):
      ```
      GET /api/geo-reverse?lat={latitude}&lon={longitude}
      ```
      The backend will respond with location data based on coordinates.

---

## 🚢 Deployment

- Deploy backend on [Render](https://render.com/) or similar cloud platform.
- Store production API keys in `.env` (never commit secrets!).
- Enable CORS to allow frontend access.
- Configure proxy if your frontend and backend are on different domains.

---

## 🔗 Related Docs

- [OpenWeatherMap API](https://openweathermap.org/api)
- [ExpressJS Docs](https://expressjs.com/)
- [Axios Docs](https://axios-http.com/)

---

## 🎉 Happy Coding!