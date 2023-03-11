import React, { useState } from 'react';
import * as cognito from '../../utilities/cognito'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamLogoUploader from '../../components/ImageUploadToS3Bucket/TeamLogoUploader';

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
                player: {
                    name: '',
                    position: '',
                    height: '',
                    weight: '',
                    age: '',
                },
            }),
        });
        const data = await response.json();
        console.log(data);
        navigate('/locker-room');
    };

    return (
        <div className="p-8 max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Create a New Team</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col mb-4">
                    <label htmlFor="team-name" className="text-lg font-semibold mb-2">
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
                {/* <div className="flex flex-col mb-4">
                    <label htmlFor="team-logo-url" className="text-lg font-semibold mb-2">
                        Team Logo URL
                    </label>
                    <TeamLogoUploader setTeamLogoUrl={setTeamLogoUrl} />
                </div> */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="city" className="text-lg font-semibold mb-2">
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
                    <label htmlFor="country" className="text-lg font-semibold mb-2">
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
                    <label htmlFor="founded-date" className="text-lg font-semibold mb-2">
                        Founded Date
                    </label>
                    <input
                        type="date"
                        id="founded-date"
                        name="founded-date"
                        className="border-2 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-green-400"
                        value={foundedDate}
                        onChange={(event) => setFoundedDate(event.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg w-full"
                >
                    Create Team
                </button>
            </form>
        </div>

    );
};

export default CreateTeam;
