import * as dotenv from 'dotenv';

dotenv.config();

export default {
    port: Number(process.env.PORT),
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database:
        process.env.NODE_ENV === 'dev'
            ? process.env.PG_DATABASE_DEV
            : process.env.PG_DATABASE_TEST,
    db_port: Number(process.env.PG_PORT),
    pepper: process.env.BCRYPT_PASSWORD,
    salt: Number(process.env.SALT_ROUNDS),
    token_secret: String(process.env.JWT_SECRET),
};
