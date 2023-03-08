import React from "react";

export default function DropDown({ seasons, selectedSeason, handleSeasonChange }) {
    return (
        <div className="flex items-center justify-center mb-5">
            <label htmlFor="season" className="mr-2">Season:</label>
            <select
                id="season"
                value={selectedSeason}
                onChange={handleSeasonChange}
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                ))}
            </select>
        </div>
    );
}