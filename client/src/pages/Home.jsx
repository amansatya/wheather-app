import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCarousel from '../components/WeatherCard';
import { getUserLocation } from '../utils/geolocation';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (city) => {
        setLoading(true);
        setWeatherData(null);
        setError('');

        try {
            const res = await fetch(`${API_URL}?location=${city}`);
            if (!res.ok) throw new Error('City not found.');

            const data = await res.json();
            setWeatherData(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const successCallback = async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await res.json();
            let cityName = data.city || data.principalSubdivision;
            handleSearch(cityName || "Delhi");
        } catch {
            handleSearch("Delhi");
        }
    };

    const errorCallback = () => handleSearch("Delhi");

    useEffect(() => {
        getUserLocation(successCallback, errorCallback);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/30 via-transparent to-slate-800/50"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/40 via-transparent to-blue-800/25"></div>

            <div className="relative z-10 text-white px-4 sm:px-6 py-10 sm:py-12">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-slate-100 via-blue-100/90 to-slate-200/90 bg-clip-text text-transparent">
                        Weather Forecast
                    </h1>
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
                        </div>
                        <WeatherCarousel weatherData={weatherData} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
