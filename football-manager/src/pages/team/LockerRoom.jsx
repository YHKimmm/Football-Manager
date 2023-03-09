import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../utilities/cognito";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LockerRoom = () => {
    const [team, setTeam] = useState([]);
    const [coachInfo, setCoachInfo] = useState({});
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTeam = async () => {
            const token = await getAccessToken();
            const response = await fetch(
                "https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            const data = await response.json();
            console.log("data", data);
            setTeam(data.team);
            setCoachInfo(data.coach);
        };
        fetchTeam();
    }, []);

    return (
        <div className="bg-gray-700 p-3">
            <div className="p-8 max-w-screen-2xl mx-auto">
                <h1 className="text-2xl font-semibold text-yellow-400 mb-4">{user.username.toUpperCase()}'s Locker Room</h1>
                <p className="text-gray-500 text-base font-bold">Head Coach</p>
                <p className="text-2xl mb-6 font-bold text-yellow-400">{coachInfo.fullname}</p>
                <p className="text-gray-500 text-base font-bold">Bio</p>
                <p className="text-xl mb-6 font-bold text-yellow-400">{coachInfo.bio}</p>
            </div>
            <div className="p-8 bg-gray-600 max-w-screen-2xl mx-auto text-white flex flex-col">
                <h1 className="text-2xl font-semibold text-yellow-400 mb-4">Locker Room</h1>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {team.length ?
                        (
                            team.map((team) => (
                                <li key={team.id} className="bg-gray-500 rounded-lg shadow-md p-4">
                                    <Link to={`/team/${team.id}`}>
                                        <h2 className="text-xl font-semibold text-yellow-400 mb-2">{team.name}</h2>
                                        <div className="mb-2">
                                            <p className="mr-4">
                                                <span className="font-semibold text-yellow-400">City:</span> {team.city}
                                            </p>
                                            <p>
                                                <span className="font-semibold text-yellow-400">Country:</span>{" "}
                                                {JSON.parse(team.country).label}
                                            </p>
                                        </div>
                                        <p className="mb-2">
                                            <span className="font-semibold text-yellow-400">Founded:</span> {team.founded_date}
                                        </p>
                                        <div className="flex items-center mt-3">
                                            <img className="w-24 h-24 object-contain rounded-lg" src={team.logo_url} alt="" />
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <div className="mt-2">
                                <p className="text-xl font-semibold text-yellow-400 mb-4">You have no teams available</p>
                                <Link to='/create-team'>
                                    <button className="bg-yellow-400 text-gray-700 font-semibold py-2 px-4 rounded-lg">
                                        Create Team
                                    </button>
                                </Link>
                            </div>
                        )}
                </ul>
            </div>
        </div>
    );
};

export default LockerRoom;