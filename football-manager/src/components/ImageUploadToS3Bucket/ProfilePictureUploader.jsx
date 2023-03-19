import React, { useState } from "react";
import { getAccessToken } from "../../utilities/cognito";
import Spinner from "../Spinner";

const ProfilePictureUploader = ({ setProfilePicUrl }) => {
    const [isLoading, setIsLoading] = useState(false);

    const API_ENDPOINT = "https://4x0amn0nmi.execute-api.ca-central-1.amazonaws.com/default/image";

    const handleChange = async (e) => {
        setIsLoading(true);

        const file = e.target.files[0];
        console.log("file: ", file);

        try {
            // GET request: presigned URL
            const response = await fetch(API_ENDPOINT);
            const responseData = await response.json();
            console.log("Response: ", responseData);

            // PUT request: upload file to S3
            const result = await fetch(responseData.uploadURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'image/*',
                },
                body: file,
            });
            console.log("result: ", result);

            const token = await getAccessToken();

            // Update profile_picture_url in CockroachDB
            const imageUrl = responseData.uploadURL;
            const updateResult = await fetch(`https://gmwdmyyeri.execute-api.ca-central-1.amazonaws.com/default/user`, {
                method: "PUT",
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profile_picture_url: imageUrl.split("?")[0],
                }),
            });
            const updateData = await updateResult.json();
            console.log("imageUrl: ", imageUrl.split("?")[0]);
            console.log("Update result: ", updateData);

            // Update profile_pic_url in state
            setProfilePicUrl(imageUrl);

            setIsLoading(false);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700"
                onChange={handleChange}
            />
            {isLoading && <Spinner />}
        </div>
    );
};

export default ProfilePictureUploader;
