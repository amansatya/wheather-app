import React from 'react';

const WeatherCard = ({ date, temp, avgTemp, description, icon, wind, humidity }) => {
    const temperature = temp || avgTemp;

    return (
        <div className="group relative">

            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-green-400/20 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>

            <div className="relative bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-white w-full sm:w-72 flex flex-col items-center transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border border-slate-600/30">

                <div className="bg-gradient-to-r from-emerald-300/90 to-teal-300/90 bg-clip-text text-transparent font-bold text-lg mb-2">
                    {date}
                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-xl opacity-40"></div>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="weather icon"
                        className="relative z-10 w-20 h-20 filter drop-shadow-lg"
                    />
                </div>

                <div className="text-4xl font-black mb-3 bg-gradient-to-r from-slate-100 to-emerald-100/90 bg-clip-text text-transparent">
                    {temperature}°C
                </div>

                <div className="capitalize text-lg font-medium text-center mb-4 text-slate-100/90">
                    {description}
                </div>

                {wind && humidity && (
                    <div className="flex items-center justify-center gap-4 w-full">
                        <div className="flex items-center gap-2 bg-slate-700/40 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-600/30">
                            <span className="text-lg">💨</span>
                            <span className="font-medium text-sm">{wind} m/s</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-700/40 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-600/30">
                            <span className="text-lg">💧</span>
                            <span className="font-medium text-sm">{humidity}%</span>
                        </div>
                    </div>
                )}

                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-emerald-400/60 to-teal-400/60 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-r from-green-400/60 to-emerald-400/60 rounded-full"></div>
            </div>
        </div>
    );
};

export default WeatherCard;