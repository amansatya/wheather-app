import React, { useState, useEffect, useRef } from 'react';

const WeatherCard = ({ date, temp, avgTemp, description, icon, wind, humidity, isActive }) => {
    const temperature = temp || avgTemp;

    return (
        <div
            className={`group relative transition-all duration-500 ${
                isActive ? 'scale-105 z-20' : 'scale-90 opacity-60'
            }`}
        >
            <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-green-400/20 rounded-3xl blur-md transition-opacity duration-500 ${
                    isActive ? 'opacity-70' : 'opacity-40'
                }`}
            ></div>

            <div className="relative bg-slate-800/40 backdrop-blur-xl p-5 sm:p-8 rounded-3xl shadow-2xl text-white w-64 sm:w-80 h-80 sm:h-96 flex flex-col items-center justify-center border border-slate-600/30">
                <div className="bg-gradient-to-r from-emerald-300/90 to-teal-300/90 bg-clip-text text-transparent font-bold text-base sm:text-lg mb-2">
                    {date === 'Today' ? 'Today' : date}
                </div>

                <div className="relative mb-3 sm:mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-xl opacity-40"></div>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon || '01d'}@2x.png`}
                        alt="weather icon"
                        className="relative z-10 w-14 h-14 sm:w-20 sm:h-20 filter drop-shadow-lg"
                    />
                </div>

                <div className="text-2xl sm:text-4xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-slate-100 to-emerald-100/90 bg-clip-text text-transparent">
                    {temperature}°C
                </div>

                <div className="capitalize text-sm sm:text-lg font-medium text-center mb-3 sm:mb-4 text-slate-100/90">
                    {description}
                </div>

                {wind && humidity && (
                    <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-700/40 px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-slate-600/30">
                            <span className="text-xs sm:text-lg">💨</span>
                            <span className="font-medium text-xs sm:text-sm">{wind} m/s</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-700/40 px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-slate-600/30">
                            <span className="text-xs sm:text-lg">💧</span>
                            <span className="font-medium text-xs sm:text-sm">{humidity}%</span>
                        </div>
                    </div>
                )}

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 bg-gradient-to-r from-emerald-400/60 to-teal-400/60 rounded-full"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-1.5 h-1.5 bg-gradient-to-r from-green-400/60 to-emerald-400/60 rounded-full"></div>
            </div>
        </div>
    );
};

const WeatherCarousel = ({ weatherData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const containerRef = useRef(null);

    const allWeatherData = [
        { ...weatherData.current, date: 'Today' },
        ...weatherData.forecast
    ];

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < allWeatherData.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const activeCard = container.children[currentIndex];
            if (isMobile && activeCard) {
                const cardWidth = activeCard.offsetWidth;
                const containerWidth = container.parentElement.offsetWidth;
                const offset = (containerWidth - cardWidth) / 2;
                container.style.transition = 'transform 0.4s ease';
                container.style.transform = `translateX(${offset - currentIndex * cardWidth}px)`;
            } else {
                const cardWidth = 320; // desktop fixed width
                const containerWidth = container.parentElement.offsetWidth;
                const offset = (containerWidth - cardWidth) / 2;
                container.style.transition = 'transform 0.5s ease';
                container.style.transform = `translateX(${offset - currentIndex * cardWidth}px)`;
            }
        }
    }, [currentIndex, isMobile]);

    return (
        <div className="relative w-full overflow-hidden max-w-4xl mx-auto">
            {currentIndex > 0 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-lg p-2 sm:p-4 rounded-full border border-slate-600/30 text-white hover:text-emerald-300 transition-all duration-300 hover:scale-110 shadow-xl"
                >
                    <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {currentIndex < allWeatherData.length - 1 && (
                <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-lg p-2 sm:p-4 rounded-full border border-slate-600/30 text-white hover:text-emerald-300 transition-all duration-300 hover:scale-110 shadow-xl"
                >
                    <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}

            <div className="w-full overflow-hidden h-[340px] sm:h-[420px] flex items-center">
                <div
                    ref={containerRef}
                    className={`flex ${isMobile ? 'gap-0' : 'gap-8'}`}
                    style={{
                        minWidth: `${allWeatherData.length * (isMobile ? 256 : 320)}px`
                    }}
                >
                    {allWeatherData.map((card, index) => (
                        <div key={index} className="flex-shrink-0">
                            <WeatherCard {...card} isActive={index === currentIndex} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-6 gap-3">
                {allWeatherData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 scale-125'
                                : 'bg-slate-600/50 hover:bg-slate-500/70'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeatherCarousel;
