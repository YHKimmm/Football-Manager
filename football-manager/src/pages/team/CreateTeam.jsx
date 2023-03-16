import React, { useState } from 'react';
import * as cognito from '../../utilities/cognito'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const imageFolderPath = import.meta.env.BASE_URL + "";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [teamLogoUrl, setTeamLogoUrl] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [foundedDate, setFoundedDate] = useState('');

    const navigate = useNavigate();

    // country selector
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = country => {
        setCountry(country)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await cognito.getAccessToken();

        const response = await fetch('https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                name: teamName,
                logo_url: teamLogoUrl.split('?')[0],
                city,
                country,
                founded_date: foundedDate,
            }),
        });
        const data = await response.json();
        console.log(data);
        navigate('/locker-room');
    };

    return (
        <div className="p-8 max-w-screen-sm m-auto md:mt-10">
            <div className="absolute inset-0 z-[-1] w-full h-full bg-cover bg-center filter"
                style={{ backgroundImage: `url(${imageFolderPath}stadium.jpg)` }}></div>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-6 text-neutral-200"
            >
                Create a New Team
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col mb-4">
                    <label htmlFor="team-name" className="text-lg font-semibold mb-2 text-neutral-200 tracking-widest">
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="team-name"
                        name="team-name"
                        className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-green-400"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="city" className="text-lg font-semibold mb-2 text-neutral-200 tracking-widest">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-green-400"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="country" className="text-lg font-semibold mb-2 text-neutral-200 tracking-widest">
                        Country
                    </label>
                    <Select
                        className="rounded-lg py-2 focus:outline-none focus:ring focus:border-green-400"
                        options={options}
                        value={country}
                        onChange={changeHandler}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="founded-date" className="text-lg font-semibold mb-2 text-neutral-200 tracking-widest">
                        Founded Date
                    </label>
                    <input
                        type="date"
                        id="founded-date"
                        name="founded-date"
                        className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-green-400 mb-4 md:mb-8"
                        value={foundedDate}
                        onChange={(event) => setFoundedDate(event.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full tracking-widest"
                >
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;
