import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test Main Endpoint', () => {
    it('Get / endpoint should return OK', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
