import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAccessToken } from '../../utilities/cognito';
import UpdateTeamInfo from './UpdateTeamInfo';

const imageFolderPath = import.meta.env.BASE_URL + "";

function GetTeamInfo() {
    const [teamInfo, setTeamInfo] = useState({});
    const [updatedTeamInfo, setUpdatedTeamInfo] = useState({});
    const [coachInfo, setCoachInfo] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const { id } = useParams();

    async function fetchTeamInfo() {
        const token = await getAccessToken();
        const response = await fetch(
            `https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
        const data = await response.json();
        console.log('data', data);
        setTeamInfo(data.team);
        setCoachInfo(data.coach);
        setUpdatedTeamInfo(data.team);
    }


    const handleUpdateUser = (updatedTeamInfo) => {
        setUpdatedTeamInfo(updatedTeamInfo);
        fetchTeamInfo();
    };

    useEffect(() => {
        handleUpdateUser(updatedTeamInfo);
    }, []);

    return (
        <div className='md:flex md:m-auto md:justify-center md:bg-gray-500 md:min-h-[80vh]'>
            <div className="bg-gray-700 max-w-screen-2xl mx-auto p-10 md:flex md:flex-col md:justify-center">
                <div className="p-8">
                    <h1 className="text-2xl font-semibold text-yellow-400 mb-4">{updatedTeamInfo.name}'s Team Information</h1>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Head Coach: {coachInfo?.fullname}</h4>
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            <img className="w-24 h-24 object-contain rounded-lg mr-4" src={updatedTeamInfo.logo_url} alt="" />
                            <div>
                                <p className="text-base font-semibold text-yellow-400 mb-2">City: {updatedTeamInfo.city}</p>
                                <p className="text-base font-semibold text-yellow-400 mb-2">Country: {updatedTeamInfo.country ? JSON.parse(updatedTeamInfo.country).label : ""}</p>
                                <p className="text-base font-semibold text-yellow-400">Founded Date: {updatedTeamInfo.founded_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-yellow-400 text-gray-700 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-yellow-500"
                        onClick={() => setIsEditable(!isEditable)}
                    >
                        Edit Team Info
                    </button>
                </div>
            </div>
            <div className='md:flex md:items-center bg-gray-700 max-w-xl mx-auto'>
                {isEditable && <UpdateTeamInfo teamInfo={teamInfo} handleUpdateUser={handleUpdateUser} />}
                {!isEditable && (
                    <div>
                        <div className='flex flex-col items-center'>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={`${imageFolderPath}zlatan.png`}
                                    alt='Zlatan Ibrahimovic'
                                    className='w-1/4 h-1/3 object-contain rounded-lg mr-8'
                                />
                                <p className='text-base w-1/2 mt-2 font-semibold text-yellow-400 mb-2 md:text-lg'>
                                    Fun Fact: Zlatan Ibrahimovic is the only player to have won the UEFA Champions League with three different clubs.
                                </p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={`${imageFolderPath}neymar.png`}
                                    alt='Neymar Jr'
                                    className='w-1/4 h-1/3 object-contain rounded-lg mr-8'
                                />
                                <p className='text-base w-1/2 font-semibold text-yellow-400 mb-2 md:text-lg'>
                                    Fun Fact: Neymar Jr's full name is Neymar da Silva Santos Júnior, and he is the third highest goal scorer for the Brazilian national team.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetTeamInfo;