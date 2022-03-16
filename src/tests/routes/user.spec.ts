import supertest from 'supertest';
import UserModel from '../../models/user';
import app from '../../server';
import User from '../../types/user';
import db from '../../database/pool';

const request = supertest(app);
const user_model = new UserModel();
let token = '';

describe("Test user's Endpoints", () => {
    const user: User = {
        email: 'ahmad@email.com',
        user_name: 'ahmad-elshowair',
        first_name: 'Ahmad',
        last_name: 'Elshowair',
        password: 'ae081193',
    };

    beforeAll(async () => {
        const created_user = await user_model.create(user);
        user.id = created_user.id;
    });

    describe('Test Authentication Endpoints', () => {
        it('Should authenticate user and return token', async () => {
            const response = await request
                .post('/users/login')
                .set('Content-type', 'application/json')
                .send({
                    email: 'ahmad@email.com',
                    password: 'ae081193',
                });
            expect(response.status).toBe(200);
            const { id, token: userToken } = response.body.data;
            expect(id).toBe(user.id);
            token = userToken;
        });
    });
    describe("TEST APIs' functions", () => {
        it('Create api\'s function of "/users/create" should create a user', async () => {
            const response = await request
                .post('/users/create')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'asmaa@email.com',
                    user_name: 'asmaa-elshowair',
                    first_name: 'Asmaa',
                    last_name: 'Elshowair',
                    password: 'as081193',
                } as User);
            expect(response.status).toBe(200);
            const { email, user_name, first_name, last_name } =
                response.body.data;
            expect(email).toBe('asmaa@email.com');
            expect(user_name).toBe('asmaa-elshowair');
            expect(first_name).toBe('Asmaa');
            expect(last_name).toBe('Elshowair');
        });

        it('Index Api\'s function of "/users"should  return all existing users', async () => {
            const response = await request
                .get('/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
        });

        it('Show api\'s function of "/users/user/:id" should return a user', async () => {
            const response = await request
                .get(`/users/user/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.user_name).toBe('ahmad-elshowair');
            expect(response.body.data.email).toBe('ahmad@email.com');
        });

        it('update api\'s function of "/users/edit/:id" should update a user', async () => {
            const response = await request
                .patch(`/users/edit/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    email: 'elshowair@rmail.com',
                    user_name: 'saeed-elshowair',
                    first_name: 'Saeed',
                });
            expect(response.status).toBe(200);
            expect(response.body.data.email).toBe('elshowair@rmail.com');
            expect(response.body.data.user_name).toBe('saeed-elshowair');
            expect(response.body.data.first_name).toBe('Saeed');
        });

        it('delete api\'s function of "/users/delete/:id" should delete a user', async () => {
            const response = await request
                .del(`/users/delete/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(user.id);
            expect(response.body.data.user_name).toBe('saeed-elshowair');
        });
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM users';
        await connection.query(sql);
        connection.release();
    });
});
console.log(token);
