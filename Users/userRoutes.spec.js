const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../server');

beforeEach(async () => {
    await db('users').truncate();
    return db.seed.run();
  });

describe('[GET] all users endpoint', () => {
    test('returns 200 ok', async () => {
        const response = await request(server).get('/users');
        expect(response.statusCode).toBe(200);
    })
    test('returns seeded test login detais',  async () => {
        const response = await request(server).get('/users');
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual({ "id": 1, "username": "test"});
    })
});