import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [premierLeague, setPremierLeague] = useState([]);
    const [laLiga, setLaLiga] = useState([]);
    const [serieA, setSerieA] = useState([]);
    const [ligue1, setLigue1] = useState([]);
    const [bundesliga, setBundesliga] = useState([]);

    async function fetchLeague(country) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`,
            {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'b6d88e06e9mshf78c6545bb0c9b0p10a9d9jsn1d8839490f0e',
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            }
        );
        const data = await response.json();
        return data.response[0].league;
    }

    useEffect(() => {
        Promise.all([
            fetchLeague("England"),
            fetchLeague("Spain"),
            fetchLeague("Italy"),
            fetchLeague("France"),
            fetchLeague("Germany")
        ]).then(([premierLeague, laLiga, serieA, ligue1, bundesliga]) => {
            setPremierLeague(premierLeague);
            setLaLiga(laLiga);
            setSerieA(serieA);
            setLigue1(ligue1);
            setBundesliga(bundesliga);
        })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 tracking-widest">
                Welcome to Football Manager
            </h1>
            <h2 className="text-2xl font-bold mb-4">
                Explore the world of football and manage your own team
            </h2>
            <p className="text-lg mb-4">
                Select a league to view the teams and players from the selected season
            </p>

            <div className="flex flex-wrap -mx-6 mb-8">
                <div className="w-full md:w-1/3 px-4 text-center my-4">
                    <Link to='/premier-league'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <img src={premierLeague.logo} alt={premierLeague.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{premierLeague.name}</h3>
                            <p className="text-lg">
                                Explore the teams and players of the English Premier League.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full md:w-1/3 px-4 text-center my-4">
                    <Link to='/la-liga'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <img src={laLiga.logo} alt={laLiga.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{laLiga.name}</h3>
                            <p className="text-lg">
                                Discover the teams and players of the Spanish La Liga.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full md:w-1/3 px-4 text-center my-4">
                    <Link to='/serie-a'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <img src={serieA.logo} alt={serieA.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{serieA.name}</h3>
                            <p className="text-lg">
                                Check out the teams and players of the Italian Serie A.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full md:w-1/3 px-4 text-center my-4">
                    <Link to='/ligue-1'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <img src={ligue1.logo} alt={ligue1.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{ligue1.name}</h3>
                            <p className="text-lg">
                                Explore the teams and players of the French Ligue 1.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full md:w-1/3 px-4 text-center my-4">
                    <Link to='/bundesliga'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <img src={bundesliga.logo} alt={bundesliga.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{bundesliga.name}</h3>
                            <p className="text-lg">
                                Experience the teams and players of the German Bundesliga.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;