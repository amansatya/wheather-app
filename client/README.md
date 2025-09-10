# 🌦️ Weather App (Client Side) – React + Tailwind

Welcome to the **client** folder of the Weather App! This frontend provides a modern, responsive interface for searching weather by city or device location, displaying weather for today and the next 5 days, and offering a smooth user experience powered by React and Tailwind CSS.

---

## 🎯 App Summary

- **Feature:** Search any place or use your current location to view today's weather and the next 5-day forecast.
- **Flow:**
    - User searches for a city or uses device location → frontend sends request to backend → receives weather data for today and next 5 days → displays data in a dynamic, animated UI.

---

## 🗂️ Folder Structure

```
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/               # Static assets (images, icons)
│   │   └── react.svg         # React logo
│   ├── components/           # Reusable React components
│   │   ├── SearchBar.jsx     # Search input component
│   │   └── WeatherCard.jsx   # Displays weather info for a day
│   ├── pages/                # Page-level components
│   │   └── Home.jsx          # Main weather UI page
│   ├── utils/                # Utility/helper functions
│   │   ├── formatDate.js     # Format date helper
│   │   ├── generateDateRange.js # Generate array of dates
│   │   └── geolocation.js    # Geolocation utility
│   ├── App.jsx               # App entry point (imports Home + Analytics)
│   ├── index.css             # Global styles (Tailwind CSS)
│   └── main.jsx              # ReactDOM render setup
├── .gitignore
├── eslint.config.js          # Linting rules
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js        # Tailwind CSS config
└── vite.config.js            # Vite build config
```

---

## ⚙️ Main Components & Why They're Used

| Component              | Purpose & Why Used                           |
|------------------------|----------------------------------------------|
| **React**              | Fast, modular UI framework                   |
| **Tailwind CSS**       | Utility-first CSS for rapid design           |
| **Vite**               | Lightning-fast build tool for React apps     |
| **Axios/Fetch**        | Make HTTP requests to backend API            |
| **.env**               | Store API URLs and config securely           |
| **WeatherCard.jsx**    | Displays weather info per day                |
| **SearchBar.jsx**      | Input for city search or geolocation         |

---

## 🖥️ `src/components/` Folder

- **WeatherCard.jsx:**
    - Renders weather data for a single day (date, temp, icon, description, etc.)
    - Responsive, animated, styled via Tailwind
- **SearchBar.jsx:**
    - Input field for city name
    - Button for geolocation (optional)
    - Handles form submission to fetch weather data

---

## 🛠️ How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**  
   Add API base URL to `.env` (example):
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Access the app:**
   Open [http://localhost:5173](http://localhost:5173) (or as shown in terminal) in your browser.

---

## 🚢 Deployment

- Deploy frontend on [Vercel](https://vercel.com/) or similar platform.
- Ensure backend API endpoint is correctly set in `.env` for production.
- Tailwind CSS and Vite require minimal config for rapid, optimized builds.

---

## 🌈 UI Features

- **Search Bar:** City name input or one-click geolocation
- **Weather Cards:** Show date, icon, description, temperature, wind/humidity, etc.
- **Responsive Design:** Works perfectly on mobile and desktop
- **Animations:** Smooth transitions and loading skeletons for better UX
- **Error Handling:** User-friendly messages for API or city errors
- **Theme:** Tailwind gradients change based on weather type (sunny, stormy, etc.)

---

## 🔗 Related Docs

- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

---

## 🎉 Happy Coding!