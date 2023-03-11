import { useState } from 'react';
import { getAccessToken } from '../../utilities/cognito';

const CreatePlayer = () => {
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        position: '',
        height: '',
        weight: '',
        age: '',
    });
    const [players, setPlayers] = useState([]);

    const handleInputChange = (e) => {
        setNewPlayer({
            ...newPlayer,
            [e.target.name]: e.target.value,
            [e.target.position]: e.target.value,
            [e.target.height]: e.target.value,
            [e.target.weight]: e.target.value,
            [e.target.age]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPlayers([...players, newPlayer]);
        setNewPlayer({
            name: '',
            position: '',
            height: '',
            weight: '',
            age: '',
        });
        try {
            const token = await getAccessToken();
            const response = await fetch(` https://4wrdmzjrtb.execute-api.ca-central-1.amazonaws.com/default/player/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(newPlayer),
                }),
            const data = await response.json();
            console.log('data: ', data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="md:flex md:m-auto bg-gray-500 md:min-h-[80vh]">
            <div className="bg-gray-700 md:w-2/5 p-5 md:flex md:flex-col">
                <form onSubmit={handleSubmit} className="p-5 w-full">
                    <h2 className="text-lg font-semibold text-yellow-400 mb-4">Add New Player</h2>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="mb-2 text-yellow-400 font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newPlayer.name}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="position" className="mb-2 text-yellow-400 font-semibold">
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={newPlayer.position}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="number" className="mb-2 text-yellow-400 font-semibold">
                            height
                        </label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={newPlayer.height}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="nationality" className="mb-2 text-yellow-400 font-semibold">
                            Weight
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={newPlayer.weight}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="nationality" className="mb-2 text-yellow-400 font-semibold">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={newPlayer.age}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="m-auto w-40 my-5 tracking-widest bg-yellow-500 text-sm rounded-lg hover:bg-yellow-600 font-bold px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                        Add New Player
                    </button>
                </form>
            </div>
            <div className="p-5 w-full">
                <h2 className="text-lg font-semibold text-yellow-400 mb-4 text-center">Players</h2>
                <div className="flex flex-col">
                    {players.length > 0 ? (
                        players.map((player, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row md:justify-between md:items-center mb-4"
                            >
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <span className="text-yellow-400 font-semibold">Name:</span>
                                    <span>{player.name}</span>
                                </div>
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <span className="text-yellow-400 font-semibold">Position:</span>
                                    <span>{player.position}</span>
                                </div>
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <span className="text-yellow-400 font-semibold">Number:</span>
                                    <span>{player.number}</span>
                                </div>
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <span className="text-yellow-400 font-semibold">Weight:</span>
                                    <span>{player.weight}</span>
                                </div>
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <span className="text-yellow-400 font-semibold">Age:</span>
                                    <span>{player.age}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-yellow-400 font-semibold tracking-widest uppercase">
                            No players added yet...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;
