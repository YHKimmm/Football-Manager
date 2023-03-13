import React from "react";

const MyPlayerList = ({ player }) => {
    return (
        <>
            <div
                className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center"
            >
                <div className="text-yellow-400 font-bold mb-1 uppercase">
                    {player.name}
                </div>
                <div className="text-gray-400 text-sm mb-4">
                    {player.position}
                </div>
                <div className="flex items-center justify-center mb-2">
                    <div className="text-yellow-400 font-semibold mr-2">Height:</div>
                    <div className="text-gray-400">{player.height}</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="text-yellow-400 font-semibold mr-2">Weight:</div>
                    <div className="text-gray-400">{player.weight}</div>
                </div>
                <div className="flex items-center justify-center mt-2">
                    <div className="text-yellow-400 font-semibold mr-2">Age:</div>
                    <div className="text-gray-400">{player.age}</div>
                </div>
            </div>
        </>
    );
};

export default MyPlayerList;
