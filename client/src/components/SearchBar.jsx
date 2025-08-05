import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    const handleInputChange = (e) => setLocation(e.target.value);

    const handleSearch = () => {
        if (location.trim() !== '') {
            onSearch(location.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && location.trim() !== '') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12 w-full px-6">
            <div className="relative w-full sm:w-96">
                <input
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter city name..."
                    className="w-full px-6 py-4 rounded-2xl border bg-slate-800/30 backdrop-blur-lg text-slate-100 placeholder-slate-300/60 shadow-xl focus:outline-none focus:ring-3 focus:ring-teal-400/40 transition-all duration-300 hover:bg-slate-800/40 text-lg font-medium border-slate-600/20"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 -z-10 blur-lg"></div>
            </div>

            <button
                onClick={handleSearch}
                disabled={location.trim() === ''}
                className={`cursor-pointer relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                    location.trim() === ''
                        ? 'bg-slate-600/40 cursor-not-allowed text-slate-400'
                        : 'bg-gradient-to-r from-teal-600/80 to-cyan-600/80 hover:from-teal-500/90 hover:to-cyan-500/90 text-white shadow-xl hover:shadow-teal-500/20 border border-teal-500/20'
                }`}
            >
                <span className="relative z-10">Search</span>
                {location.trim() !== '' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
            </button>
        </div>
    );
};

export default SearchBar;