import { useState, useEffect } from 'react';
import { getAccessToken } from '../../utilities/cognito';
import { useParams, useNavigate } from 'react-router-dom';
import MyPlayerList from '../../components/MyPlayerList';
import { playerPositionOptions } from '../../utilities/playerPosition';

const imageFolderPath = import.meta.env.BASE_URL + "";

const CreatePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');

    const [players, setPlayers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessToken();
            const response = await fetch(`https://00ve5ej1fg.execute-api.ca-central-1.amazonaws.com/default/player/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        name: name,
                        position: position,
                        height: height,
                        weight: weight,
                        age: age,
                    }),
                })
            const data = await response.json();
            setPlayers([...players, { id: data.id, team_id: data.team_id, user_uuid: data.user_uuid, name, position, height, weight, age }]);
            console.log('data: ', data);
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
    }, []);

    return (
        <div className="md:flex md:m-auto bg-gray-500 md:min-h-[80vh]">
            <div className="bg-gray-700 md:w-2/5 p-5 md:flex md:flex-col">
                <a onClick={() => navigate(-1)} className="text-yellow-400 hover:text-yellow-500 cursor-pointer">
                    ← Back
                </a>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="min-w-min px-3 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                            required
                        >
                            <option value="">Select a position</option>
                            {playerPositionOptions().map((position) => (
                                <option key={position.value} value={position.value}>
                                    {position.value}
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
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
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
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
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
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
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

            <div className="p-5 w-full relative min-h-[80vh] md:min-h-0">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center filter opacity-80"
                    style={{ backgroundImage: `url(${imageFolderPath}field.jpg)` }}>
                </div>
                <div className={`${players.length > 0 ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'block'}`}>
                    {players.length > 0 ? (
                        players.map((player) => (
                            <div key={player.id} className="relative">
                                <MyPlayerList player={player} setPlayers={setPlayers} players={players} />
                            </div>
                        ))
                    ) : (
                        <>
                            <p className="text-center text-yellow-100 font-semibold tracking-widest uppercase absolute inset-7 flex justify-center items-center md:text-xl">
                                No players added yet...
                            </p>
                            <p className="text-center text-yellow-100 font-semibold tracking-widest absolute inset-y-20 inset-x-1 md:inset-x-16 text-lg md:text-xl flex justify-center">
                                Add your own new players and click the player name to set as captain for your team!
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;
