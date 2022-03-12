import db from '../../database/pool';
import UserModel from '../../models/user';
import User from '../../types/user';

const user_model = new UserModel();
describe('Authentication Model', () => {
    describe('Test method exist', () => {
        it('authentication function should be defined', () => {
            expect(user_model.login).toBeDefined();
        });
    });
    describe('Test authentication logic', () => {
        const user_data: User = {
            email: 'asmaa@email.com',
            user_name: 'asmaa-elshowair',
            first_name: 'Asmaa',
            last_name: 'Elshowair',
            password: 'ae081193',
        };

        beforeAll(async () => {
            const createdUser: User = await user_model.create(user_data);
            user_data.id = createdUser.id;
        });

        it('Should return an authenticated user', async () => {
            const authenticated_user = await user_model.login(
                user_data.email,
                user_data.password
            );
            expect(authenticated_user?.user_name).toEqual(user_data.user_name);
        });

        it('Should return null for un authenticated user', async () => {
            const authenticated_user = await user_model.login(
                'fake@email.com',
                'fake-password'
            );
            expect(authenticated_user).toBe(null);
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users';
            await connection.query(sql);
            connection.release();
        });
    });
});
