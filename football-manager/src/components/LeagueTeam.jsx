import React from "react";
import { Link } from "react-router-dom";

const LeagueTeam = ({ team }) => {
    return (
        <div className="px-4 text-center mb-2">
            <div className="bg-white rounded-lg shadow-md p-4 md:min-h-[290px]">
                <Link to={`/teams/${team.team.id}`}>
                    <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="w-30 h-40 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{team.team.name}</h3>
                </Link>
                <p className="text-gray-600">{team.venue.name}, {team.venue.city}</p>
            </div>
        </div>
    )
};

export default LeagueTeam;
