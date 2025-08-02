import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (city) => {
        try {
            const res = await fetch('/mockweather.json');
            const data = await res.json();

            const cityData = data[city];

            if (!cityData) {
                setWeatherData(null);
                setError(`No mock data found for "${city}".`);
            } else {
                setWeatherData(cityData);
                setError('');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load mock data.');
            setWeatherData(null);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/30 via-transparent to-slate-800/50"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/40 via-transparent to-blue-800/25"></div>

            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-slate-500/15 rounded-full mix-blend-normal filter blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-slate-600/15 to-blue-600/15 rounded-full mix-blend-normal filter blur-3xl opacity-50 animate-pulse" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-slate-500/10 to-blue-500/10 rounded-full mix-blend-normal filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '6s'}}></div>

            <div className="relative z-10 text-white px-6 py-12">

                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-slate-100 via-blue-100/90 to-slate-200/90 bg-clip-text text-transparent">
                        Weather Forecast
                    </h1>
                    <div className="flex justify-center items-center gap-4">
                        <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-400/60 rounded-full"></div>
                        <span className="text-4xl">🌦️</span>
                        <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-slate-400/60 rounded-full"></div>
                    </div>
                    <p className="text-xl text-slate-300/80 mt-6 font-light">
                        Discover weather conditions around the world
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {error && (
                    <div className="mt-8 flex justify-center">
                        <div className="bg-red-600/20 backdrop-blur-lg border border-red-500/30 text-red-200 px-8 py-4 rounded-2xl shadow-xl">
                            <p className="text-center font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {weatherData && (
                    <div className="mt-16 animate-fade-in">
                        {/* Location header */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-200/90 to-slate-200/90 bg-clip-text text-transparent mb-2">
                                {weatherData.location}
                            </h2>
                            <p className="text-xl text-slate-300/80 font-light">
                                {weatherData.country}
                            </p>
                            <div className="mt-4 flex justify-center">
                                <div className="h-0.5 w-32 bg-gradient-to-r from-blue-400/50 to-slate-400/50 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                            <WeatherCard {...weatherData.current} date="Today" />
                            {weatherData.forecast.map((day, index) => (
                                <WeatherCard key={index} {...day} />
                            ))}
                        </div>
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

            `}</style>
        </div>
    );
}

export default App;