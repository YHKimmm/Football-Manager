import pg from 'pg'
const { Pool } = pg

let pool

// schema for players table
// CREATE TABLE IF NOT EXISTS players(
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_uuid UUID,
//     name STRING,
//     position STRING,
//     height STRING,
//     weight STRING,
//     age STRING,
//     team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE
// );

const createPlayer = async (event) => {
    const newPlayer = JSON.parse(event.body);
    console.log('new player', newPlayer);
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    let teamId = event?.pathParameters?.id;
    console.log('teamId', teamId);

    try {
        const playerQuery = {
            text: 'INSERT INTO players (user_uuid, team_id, name, position, height, weight, age) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [
                userId,
                teamId,
                newPlayer.name,
                newPlayer.position,
                newPlayer.height,
                newPlayer.weight,
                newPlayer.age,
            ],
        };
        console.log('create player-playerQuery', playerQuery);
        const result = await pool.query(playerQuery);
        const playerId = result.rows[0].id;
        console.log('playerId', playerId);
        const response = {
            statusCode: 201,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id: playerId,
                user_uuid: userId,
                team_id: teamId,
                name: newPlayer.name,
                position: newPlayer.position,
                height: newPlayer.height,
                weight: newPlayer.weight,
                age: newPlayer.age,
            }),
        };

        return response;

    } catch (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'error' }),
        };

        return response;
    }
};

const getPlayers = async (event) => {
    let teamId = event?.pathParameters?.id;
    console.log('teamId', teamId);

    try {
        const playerQuery = {
            text: 'SELECT * FROM players WHERE team_id = $1',
            values: [teamId],
        };

        //return json array of players
        const { rows } = await pool.query(playerQuery);
        console.log('rows', rows);

        const response = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(rows),
        };

        return response;

    } catch (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'error' }),
        };

        return response;
    }
};

const getPlayer = async (event) => {
    const playerId = event?.pathParameters?.id;
    console.log('playerId', playerId);

    try {
        const playerQuery = {
            text: 'SELECT * FROM players WHERE id = $1',
            values: [playerId],
        };

        //return json array of players
        const { rows } = await pool.query(playerQuery);
        console.log('rows from get player', rows);

        const response = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(rows),
        };

        return response;

    } catch (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'error' }),
        };

        return response;
    }
};

const updatePlayer = async (event) => {
    const updatedPlayer = JSON.parse(event.body);
    console.log('updated player', updatedPlayer);
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    const id = event?.pathParameters?.id;
    console.log('playerId changed', id);

    const playerQuery = {
        text: 'SELECT * FROM players WHERE id = $1',
        values: [id],
    };
    const { rows } = await pool.query(playerQuery);

    const teamId = rows[0].team_id;
    console.log('teamId', teamId);
    try {
        const playerQuery = {
            text: 'UPDATE players SET name = $1, position = $2, height = $3, weight = $4, age = $5, user_uuid = $6, team_id = $7 WHERE id = $8',
            values: [
                updatedPlayer.name,
                updatedPlayer.position,
                updatedPlayer.height,
                updatedPlayer.weight,
                updatedPlayer.age,
                userId,
                teamId,
                id,
            ],
        };
        await pool.query(playerQuery);

        const response = {
            statusCode: 201,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: updatedPlayer.name,
                position: updatedPlayer.position,
                height: updatedPlayer.height,
                weight: updatedPlayer.weight,
                age: updatedPlayer.age,
                user_uuid: userId,
                team_id: teamId,
                id: id,
            }),
        };
        console.log('response', response)

        return response;

    } catch (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'error' }),
        };

        return response;
    }
};

const deletePlayer = async (event) => {
    const playerId = event?.pathParameters?.id;
    console.log('playerId', playerId);

    try {
        const playerQuery = {
            text: 'DELETE FROM players WHERE id = $1',
            values: [playerId],
        };

        await pool.query(playerQuery);

        const response = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ player: { id: playerId } }),
        };

        return response;

    } catch (err) {
        console.log(err);
        const response = {
            statusCode: 500,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'error' }),
        };

        return response;
    }
};


export const handler = async (event) => {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        pool = new Pool({
            connectionString,
            application_name: "",
            max: 1,
        });
    }

    console.log(event.requestContext.http.method)
    switch (event.requestContext.http.method) {
        case 'POST':
            return await createPlayer(event);
        case 'GET':
            if (event?.pathParameters?.playerId) {
                return await getPlayer(event);
            }
            return await getPlayers(event);
        case 'PUT':
            return await updatePlayer(event);
        case 'DELETE':
            return await deletePlayer(event);
        default:
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            }
    }
};