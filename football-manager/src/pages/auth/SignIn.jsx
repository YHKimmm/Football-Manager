import React, { useState } from "react";
import { signIn } from "../../utilities/cognito";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/authSlice";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userSignIn = await signIn({ username, password });
            console.log(userSignIn);
            dispatch(login({ username: username, token: userSignIn.accessToken.jwtToken }));
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error);
        }
    };

    return (
        <div className="relative flex flex-col rounded-xl mx-auto mt-10 items-center justify-center bg-transparent bg-clip-border text-gray-700 shadow-none">
            <h4 className="block text-3xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Sign In
            </h4>
            <form className="mt-8 mb-2 w-80 max-w-screen-2xl sm:w-96" onSubmit={submitHandler}>
                <div className="mb-4 flex flex-col gap-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Username
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type="password"
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                    </div>
                </div>
                <button
                    className="mt-6 block w-full tracking-widest select-none rounded-lg bg-green-500 py-3 px-6 md:p-2 md:text-base text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                >
                    LogIn
                </button>
            </form>
            {errorMessage && (
                <div className="my-4 text-center text-red-500">{errorMessage}</div>
            )}
            <p className="mt-4 block md:text-lg text-center text-base font-normal leading-relaxed text-gray-700 antialiased">
                Don't have an account?
                <Link
                    className="ml-1 font-medium text-emerald-500 transition-colors hover:text-emerald-700"
                    to='/sign-up'
                >
                    Register
                </Link>
            </p>
            <p className="mt-4 block md:text-lg text-center text-base font-normal leading-relaxed text-gray-700 antialiased">
                Forgot password?
                <Link
                    className="ml-1 font-medium text-emerald-500 transition-colors hover:text-emerald-700"
                    to='/forgot-password'
                >
                    Forgot Password
                </Link>
            </p>
        </div>
    )
};

export default SignIn;
