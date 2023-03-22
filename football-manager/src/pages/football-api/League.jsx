import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const imageFolderPath = import.meta.env.BASE_URL + "";

const League = () => {
    const [premierLeague, setPremierLeague] = useState([]);
    const [laLiga, setLaLiga] = useState([]);
    const [serieA, setSerieA] = useState([]);
    const [ligue1, setLigue1] = useState([]);
    const [bundesliga, setBundesliga] = useState([]);
    const [eredivisie, setEredivisie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchLeague(country) {
        setIsLoading(true);
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
        setIsLoading(false);
        return data.response[0].league;
    }

    useEffect(() => {
        Promise.all([
            fetchLeague("England"),
            fetchLeague("Spain"),
            fetchLeague("Italy"),
            fetchLeague("France"),
            fetchLeague("Germany"),
            fetchLeague("Netherlands")
        ]).then(([premierLeague, laLiga, serieA, ligue1, bundesliga, eredivisie]) => {
            setPremierLeague(premierLeague);
            setLaLiga(laLiga);
            setSerieA(serieA);
            setLigue1(ligue1);
            setBundesliga(bundesliga);
            setEredivisie(eredivisie);
        })
            .catch((error) => {
                <Spinner />
                console.log(error);
            });

    }, []);

    return (
        <div className="relative flex flex-col items-center min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center filter brightness-50"
                style={{ backgroundImage: `url(${imageFolderPath}game.jpg)` }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 opacity-75"></div>
            <div className="relative z-10 w-full max-w-6xl px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-100">Football Leagues</h1>
                <p className="text-xl text-center text-gray-100">Select a league to explore the teams and players.</p>
                {isLoading && <Spinner />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                <div className="w-full px-4 text-center my-4">
                    <Link to='/premier-league'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={premierLeague.logo} alt={premierLeague.name} className="w-30 h-40 mx-auto mb-4 bg-fuchsia-100 rounded-md" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{premierLeague.name}</h3>
                            <p className="text-lg text-gray-100">
                                Explore the teams and players of the English Premier League.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full px-4 text-center my-4">
                    <Link to='/la-liga'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={laLiga.logo} alt={laLiga.name} className="w-30 h-40 mx-auto mb-4 bg-slate-200 rounded-md" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{laLiga.name}</h3>
                            <p className="text-lg text-gray-100">
                                Discover the teams and players of the Spanish La Liga.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full px-4 text-center my-4">
                    <Link to='/serie-a'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={serieA.logo} alt={serieA.name} className="w-30 h-40 mx-auto mb-4 rounded-md" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{serieA.name}</h3>
                            <p className="text-lg text-gray-100">
                                Check out the teams and players of the Italian Serie A.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full px-4 text-center my-4">
                    <Link to='/ligue-1'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={ligue1.logo} alt={ligue1.name} className="w-30 h-40 mx-auto mb-4 rounded-md" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{ligue1.name}</h3>
                            <p className="text-lg text-gray-100">
                                Explore the teams and players of the French Ligue 1.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full px-4 text-center my-4">
                    <Link to='/bundesliga'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={bundesliga.logo} alt={bundesliga.name} className="w-30 h-40 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{bundesliga.name}</h3>
                            <p className="text-lg text-gray-100">
                                Discover the teams and players of the German Bundesliga.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="w-full px-4 text-center my-4">
                    <Link to='/eredivisie'>
                        <div className="bg-transparent rounded-lg shadow-2xl p-4 hover:shadow-xl h-full">
                            <img src={eredivisie.logo} alt={eredivisie.name} className="w-40 h-40 mx-auto mb-4 p-4 bg-orange-100 rounded-lg" />
                            <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">{eredivisie.name}</h3>
                            <p className="text-lg text-gray-100">
                                Check out the teams and players of the Dutch Eredivisie.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default League;