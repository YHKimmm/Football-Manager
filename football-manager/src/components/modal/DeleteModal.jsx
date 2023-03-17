import React from "react";

const DeleteModal = ({ showModal, setShowModal, deleteHandler, updatedTeamInfo }) => {
    console.log(updatedTeamInfo)
    return (
        <>
            {showModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full max-w-md mx-auto mt-20">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-xs mx-auto sm:min-w-full">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Delete Team</h2>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-700">
                                    Are you sure you want to delete team {updatedTeamInfo.name}? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-end items-center w-full p-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 mr-4 hover:text-gray-700 tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 tracking-wider hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={deleteHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            )}
        </>
    );
};

export default DeleteModal;
