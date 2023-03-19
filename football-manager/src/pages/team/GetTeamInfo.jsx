import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utilities/cognito';
import UpdateTeamInfo from './UpdateTeamInfo';
import DeleteModal from '../../components/modal/DeleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCaptain } from '../../reducer/captainSlice';

const imageFolderPath = import.meta.env.BASE_URL + "";

function GetTeamInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const captain = useSelector((state) => state.captain.captains[id]);
    console.log('captain', captain);

    const [teamInfo, setTeamInfo] = useState({});
    const [updatedTeamInfo, setUpdatedTeamInfo] = useState({});
    const [coachInfo, setCoachInfo] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        if (data.team === "") {
            setTeamInfo({ ...data.team });
        } else {
            setTeamInfo({ ...data.team, logo_url: data.team.logo_url.split("?")[0] });
        }
        setCoachInfo(data.coach);
        setUpdatedTeamInfo(data.team);
    }


    const handleUpdateUser = (updatedTeamInfo) => {
        setUpdatedTeamInfo(updatedTeamInfo);
        fetchTeamInfo();
    };

    const deleteHandler = async () => {
        const token = await getAccessToken();
        const response = await fetch(
            `https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
        const data = await response.json();
        console.log('data', data);
        navigate('/locker-room');
        dispatch(deleteCaptain(id))

        setShowModal(false);
    };

    useEffect(() => {
        handleUpdateUser(updatedTeamInfo);
    }, []);

    return (
        <div className='md:flex md:m-auto md:justify-center md:bg-gray-500 md:min-h-[80vh]'>
            <div className="bg-gray-700 max-w-screen-2xl mx-auto p-5 md:flex md:flex-col md:justify-center">
                <a onClick={() => navigate(-1)} className="text-yellow-400 hover:text-yellow-500 cursor-pointer">
                    ← Back
                </a>
                <div className="p-5">
                    <h1 className="text-2xl font-semibold text-yellow-400 mb-4">{updatedTeamInfo.name}'s Team Information</h1>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4 mr-1">Head Coach: <span className='text-gray-200 font-light'>{coachInfo?.fullname}</span></h4>
                    {captain && teamInfo.id == id ? (
                        <h4 className="text-lg font-semibold text-yellow-400 mb-4 mr-1">Captain: <span className='text-gray-200 font-light'>{captain.name}</span></h4>
                    ) : (
                        <h4 className="text-lg font-semibold text-yellow-400 mb-4 mr-1">Captain: <span className='text-gray-200 font-light'>No Captain Assigned</span></h4>
                    )}
                    <div className="bg-gray-600 rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-2">
                            {updatedTeamInfo.logo_url === "" ? (
                                <div className='flex flex-col items-center mr-3'>
                                    <span className="font-light mr-3 mb-3 text-yellow-400">No Logo Available</span>
                                    <div className='font-light text-yellow-400 underline'>
                                        Click Pencil Icon To Add Logo
                                    </div>
                                </div>
                            ) : (
                                <img className="w-28 h-28 object-contain rounded-lg" src={updatedTeamInfo.logo_url} alt="" />
                            )}
                            <div className='ml-4'>
                                <p className="mr-4">
                                    <span className="font-semibold text-yellow-400 mr-1">City:</span> <span className='text-gray-200'>{updatedTeamInfo.city}</span>
                                </p>
                                <p className="mr-4">
                                    <span className="font-semibold text-yellow-400 mr-1">Country:</span> <span className='text-gray-200'>{updatedTeamInfo.country ? JSON.parse(updatedTeamInfo.country).label : ""}</span>
                                </p>
                                <p className="mr-4">
                                    <span className="font-semibold text-yellow-400 mr-1">Founded Date:</span> <span className='text-gray-200'> {updatedTeamInfo.founded_date}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className=" text-yellow-400 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 font-semibold py-2 px-8 rounded-lg"
                        onClick={() => setIsEditable(!isEditable)}
                    >
                        {isEditable ? (
                            <span className='material-symbols-outlined'>
                                close
                            </span>
                        ) : (
                            <span className='material-symbols-outlined'>
                                edit
                            </span>)}
                    </button>
                    <button
                        className=" text-red-400 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 font-semibold py-2 px-8 rounded-lg"
                        onClick={() => setShowModal(true)}
                    >
                        <span className='material-symbols-outlined'>
                            delete
                        </span>
                    </button>
                    {showModal && <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteHandler={deleteHandler} updatedTeamInfo={updatedTeamInfo} />}
                </div>
                <hr className='my-7' />
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-gray-200 tracking-widest text-center'>
                        Create your own player and manage them for your team!
                    </p>
                    <button
                        onClick={() => navigate(`/team/${id}/create-player`)}
                        className="m-auto w-40 my-5 text-base tracking-wider bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-bold px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                        Manage Player
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
                                <p className='text-base w-1/2 mt-4 font-semibold text-yellow-400 mb-2 md:text-lg'>
                                    Fun Fact: <span className='font-light'>Zlatan Ibrahimovic is the only player to have won the UEFA Champions League with three different clubs.</span>
                                </p>
                            </div>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={`${imageFolderPath}neymar.png`}
                                    alt='Neymar Jr'
                                    className='w-1/4 h-1/3 object-contain rounded-lg mr-8'
                                />
                                <p className='text-base w-1/2 font-semibold text-yellow-400 mb-2 md:text-lg'>
                                    Fun Fact: <span className='font-light'>Neymar Jr is the only player to have scored a hat-trick in the UEFA Champions League final.</span>
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