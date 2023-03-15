import React from 'react';
import { Link } from 'react-router-dom';

const imageFolderPath = import.meta.env.BASE_URL + "";

function Home() {
    // Get a random football image from Unsplash
    const randomImage = 'https://source.unsplash.com/featured/?football,soccer';

    return (
        <div className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${randomImage})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0">
                <div className="container mx-auto px-6 flex items-center justify-center h-full">
                    <div className="text-center">
                        <img className="h-32 mx-auto mb-6" src={`${imageFolderPath}logo.png`} alt="Football Manager Logo" />
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-5">Manage Your Own Football Team</h1>
                        <div className='flex justify-center items-center'>
                            <Link
                                to='/locker-room'
                                className="text-white text-lg px-5 flex justify-center items-center mt-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            >
                                <span className="mr-2">Go to locker room</span>
                                <span className="animate-bounce">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                to='/league'
                                className="text-white text-lg px-5 flex justify-center items-center mt-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            >
                                <span className="mr-2">Explore Leagues</span>
                                <span className="animate-bounce">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-8">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-72 sm:h-56 w-full object-cover md:w-56" src="https://source.unsplash.com/featured/?soccer" alt="League logo" />
                            </div>
                            <div className="p-8 hidden sm:block">
                                <div className="uppercase tracking-wide text-xl text-indigo-500 font-semibold">Explore Leagues, Teams, and Players!</div>
                                <p href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Get your own profile!</p>
                                <p className="mt-2 text-gray-500 text-lg">Be a coach and create your own teams and players as own your peronal taste!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;