# 🌦️ Weather App (MERN Stack)

Welcome to the **Weather App**, a full-stack project built with React, Express, Node.js, and Tailwind CSS! This app enables users to search for any city (or use their current location) and view weather data for today and the next 5 days, in a clean and responsive UI.

---

## 🏗️ Project Structure

```
weather-app/
├── .idea/                  # IDE/editor config files
├── client/                 # Frontend (React + Tailwind)
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Backend (Node + Express)
│   ├── routes/
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│   └── README.md
├── node_modules/
├── .gitignore
├── LICENSE                 # Project license
└── README.md               # Main project documentation (this file)
```

---

## 🚀 Features

- **Search by City:** Instantly check weather for any place worldwide.
- **Current Location Weather:** Use device location for local weather (reverse geocoding with geo.js).
- **Today + 5-Day Forecast:** See detailed weather info for today and the next 5 days.
- **Responsive UI:** Works perfectly on desktop & mobile.
- **Live Demo:** Fully deployed on Render (backend) and Vercel (frontend).

---

## ✨ Demo

**Try it live:**  
[WEATHER-APP](https://weather-app-satya-amans-projects.vercel.app/)

---

## 📦 Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **APIs:** OpenWeatherMap for weather & geocoding
- **Deployment:** Vercel (frontend), Render (backend)

---

## 📚 How It Works

1. **Frontend:**
    - User searches for a city or uses the "current location" button.
    - Sends request to backend API (`/api/weather` or `/api/geo-reverse`).
    - Receives weather data for today and the next 5 days.
    - Displays data in animated, responsive cards.

2. **Backend:**
    - Receives location or coordinates.
    - Uses OpenWeatherMap API to fetch weather and geocoding data.
    - Parses and returns clean JSON to frontend.

3. **Deployment:**
    - Frontend hosted on Vercel for fast global delivery.
    - Backend hosted on Render with secure `.env` API keys.

---

## 🛠️ Getting Started (Development)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```
2. **Install dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. **Add API keys:**
    - In `server/.env`:
      ```
      WEATHER_API_KEY=your_openweathermap_key
      ```
    - In `client/.env`, set API base URL if needed.

4. **Run locally:**
    - Backend: `cd server && node index.js`
    - Frontend: `cd client && npm run dev`
    - Open [http://localhost:5173](http://localhost:5173)

---

## 📝 Docs & References

- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [Tailwind Docs](https://tailwindcss.com/)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎉 Happy Weather Tracking!