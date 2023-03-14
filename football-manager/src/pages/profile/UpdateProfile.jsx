import React, { useState } from "react";
import Uploader from "../../components/ImageUploadToS3Bucket/ProfilePictureUploader";
import { getAccessToken } from "../../utilities/cognito";

const UpdateProfile = ({ user, handleUpdateUser }) => {
    const [fullname, setFullname] = useState(user.fullname || "");
    const [bio, setBio] = useState(user.bio || "");
    const [profilePicUrl, setProfilePicUrl] = useState(user.profile_picture_url || "");

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessToken();
            const response = await fetch("https://gmwdmyyeri.execute-api.ca-central-1.amazonaws.com/default/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    fullname,
                    bio,
                    profile_picture_url: profilePicUrl.split("?")[0],
                }),
            });
            const data = await response.json();
            console.log("userData", data);
            handleUpdateUser(data);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="flex flex-col items-center h-[70vh] p-7 mt-5">
            <form className="w-full max-w-md" onSubmit={submitHandler}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="full-name">
                            Full Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-100 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="full-name"
                            type="text"
                            placeholder={fullname}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="bio">
                            Bio
                        </label>
                        <textarea className="appearance-none block w-full bg-gray-100 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="bio"
                            rows="5"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2" htmlFor="profile-picture">
                            Profile Picture URL
                        </label>
                        <div>
                            <Uploader setProfilePicUrl={setProfilePicUrl} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="min-w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Update Profile
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
