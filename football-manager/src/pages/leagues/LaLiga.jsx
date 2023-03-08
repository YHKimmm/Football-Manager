import React, { useState, useEffect } from "react";
import LeagueTeam from "../../components/LeagueTeam";

const LaLiga = () => {
    const [teams, setTeams] = useState([]);

    async function fetchTeams() {
        const response = await fetch(
            "https://api-football-v1.p.rapidapi.com/v3/teams?season=2022&league=140",
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
        setTeams(data.response);
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 tracking-widest">
                La Liga Teams
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <LeagueTeam team={team} key={team.team.id} />
                ))}
            </div>
        </div>
    );
};

export default LaLiga;
