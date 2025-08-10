import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCarousel from './components/WeatherCard';

const API_URL = import.meta.env.VITE_API_URL;
const API_REVERSE_URL = import.meta.env.VITE_API_REVERSE_URL;

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const generateDateRange = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(formatDate(date));
    }

    return dates;
};

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (city) => {
        setLoading(true);
        setWeatherData(null);
        setError('');

        try {
            const res = await fetch(`${API_URL}?location=${city}`);
            if (!res.ok) {
                throw new Error('City not found.');
            }
            const data = await res.json();
            setWeatherData(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            console.log("Geolocation not supported");
            handleSearch("Delhi");
        }
    }, []);

    const successCallback = async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const res = await fetch(`${API_REVERSE_URL}?lat=${lat}&lon=${lon}`);
            const data = await res.json();

            if (!Array.isArray(data) || data.length === 0) {
                console.warn("⚠️ No city found, falling back to Delhi");
                return handleSearch("Delhi");
            }

            const cityName = data[0]?.name;

            if (cityName) {
                handleSearch(cityName);
            } else {
                handleSearch("Delhi");
            }
        } catch (error) {
            console.error("❌ Reverse geocoding failed:", error);
            handleSearch("Delhi");
        }
    };

    const errorCallback = (error) => {
        console.warn("Geolocation error:", error.message);
        handleSearch("Delhi");
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/30 via-transparent to-slate-800/50"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/40 via-transparent to-blue-800/25"></div>
            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-slate-500/15 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-slate-600/15 to-blue-600/15 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-slate-500/10 to-blue-500/10 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '6s' }}></div>

            <div className="relative z-10 text-white px-4 sm:px-6 py-10 sm:py-12">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-slate-100 via-blue-100/90 to-slate-200/90 bg-clip-text text-transparent">
                        Weather Forecast
                    </h1>
                    <div className="flex justify-center items-center gap-3 sm:gap-4">
                        <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-transparent to-blue-400/60 rounded-full"></div>
                        <span className="text-2xl sm:text-4xl">🌦️</span>
                        <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-l from-transparent to-slate-400/60 rounded-full"></div>
                    </div>
                    <p className="text-base sm:text-xl text-slate-300/80 mt-4 sm:mt-6 font-light">
                        Discover weather conditions around the world
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {loading && (
                    <div className="mt-10 sm:mt-12 flex justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 sm:mt-8 flex justify-center">
                        <div className="bg-red-600/20 backdrop-blur-lg border border-red-500/30 text-red-200 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl text-center">
                            <p className="font-medium text-sm sm:text-base">{error}</p>
                            <button
                                onClick={() => handleSearch("London")}
                                className="mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition text-sm sm:text-base"
                            >
                                Try "London"
                            </button>
                        </div>
                    </div>
                )}

                {weatherData && (
                    <div className="mt-12 sm:mt-16 animate-fade-in">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-200/90 to-slate-200/90 bg-clip-text text-transparent mb-1 sm:mb-2">
                                {weatherData.location}
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-300/80 font-light">{weatherData.country}</p>
                            <div className="mt-3 sm:mt-4 flex justify-center">
                                <div className="h-0.5 w-20 sm:w-32 bg-gradient-to-r from-blue-400/50 to-slate-400/50 rounded-full"></div>
                            </div>
                        </div>

                        <WeatherCarousel weatherData={weatherData} />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}

export default App;
