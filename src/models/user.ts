import db from '../database/pool';
import User from '../types/user';

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
                user.password,
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
    // async index(): Promise<User[]> {
    //     try {
    //         const connection = await db.connect();
    //         const sql = 'SELECT * FROM users';
    //         const result = await connection.query(sql);
    //         const users = result.rows;
    //         connection.release();
    //         return users;
    //     } catch (error) {
    //         throw new Error(
    //             `OOPs cannot get any user ${(error as Error).message}`
    //         );
    //     }
    // }
    // get a specific user
    // async show(id: number): Promise<User> {
    //     const connection = await db.connect();
    //     const sql = `SELECT * FROM users WHERE id = $1`;
    //     const result = await connection.query(sql, [id]);
    //     const user = result.rows[0];
    //     connection.release();
    //     return user;
    // }
    // update user
    //delete user
    // authentication user
}

export default UserModel;
