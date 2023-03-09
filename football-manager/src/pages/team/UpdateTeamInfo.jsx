import React, { useState } from "react";
import { getAccessToken } from "../../utilities/cognito";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';

const UpdateTeamInfo = ({ teamInfo, handleUpdateUser }) => {
    const [city, setCity] = useState(teamInfo.city || "");
    const [country, setCountry] = useState(teamInfo.country || "");
    const [foundedDate, setFoundedDate] = useState(teamInfo.founded_date || "");
    const [logoUrl, setLogoUrl] = useState(teamInfo.logo_url || "");
    const [name, setName] = useState(teamInfo.name || "");

    // country selector
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = country => {
        setCountry(country)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessToken();
            const response = await fetch(
                `https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        name,
                        logo_url: logoUrl,
                        city,
                        country,
                        founded_date: foundedDate,
                    })
                }
            );
            const data = await response.json();
            handleUpdateUser(data);
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-screen-2xl p-3">
            <h1 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">Update {teamInfo.name}'s Team Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-600 rounded-lg shadow-md p-4">
                    <div className="flex items-center mb-2">
                        <div className="flex w-full">
                            <div className="w-1/2 mr-2">
                                <label className="block text-yellow-400 font-semibold mb-2" htmlFor="name">Team Name</label>
                                <input className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label className="block text-yellow-400 font-semibold mb-2" htmlFor="city">City</label>
                                <input className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={city} value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <div className="flex w-full">
                            <div className="w-1/2 mr-2">
                                <label className="block text-yellow-400 font-semibold mb-2" htmlFor="country">Country</label>
                                <Select
                                    options={options}
                                    value={country}
                                    onChange={changeHandler}
                                    placeholder={JSON.parse(country).label}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label className="block text-yellow-400 font-semibold mb-2" htmlFor="founded_date">Founded Date</label>
                                <input className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" placeholder={foundedDate} value={foundedDate} onChange={(e) => setFoundedDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-yellow-400 font-semibold mb-2" htmlFor="logo_url">Logo URL</label>
                        <input className="border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={logoUrl} value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 mt-3 font-semibold py-2 px-4 rounded-lg" type="submit">Update Team</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateTeamInfo;
