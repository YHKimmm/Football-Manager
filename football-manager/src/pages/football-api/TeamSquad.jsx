import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TeamSquad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [teamInfo, setTeamInfo] = useState({});

    async function fetchCurrentPlayerSquds() {
        const response = await fetch(
            `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${id}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "b6d88e06e9mshf78c6545bb0c9b0p10a9d9jsn1d8839490f0e",
                    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
                },
            }
        );
        const data = await response.json();
        console.log(data.response);
        setPlayers(data.response[0].players);
        setTeamInfo(data.response[0].team);
    }
    useEffect(() => {
        fetchCurrentPlayerSquds();
    }, [id]);
    console.log(players);

    return (
        <div className="container mx-auto px-4 py-8">
            <a onClick={() => navigate(-1)} className="cursor-pointer">
                ← Back
            </a>
            <img
                src={teamInfo.logo}
                alt=""
                className="w-25 h-25 object-cover mx-auto mb-5"
            />

            <h1 className="text-2xl text-center font-bold mb-5">{teamInfo.name}</h1>
            <h2 className="text-2xl font-bold my-4 tracking-widest">
                Team Squad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                    <div className="bg-white shadow-md rounded-md p-4" key={player.id}>
                        <div className="flex items-center">
                            <img src={player.photo} alt="" className="w-20 h-20 mr-2 object-cover rounded-full" />
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800">
                                    {player.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {player.position}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Age: {player.age}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Number: {player.number ? player.number : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TeamSquad;
