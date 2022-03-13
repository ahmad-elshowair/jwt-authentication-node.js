import UserModel from '../../models/user';
import User from '../../types/user';
import db from '../../database/pool';

const user_model = new UserModel();
describe('Test user Model', () => {
    describe("Are users's functions defined?", () => {
        it('Create function is Defined', async () => {
            expect(user_model.create).toBeDefined();
        });

        it('Index function is Defined', async () => {
            expect(user_model.index).toBeDefined();
        });

        it('Show function is Defined', async () => {
            expect(user_model.show).toBeDefined();
        });

        it('Update function is Defined', async () => {
            expect(user_model.update).toBeDefined();
        });

        it('Delete function is Defined', async () => {
            expect(user_model.delete).toBeDefined();
        });

        describe("Test user's functions logic", () => {
            const user: User = {
                email: 'ahmad@email',
                user_name: 'ahmad-elshowair',
                first_name: 'Ahmad',
                last_name: 'Elshowair',
                password: 'ae081193',
            };

            beforeAll(async () => {
                const created_user: User = await user_model.create(user);
                user.id = created_user.id;
            });

            it('Create function return a new user', async () => {
                const created_user: User = await user_model.create({
                    email: 'asmaa@email.com',
                    user_name: 'asmaa-elshowair',
                    first_name: 'Asmaa',
                    last_name: 'Elshowair',
                    password: 'Ae081193',
                });
                expect(created_user).toEqual({
                    id: created_user.id,
                    email: created_user.email,
                    user_name: created_user.user_name,
                    first_name: created_user.first_name,
                    last_name: created_user.last_name,
                    password: created_user.password,
                });
            });

            it('Index function should return all existing user', async () => {
                const users = await user_model.index();
                expect(users.length).toBeGreaterThan(0);
            });

            it('Show function should return a specific user', async () => {
                const a_user = await user_model.show(user.id as string);
                expect(a_user.id).toEqual(user.id);
            });

            it('Update function should return updated user', async () => {
                const updated_user: User = await user_model.update({
                    ...user,
                    email: 'elshowair@email.com',
                });
                expect(updated_user.email).toEqual('elshowair@email.com');
            });

            it('Delete function should delete a user', async () => {
                const deleted_user = await user_model.delete(user.id as string);
                const users = await user_model.index();
                expect(users).not.toContain(deleted_user);
            });

            afterAll(async () => {
                const connection = await db.connect();
                const sql = 'DELETE FROM users';
                await connection.query(sql);
                connection.release();
            });
        });
    });
});
