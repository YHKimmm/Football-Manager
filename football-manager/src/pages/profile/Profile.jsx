import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../utilities/cognito";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";

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
        <div className="flex flex-col items-center h-[70vh] p-3 mt-6">
            <h1 className="text-2xl text-gray-500 mb-4 p-3">
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
            <h2 className="text-2xl font-bold mb-2">{updatedUser.fullname}</h2>
            <p className="text-gray-500 text-sm mb-2">Head Coach</p>
            <p className="text-gray-500 text-sm mb-6 text-center">
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
    );
};

export default Profile;