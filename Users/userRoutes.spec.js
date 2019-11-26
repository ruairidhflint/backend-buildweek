const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../server');

const existingUser = {
    username: "test",
    password: "1234"
}

const testCaseNewUser = {
    username: "Rory",
    password: "1234"
};

beforeEach(async () => {
    await db('users').truncate();
    return db.seed.run();
})

describe('[GET] all users endpoint', () => {
    test('returns 200 ok', async () => {
        const response = await request(server).get('/users');
        expect(response.statusCode).toBe(200);
    })
    test('returns seeded test login detais', async () => {
        const response = await request(server).get('/users');
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual({ "id": 1, "username": "test" });
    })
});

describe('[POST] new User', () => {
    test('returns ID', async () => {
        const response = await request(server)
            .post('/users/signup')
            .send(testCaseNewUser);
        expect(response.body);
    })
})

// describe('/api/login endpoint', () => {
//     describe('[POST] /api/login', () => {
//         test('responds with a 200 to a properly formatted POST from an existing user', async () => {
//             const response = await request(server)
//                 .post('/users/login')
//                 .send({ "username": "test", "password": "1234" });

//                 console.log(response)
//         })

//     })
// })


