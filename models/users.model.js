import {db} from '../database/connection.database.js'; // cada que haga una importación de un archivo de javascript, debo de poner la extensión .js

const create = async ({ email, password, username }) => { // parametrisar las consultas de sql
    const query = {
        text:`
            INSERT INTO users (email, password, username)
            VALUES ($1, $2, $3)
            RETURNING email, username, uid
            `,
        values: [email, password, username]
        };

    const {rows} = await db.query(query);
    return rows[0];
};

const findOneByEmail = async (email) => {
    const query = {
        text:`
            SELECT * FROM users
            WHERE email = $1
            `,
        values: [email]
    };

    const {rows} = await db.query(query);
    return rows[0];
};

export const UserModel = {
    create,
    findOneByEmail
};