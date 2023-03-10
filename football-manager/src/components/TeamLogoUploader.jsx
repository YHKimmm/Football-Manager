import React from "react";
import axios from "axios";
import { getAccessToken } from "../utilities/cognito";

const TeamLogoUploader = ({ setLogoUrl }) => {
    const API_ENDPOINT = "https://4x0amn0nmi.execute-api.ca-central-1.amazonaws.com/default/image";

    const handleChange = async (e) => {
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
                    "Content-Type": "image/png",
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
                url: `https://gmwdmyyeri.execute-api.ca-central-1.amazonaws.com/default/user`,
                data: {
                    logo_url: imageUrl.split("?")[0],
                },
            });
            console.log("imageUrl: ", imageUrl.split("?")[0]);
            console.log("Update result: ", updateResult);

            // Update profile_pic_url in state
            setLogoUrl(imageUrl);


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleChange} />
        </>
    );
};

export default TeamLogoUploader;
