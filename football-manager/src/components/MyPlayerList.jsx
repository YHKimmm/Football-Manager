import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utilities/cognito";
import { playerPositionOptions } from "../utilities/playerPosition";
import { useDispatch } from "react-redux";
import { setCaptain } from "../reducer/captainSlice";
import { deleteCaptain } from "../reducer/captainSlice";
import { useSelector } from "react-redux";

const MyPlayerList = ({ player, setPlayers, players }) => {
    const [isEdit, setIsEdit] = useState(false);
    const captain = useSelector((state) => state.captain.captains[player.team_id]);
    const [isExpanded, setIsExpanded] = useState(false);

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
        dispatch(setCaptain({
            id: player.id,
            name: player.name,
            teamId: player.team_id,
        }));
    };

    const deleteHandler = async () => {
        try {
            const token = await getAccessToken();
            const response = await fetch(
                `https://00ve5ej1fg.execute-api.ca-central-1.amazonaws.com/default/player/${player.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            const data = await response.json();
            console.log("data: ", data);
            const newPlayers = players.filter((p) => p.id !== data.player.id);
            setPlayers(newPlayers);
            dispatch(deleteCaptain(player.team_id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                {isEdit ? (
                    <form onSubmit={submitHandler}>
                        <div className="min-h-full rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
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
                                    className="w-full px-6 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                                    required
                                >
                                    <option value="">Select a position</option>
                                    {playerPositionOptions().map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.value}
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
                    <div className="mt-10 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
                        <div
                            className="cursor-pointer text-yellow-100 font-bold mb-1 tracking-widest"
                            onClick={clickSetCaptainHandler}
                            title="Click to set captain"
                        >
                            {captain && captain.id === player.id ? (
                                <>
                                    <span className="font-extrabold">{name}</span>
                                    <span className="text-yellow-400 ml-2">&copy;</span>
                                </>
                            ) : (
                                <span>{name}</span>
                            )}
                        </div>
                        <div className="text-gray-100 text-sm mb-4">{position}</div>
                        {isExpanded && (
                            <div className="flex flex-col items-center justify-center mt-2 text-gray-200">
                                <div className="flex items-center justify-center mb-2">
                                    <div className="text-yellow-100 font-semibold mr-2">Height:</div>
                                    <div>{height}</div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="text-yellow-100 font-semibold mr-2">Weight:</div>
                                    <div>{weight}</div>
                                </div>
                                <div className="flex items-center justify-center mt-2">
                                    <div className="text-yellow-100 font-semibold mr-2">Age:</div>
                                    <div>{age}</div>
                                </div>
                            </div>
                        )}
                        <button
                            className="text-gray-200 font-semibold px-8 py-1 rounded-lg mt-4"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 15l7-7 7 7"
                                    />
                                </svg>
                            </span>
                        </button>
                        {isExpanded && (
                            <div className="flex">
                                {/* button for edit */}
                                <button
                                    className="text-yellow-200 font-semibold px-8 py-1 rounded-lg mt-4"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    <span>
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
                                {/* button for delete */}
                                <button
                                    className="text-gray-200 font-semibold px-8 py-1 rounded-lg mt-4"
                                    onClick={deleteHandler}
                                >
                                    <span className='material-symbols-outlined text-red-300'>
                                        delete
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPlayerList;
