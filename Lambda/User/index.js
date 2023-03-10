import pg from 'pg'

const { Pool } = pg

let pool

const userRegister = async (event) => {
    const newUser = JSON.parse(event.body);
    console.log(newUser);

    try {
        await pool.query('BEGIN');

        const userQuery = {
            text:
                'INSERT INTO users (user_uuid, fullname, email) VALUES ($1, $2, $3) RETURNING id',
            values: [
                newUser.user_uuid,
                newUser?.fullname,
                newUser.email,
            ],
        };
        const userResult = await pool.query(userQuery);

        const coachQuery = {
            text: 'INSERT INTO coaches (user_uuid, user_id, fullname, bio, profile_picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: [
                newUser.user_uuid,
                userResult.rows[0].id,
                newUser?.fullname,
                newUser?.bio,
                newUser?.profile_picture_url,
            ],
        };
        await pool.query(coachQuery);

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
        await pool.query('ROLLBACK');
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
}

const getCoachInfo = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    console.log('userid', userId);
    const res = await pool.query(`
        SELECT * FROM coaches WHERE user_uuid = $1
    `, [userId]);
    console.log(res.rows[0]);


    const response = {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(res.rows[0]),
    };
    return response;
}

const updateCoachInfo = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const coachInfo = JSON.parse(event.body);
    console.log('coachInfo', coachInfo);

    try {
        await pool.query('BEGIN');

        // Retrieve the user_id of the current user from the users table
        const userQuery = {
            text: 'SELECT id FROM users WHERE user_uuid = $1',
            values: [userId],
        };
        const userResult = await pool.query(userQuery);
        const userIdFromUsers = userResult.rows[0].id;

        const userQueryUpdate = {
            text: 'UPDATE users SET fullname = $1 WHERE user_uuid = $2 RETURNING id',
            values: [
                coachInfo.fullname,
                userId,
            ],
        };
        await pool.query(userQueryUpdate);

        const coachQuery = {
            text:
                'UPDATE coaches SET fullname = $1, bio = $2, profile_picture_url = $3, user_id = $4 WHERE user_uuid = $5 RETURNING id',
            values: [
                coachInfo.fullname,
                coachInfo.bio,
                coachInfo.profile_picture_url,
                userIdFromUsers, // Use the user_id from the users table
                userId,
            ],
        };
        const coachResult = await pool.query(coachQuery);

        await pool.query('COMMIT');

        const response = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(coachResult.rows[0]),
        };

        return response;
    } catch (err) {
        await pool.query('ROLLBACK');
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
    console.log('Request Event: ', event)

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
        case 'GET':
            return await getCoachInfo(event);
        case 'POST':
            return await userRegister(event);
        case 'PUT':
            return await updateCoachInfo(event);
        default:
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            }
    }
};