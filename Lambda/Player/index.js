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
        await pool.query(playerQuery);


        const response = {
            statusCode: 201,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message: 'ok' }),
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
            return await getPlayers(event);
        default:
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            }
    }
};