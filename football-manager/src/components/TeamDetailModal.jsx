import React from "react";

const TeamDetailModal = ({ setShowModal, team, venue }) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto md:max-w-4xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">{team.name}</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto text-center grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col items-center">
                                <img
                                    src={venue.image}
                                    alt=""
                                    className="w-64 h-44 object-cover mb-5 sm:w-80 sm:h-80"
                                />
                                <p className="my-1 text-slate-500 text-base md:text-lg leading-relaxed">
                                    <span className="font-bold">Founded In </span> {team.founded}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                    Venue: {venue.name}
                                </p>
                                <p className="mt-1 text-slate-500 text-sm md:text-base leading-relaxed">
                                    City: {venue.city}
                                </p>
                                <p className="mt-1 text-slate-500 text-sm md:text-base leading-relaxed">
                                    Address: {venue.address}
                                </p>
                                <p className="mt-1 text-slate-500 text-sm md:text-base leading-relaxed">
                                    Capacity: <span className="font-bold">{venue.capacity}</span>
                                </p>
                                <p className="mt-1 text-slate-500 text-sm md:text-base leading-relaxed">
                                    Surface: {venue.surface}
                                </p>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default TeamDetailModal;
