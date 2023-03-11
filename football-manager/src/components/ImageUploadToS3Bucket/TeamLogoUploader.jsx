import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utilities/cognito";
import Spinner from "../Spinner";

const TeamLogoUploader = ({ setLogoUrl, id }) => {
    const [isLoading, setIsLoading] = useState(false);

    const API_ENDPOINT = "https://4x0amn0nmi.execute-api.ca-central-1.amazonaws.com/default/image";

    const handleChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        console.log("file: ", file);

        try {
            // GET request: presigned URL
            const response = await axios({
                method: "GET",
                url: API_ENDPOINT,
            });
            console.log("Response: ", response);

            // PUT request: upload file to S3
            const result = await fetch(response.data.uploadURL, {
                method: "PUT",
                headers: {
                    ContentType: 'image/*',
                },
                body: file,
            });
            console.log("result: ", result);

            const token = await getAccessToken();

            // Update profile_picture_url in CockroachDB
            const imageUrl = response.data.uploadURL;
            const updateResult = await axios({
                method: "PUT",
                headers: {
                    Authorization: token,
                },
                url: `https://3x0lkvn986.execute-api.ca-central-1.amazonaws.com/default/team/${id}`,
                data: {
                    logo_url: imageUrl.split("?")[0],
                },
            });
            console.log("imageUrl: ", imageUrl.split("?")[0]);
            console.log("Update result: ", updateResult);



            setLogoUrl(imageUrl);

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
                className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 min-w-full"
                onChange={handleChange}
            />
            {isLoading && <Spinner />}
        </div>
    );
};

export default TeamLogoUploader;
