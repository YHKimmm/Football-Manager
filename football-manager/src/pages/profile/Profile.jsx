import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../utilities/cognito";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";

const imageFolderPath = import.meta.env.BASE_URL + "";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const fetchUserData = async () => {
        try {
            const token = await getAccessToken();
            const response = await fetch("https://gmwdmyyeri.execute-api.ca-central-1.amazonaws.com/default/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            console.log("data", data);
            console.log("userData", data);
            setUser(data);
            setUpdatedUser(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateUser = (updatedUserInfo) => {
        setUpdatedUser(updatedUserInfo);
        fetchUserData();
    };

    useEffect(() => {
        handleUpdateUser(updatedUser);
    }, []);

    if (!user) {
        return <div className="text-center flex flex-col items-center min-h-[70vh] mt-10 text-3xl font-bold">Loading...</div>
    }

    return (
        <div className="relative flex flex-col items-center min-h-screen">
            <div className="absolute inset-0 z-[-1] w-full h-full bg-cover bg-center filter"
                style={{ backgroundImage: `url(${imageFolderPath}football.jpg)` }}></div>
            <div className="flex flex-col items-center justify-center h-full p-3">
                <h1 className="text-2xl text-neutral-100 mb-4 p-3 tracking-widest">
                    Manage your team, players, and stats as a head coach.
                </h1>
                <Link to="/locker-room" className="mb-4">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600">
                        Go Locker Room
                    </button>
                </Link>
                <img
                    className="w-32 h-32 rounded-full object-cover mb-4"
                    src={updatedUser.profile_picture_url}
                    alt="Profile Picture"
                />
                <h2 className={`${isEditable ? 'text-gray-200' : 'text-emerald-300'} text-2xl font-extrabold mb-2`}>{updatedUser.fullname}</h2>
                <p className={`${isEditable ? 'text-gray-300 ' : 'text-emerald-700'} text-base font-semibold mb-2`}>Head Coach</p>
                <p className={`${isEditable ? 'text-gray-300' : 'text-emerald-800'} text-base mb-6 text-center`}>
                    {updatedUser.bio}
                </p>
                <button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsEditable(!isEditable)}
                >
                    Edit Profile
                </button>
                {isEditable && <UpdateProfile user={user} handleUpdateUser={handleUpdateUser} />}
            </div>
        </div>
    );
};

export default Profile;