import { useState, useEffect } from 'react';
import { getAccessToken } from '../../utilities/cognito';
import { useParams } from 'react-router-dom';
import MyPlayerList from '../../components/MyPlayerList';
import { playerPositionOptions } from '../../utilities/playerPosition';

const CreatePlayer = () => {
    const { id } = useParams();

    const [newPlayer, setNewPlayer] = useState({
        name: '',
        position: '',
        height: '',
        weight: '',
        age: '',
    });
    const [players, setPlayers] = useState([]);

    // [name]: value creates a new object with a property whose name is the value of name variable and whose value is the value of the value variable. This new object is merged with the existing state using the spread operator and then set as the new state using setNewPlayer function.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer((prevState) => ({
            ...prevState,
            //creates a new object with a key-value pair
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPlayers([...players, newPlayer]);
        try {
            const token = await getAccessToken();
            const response = await fetch(`https://00ve5ej1fg.execute-api.ca-central-1.amazonaws.com/default/player/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(newPlayer),
                })
            const data = await response.json();
            console.log('data: ', data);
            setNewPlayer({
                name: '',
                position: '',
                height: '',
                weight: '',
                age: '',
            });
            console.log('new players: ', newPlayer);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const token = await getAccessToken();
                const response = await fetch(`https://00ve5ej1fg.execute-api.ca-central-1.amazonaws.com/default/player/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                });
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error(error);
            }
        };
        getPlayers();
    }, [id]);

    useEffect(() => {
        console.log('players: ', players);
    }, [players]);

    return (
        <div className="md:flex md:m-auto bg-gray-500 md:min-h-[80vh]">
            <div className="bg-gray-700 md:w-2/5 p-5 md:flex md:flex-col">
                <form onSubmit={handleSubmit} className="p-5 w-full">
                    <h2 className="text-lg font-semibold text-yellow-400 mb-4">⛹️‍♀️Add New Player⛹️‍♀️</h2>
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
                        <select
                            id="position"
                            name="position"
                            value={newPlayer.position}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        >
                            <option value="">Select a position</option>
                            {playerPositionOptions().map((position) => (
                                <option key={position.value} value={position.value}>
                                    {position.label}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="height" className="mb-2 text-yellow-400 font-semibold">
                            height
                        </label>
                        <input
                            type="text"
                            id="height"
                            name="height"
                            value={newPlayer.height}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="weight" className="mb-2 text-yellow-400 font-semibold">
                            Weight
                        </label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={newPlayer.weight}
                            onChange={handleInputChange}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="age" className="mb-2 text-yellow-400 font-semibold">
                            Age
                        </label>
                        <input
                            type="text"
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
                <div className={`${players.length > 0 ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'block'}`}>
                    {players.length > 0 ? (
                        players.map((player, idx) => (
                            <div key={idx}>
                                <MyPlayerList player={player} />
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
