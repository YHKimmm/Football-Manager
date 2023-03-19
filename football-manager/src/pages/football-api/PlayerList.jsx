import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayerInfo from "../../components/PlayerInfo";
import DropDown from "../../components/DropDown";
import TeamDetailModal from "../../components/modal/TeamDetailModal";
import { GiSoccerKick } from 'react-icons/gi';
import { setGlobalState, useGlobalState } from "../../utilities/global_state";

const PlayerList = () => {
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState({});
    const [venue, setVenue] = useState({});
    const [numPlayers, setNumPlayers] = useState(5);
    const [allPlayersLoaded, setAllPlayersLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams();

    const seasons = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
    const [defaultSeaon] = useGlobalState("defaultSeason");

    async function fetchPlayers() {
        const response = await fetch(
            `https://api-football-v1.p.rapidapi.com/v3/players?team=${id}&season=${defaultSeaon}`,
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
        setPlayers(data.response);
    }

    async function fetchTeam() {
        const response = await fetch(
            `https://api-football-v1.p.rapidapi.com/v3/teams?id=${id}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "b6d88e06e9mshf78c6545bb0c9b0p10a9d9jsn1d8839490f0e",
                    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
                },
            }
        );
        const data = await response.json();
        console.log(data.response[0]);
        setTeam(data.response[0].team);
        setVenue(data.response[0].venue);
    }


    useEffect(() => {
        fetchPlayers();
        fetchTeam();
    }, [id, defaultSeaon]);

    const handleSeasonChange = (e) => {
        setGlobalState("defaultSeason", e.target.value);
    };

    const handleNumPlayers = () => {
        const newNumPlayers = numPlayers + 5;

        if (newNumPlayers > players.length) {
            setAllPlayersLoaded(true);
        } else {
            setNumPlayers(newNumPlayers);
        }
    };

    return (
        <div className="container mx-auto p-5 mt-5">
            <a onClick={() => navigate(-1)} className="cursor-pointer">
                ← Back
            </a>
            <img
                src={team.logo}
                alt=""
                className="w-25 h-25 object-cover mx-auto mb-5"
            />

            <h1 className="text-2xl text-center font-bold mb-5">{team.name}</h1>

            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center tracking-widest m-auto my-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 transform hover:-translate-y-1 hover:scale-110"
            >
                More Info about {team.name}
            </button>
            {showModal ? <TeamDetailModal setShowModal={setShowModal} team={team} venue={venue} /> : null}

            <div className="flex justify-center mb-1">
                <DropDown
                    seasons={seasons}
                    selectedSeason={defaultSeaon}
                    handleSeasonChange={handleSeasonChange}
                />
            </div>

            {/* current squad */}
            <div className="flex justify-center mb-5 text-center">
                <h3 className="text-lg md:text-xl font-bold mb-4 tracking-wider">
                    Looking for Current Squad of {team.name}?
                    <span className="flex justify-center mt-2 animate-pulse">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </span>
                    <span
                        onClick={() => navigate(`/teams/${id}/current-squad`)}
                        className="cursor-pointer flex items-center justify-center mt-5"
                    >
                        <GiSoccerKick size={32} className="animate-bounce" />
                    </span>
                </h3>
            </div>

            <h3 className="text-xl font-bold mb-5">Players</h3>
            <Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players ? (
                        players.slice(0, numPlayers).map((player, index) => (
                            <div
                                key={player.player.id}
                                className={`${player.statistics[0].games.rating > 7 ? 'bg-emerald-400' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center space-x-4`}>
                                <PlayerInfo player={player} index={index} />
                            </div>
                        ))

                    ) : (
                        <div className="text-center">Loading...</div>
                    )}
                </div>
                <div className="text-center">
                    {!allPlayersLoaded ? (
                        <button
                            onClick={handleNumPlayers}
                            className=" bg-green-500 hover:bg-green-600 mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Load More
                        </button>
                    ) : (
                        <div className="text-gray-500 mt-4">No more players to show</div>
                    )}
                </div>
            </Fragment>
        </div>
    );
};

export default PlayerList;
