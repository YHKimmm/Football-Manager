import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utilities/cognito";
import { playerPositionOptions } from "../utilities/playerPosition";

const MyPlayerList = ({ player }) => {
    const [isEdit, setIsEdit] = useState(false);

    const [name, setName] = useState(player.name);
    const [position, setPosition] = useState(player.position);
    const [height, setHeight] = useState(player.height);
    const [weight, setWeight] = useState(player.weight);
    const [age, setAge] = useState(player.age);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsEdit(false);
        try {
            const token = await getAccessToken();
            const response = await fetch(
                `https://00ve5ej1fg.execute-api.ca-central-1.amazonaws.com/default/player/${player.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        name,
                        position,
                        height,
                        weight,
                        age,
                    }),
                }
            );
            const data = await response.json();
            console.log("data: ", data);
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(player.id) when you click on the edit button for a player
    useEffect(() => {
        console.log("player: ", player);
    }, [player]);

    return (
        <>
            {isEdit ? (
                <form onSubmit={submitHandler}>
                    <div className="bg-gray-800 min-h-full rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
                        <div className="text-yellow-400 font-bold mb-1 tracking-widest">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                required
                            />
                        </div>
                        <div className="text-gray-400 text-base py-2">
                            <select
                                id="position"
                                name="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                required
                            >
                                <option value="">Select a position</option>
                                {playerPositionOptions().map((option) => (
                                    <option key={option.value} value={position.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="text-gray-400">
                                <input
                                    type="text"
                                    id="height"
                                    name="height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="text-gray-400">
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="text-gray-400">
                                <input
                                    type="text"
                                    id="age"
                                    name="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            className="bg-yellow-500 text-gray-800 font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 mt-4"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <div
                    className="bg-gray-800 min-h-full rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center"
                >
                    <div className="text-yellow-400 font-bold mb-1 tracking-widest">
                        {name}
                    </div>
                    <div className="text-gray-400 text-sm mb-4">
                        {position}
                    </div>
                    <div className="flex items-center justify-center mb-2">
                        <div className="text-yellow-400 font-semibold mr-2">Height:</div>
                        <div className="text-gray-400">{height}</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-yellow-400 font-semibold mr-2">Weight:</div>
                        <div className="text-gray-400">{weight}</div>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                        <div className="text-yellow-400 font-semibold mr-2">Age:</div>
                        <div className="text-gray-400">{age}</div>
                    </div>
                    <button
                        className="bg-yellow-500 text-gray-800 font-semibold px-8 py-1 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 mt-4"
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        Edit
                    </button>
                </div>
            )}
        </>
    );
};

export default MyPlayerList;
