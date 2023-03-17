import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utilities/cognito";
import { playerPositionOptions } from "../utilities/playerPosition";
import { useDispatch } from "react-redux";
import { setCaptain } from "../reducer/captainSlice";
import { useSelector } from "react-redux";

const MyPlayerList = ({ player }) => {
    const [isEdit, setIsEdit] = useState(false);
    const isCaptain = useSelector((state) => state.captain.captain.name === player.name);

    const [name, setName] = useState(player.name);
    const [position, setPosition] = useState(player.position);
    const [height, setHeight] = useState(player.height);
    const [weight, setWeight] = useState(player.weight);
    const [age, setAge] = useState(player.age);

    const dispatch = useDispatch();

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

    const clickSetCaptainHandler = () => {
        dispatch(setCaptain({ id: player.id, name: player.name, teamId: player.team_id }));
    };


    return (
        <>
            <div>
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
                                className="text-gray-200 font-semibold px-8 py-1 rounded-lg shadow-lg hover:shadow-lg mt-4"
                                type="submit"
                            >
                                <span className='material-symbols-outlined'>
                                    check_circle_outline
                                </span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className="hover:bg-lime-600 cursor-pointer min-h-full rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center"
                        onClick={clickSetCaptainHandler}
                    >
                        <div className="text-yellow-100 font-bold mb-1 tracking-widest">
                            {isCaptain ? (
                                <span className="font-extrabold">
                                    {name}
                                </span>
                            ) : (
                                <span>
                                    {name}
                                </span>
                            )}
                            {/* set captain */}
                            {isCaptain && (
                                <span className="text-yellow-400 ml-2">
                                    &copy;
                                </span>
                            )}
                        </div>
                        <div className="text-gray-100 text-sm mb-4">
                            {position}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                            <div className="text-yellow-100 font-semibold mr-2">Height:</div>
                            <div className="text-gray-200">{height}</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="text-yellow-100 font-semibold mr-2">Weight:</div>
                            <div className="text-gray-200">{weight}</div>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <div className="text-yellow-100 font-semibold mr-2">Age:</div>
                            <div className="text-gray-200">{age}</div>
                        </div>
                        <button
                            className="text-gray-200 font-semibold px-8 py-1 rounded-lg mt-4"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            <span >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7l-4-4L5 13z"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPlayerList;
