import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const imageFolderPath = import.meta.env.BASE_URL + "";

const About = () => {
    const [showOwner, setShowOwner] = useState(false);

    return (
        <div className="relative flex flex-col items-center min-h-screen p-4 md:p-10">
            <div className="absolute inset-0 z-[-1] w-full h-full bg-cover bg-center filter"
                style={{ backgroundImage: `url(${imageFolderPath}night.jpg)` }}>
            </div>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-wider text-neutral-300">About Football Manager App</h1>
                <p className="text-lg md:text-xl md:mb-8 mb-4 text-neutral-200">
                    Football manager app is designed for avid football fans who want to manage their own league, team, player, and position. With our app, users can easily create their own team, and manage their player. They can also view major leagues around the world and explore each team and player based on the selected season.
                </p>
                <p className="text-lg md:text-xl md:mb-8 mb-4 text-neutral-200">
                    Football Manager's league, team, and player's infomration are based on the API-FOOTBALL service to provide the latest data on leagues, teams, and players. Our app provides users with a seamless and user-friendly experience that allows them to easily access the information they need to manage their own football league.
                </p>
                <p className="text-lg md:text-xl md:mb-8 mb-4 text-neutral-200">
                    Football manager app is being dedicated to providing our users with the best experience possible. It will be strived to continuously improve our app and add new features to enhance the user experience. Thank you for choosing our football manager app and enjoy!
                </p>

                <div className="flex flex-col items-center justify-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-3 mt-8 text-center tracking-wider text-neutral-200 underline p-2">Meet the Project Owner</h2>
                        <div className="grid grid-cols-1">
                            <div className="w-full md:w-80 text-center my-4">
                                <div className="relative">
                                    <button
                                        className={`${showOwner ? "hover:-translate-y-3" : "hover:translate-y-3"} rounded-lg shadow-xl p-4 h-full cursor-pointer focus:outline-none transition duration-500 ease-in-out transform hover:scale-110`}
                                        onClick={() => setShowOwner(!showOwner)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 animate-bounce ${showOwner ? "text-neutral-300" : "text-amber-400"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {showOwner ? (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                                />
                                            ) : (
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                />
                                            )}
                                        </svg>
                                    </button>
                                    <div className="flex items-center justify-center">
                                        <AnimatePresence>
                                            {showOwner && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="mx-auto my-5 -ml-2 bg-zinc-100 rounded-lg shadow-2xl p-4"
                                                >
                                                    <img
                                                        src={imageFolderPath + "brayden.jpg"}
                                                        alt="Brayden"
                                                        className="w-30 h-40 mx-auto mb-4 rounded-md"
                                                    />
                                                    <h3 className="text-xl font-bold mb-2 text-gray-800 tracking-widest">
                                                        Brayden
                                                    </h3>
                                                    <p className="text-lg text-gray-800 p-2">
                                                        Brayden is a full-stack developer with a passion for building web applications.
                                                        He loves to learn new technologies and is always looking for new ways to improve his skills.
                                                        He loves to play soccer and is a huge fan of the Premier League.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
