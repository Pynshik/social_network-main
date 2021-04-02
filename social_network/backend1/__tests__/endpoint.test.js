import { app } from '../server';
import supertest from 'supertest';

const request = supertest(app);

it('Gets the test endpoint', async done => {
    try {
        const res = await request.get('/');
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('pass!');
    } catch (err) {
        expect(err).toBe(err);
    }

    done()
  })