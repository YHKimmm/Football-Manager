import pg from 'pg'
const { Pool } = pg

let pool

const createTeam = async (event) => {
    const newTEAM = JSON.parse(event.body);
    console.log(newTEAM);
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const res = await pool.query(`
        SELECT * FROM coaches WHERE user_uuid = $1
    `, [userId])

    try {
        await pool.query('BEGIN');

        const teamQuery = {
            text:
                'INSERT INTO teams (user_uuid, coach_id, founded_date, city, country, name, logo_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [
                userId,
                res.rows[0].id,
                newTEAM.founded_date,
                newTEAM.city,
                newTEAM.country,
                newTEAM.name,
                newTEAM.logo_url,
            ],
        };
        const teamResult = await pool.query(teamQuery);


        const playerQuery = {
            text: 'INSERT INTO players (user_uuid, team_id, name, position, height, weight, age) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [
                userId,
                teamResult.rows[0].id,
                newTEAM.player.name,
                newTEAM.player.position,
                newTEAM.player.height,
                newTEAM.player.weight,
                newTEAM.player.age,
            ],
        };
        await pool.query(playerQuery);

        await pool.query('COMMIT');

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
            body: JSON.stringify({ message: 'Something went wrong' }),
        };
        return response;
    }
};

const getTeamInfo = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    console.log('userid', userId);
    const teamRes = await pool.query(`
        SELECT * FROM teams WHERE user_uuid = $1
    `, [userId]);
    console.log(teamRes.rows[0]);

    let coachRes;
    if (teamRes.rows.length > 0) {
        const coachId = teamRes.rows[0].coach_id;
        coachRes = await pool.query(`
            SELECT * FROM coaches WHERE id = $1
        `, [coachId]);
    } else {
        coachRes = await pool.query(`
            SELECT * FROM coaches WHERE user_uuid = $1
        `, [userId]);
    }

    console.log(coachRes.rows[0]);

    const response = {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            team: teamRes.rows,
            coach: coachRes.rows[0],
        }),
    };
    return response;
};



const getSingleTeamInfo = async (event) => {
    let id = event?.pathParameters?.id
    console.log('teamid from method:', id);
    const teamRes = await pool.query(`
        SELECT * FROM teams WHERE id = $1
    `, [id]);
    console.log(teamRes.rows[0]);

    const coachId = teamRes.rows[0].coach_id;
    const coachRes = await pool.query(`
        SELECT * FROM coaches WHERE id = $1
    `, [coachId]);

    const response = {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            team: teamRes.rows[0],
            coach: coachRes.rows[0],
        }),
    };
    return response;
};

const updateTeamInfo = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const teamInfo = JSON.parse(event.body);
    console.log(teamInfo);

    const res = await pool.query(`
        SELECT * FROM coaches WHERE user_uuid = $1
    `, [userId])

    try {

        const teamQuery = {
            text:
                'UPDATE teams SET founded_date = $1, city = $2, country = $3, name = $4, logo_url = $5, coach_id = $6 WHERE user_uuid = $7',
            values: [
                teamInfo.founded_date,
                teamInfo.city,
                teamInfo.country,
                teamInfo.name,
                teamInfo.logo_url,
                res.rows[0].id,
                userId,
            ],
        };
        await pool.query(teamQuery);

        const response = {
            statusCode: 200,
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
            body: JSON.stringify({ message: 'Something went wrong' }),
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

    let id = event?.pathParameters?.id
    console.log('team id from handler: ', id);

    console.log(event.requestContext.http.method)
    switch (event.requestContext.http.method) {
        case 'POST':
            return await createTeam(event);
        case 'GET':
            if (id) {
                id = Number(id);
                return await getSingleTeamInfo(event);
            }
            return await getTeamInfo(event);
        case 'PUT':
            return await updateTeamInfo(event);
        default:
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            }
    }
};