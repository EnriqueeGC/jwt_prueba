import 'dotenv/config'; // Load .env file
import pg from 'pg';

const {Pool} = pg;

const connectionString = process.env.DATABASE_URL // Expongo mi nombre de usuario y contraseña, crear un archivo .env para proteger estos datos

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString 
});

try {
    await db.query('SELECT NOW()');
    console.log('DB connected');
} catch (error) {
    console.log('DB connection failed');
}