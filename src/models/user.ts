import db from '../database/pool';
import User from '../types/user';
import config from '../config/config';
import bcrypt from 'bcrypt';

// function to hash the password
const hash = (password: string): string => {
    return bcrypt.hashSync(password + config.pepper, config.salt);
};
class UserModel {
    // create user
    async create(user: User): Promise<User> {
        try {
            // connect to the database
            const connection = await db.connect();
            // add new user query
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const result = await connection.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hash(user.password),
            ]);
            const created_user = result.rows[0];
            // release the database
            connection.release();
            // return the created user
            return created_user;
        } catch (error) {
            throw new Error(
                `OOPs cannot create ${user.user_name}: ${
                    (error as Error).message
                } `
            );
        }
    }

    // get all users
    async index(): Promise<User[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            const users = result.rows;
            connection.release();
            return users;
        } catch (error) {
            throw new Error(
                `OOPs cannot get any user ${(error as Error).message}`
            );
        }
    }
    // get a specific user
    async show(id: string): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `SELECT * FROM users WHERE id = ($1)`;
            const result = await connection.query(sql, [id]);
            const user = result.rows[0];
            connection.release();
            return user;
        } catch (error) {
            throw new Error(
                `OOPs cannot get user ${id} with: ${(error as Error).message}`
            );
        }
    }
    // update user
    async update(user: User): Promise<User> {
        try {
            const connection = await db.connect();
            const sql =
                'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *';
            const result = await connection.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hash(user.password),
                user.id,
            ]);
            const updated_user = result.rows[0];
            connection.release();
            return updated_user;
        } catch (error) {
            throw new Error(`OOPs cannot update ${user.user_name} cause of: ${
                (error as Error).message
            }
            `);
        }
    }
    // delete user
    async delete(id: string): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM users WHERE id = ($1) RETURNING *`;
            const result = await connection.query(sql, [id]);
            const deleted_user = result.rows[0];
            connection.release();
            return deleted_user;
        } catch (error) {
            throw new Error(`OOPs cannot delete ${id} cause of: ${
                (error as Error).message
            }
            `);
        }
    }
    // authentication user
    async login(email: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';
            const result = await connection.query(sql, [email]);
            if (result.rows.length) {
                const { password: hash } = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(
                    password + config.pepper,
                    hash
                );
                if (isPasswordValid) {
                    const infoUser = await connection.query(
                        'SELECT id, user_name, first_name, last_name FROM users WHERE email=$1',
                        [email]
                    );
                    return infoUser.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`OOPs cannot login cause of: ${
                (error as Error).message
            }
            `);
        }
    }
}

export default UserModel;
