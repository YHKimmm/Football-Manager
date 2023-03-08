import React, { useState } from "react";
import { confirmUser } from "../../utilities/cognito";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await confirmUser({ username, code });
            navigate("/sign-in");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <form onSubmit={submitHandler}>
                <div className="flex flex-col items-center justify-center w-80 sm:w-96 cursor-default">
                    <h1 className="text-2xl font-medium tracking-widest">
                        Please check your email for the code and enter your username and code below!
                    </h1>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mt-4 border border-gray-300 rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Code"
                        className="w-full p-2 mt-4 border border-gray-300 rounded-md"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                        className="w-full p-2 mt-4 bg-green-500 text-white rounded-md"
                        type="submit"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div >
    )
};

export default ConfirmEmail;
