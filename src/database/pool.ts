import { Pool } from 'pg';
import config from '../config/config';

const pool = new Pool({
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.db_port,
    host: config.host,
});

// add listener to the error
pool.on('error', (error: Error) => {
    console.error(error.message);
});

export default pool;
