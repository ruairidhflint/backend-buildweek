const db = require('../database/dbConfig')
const helpers = require('./userHelpers');

beforeAll(async () => {
    await db('users').truncate();
    return db.seed.run();
});

describe('User Helpers', () => {
    describe('GET ALL', () => {
        test('all users', async () => {
            const users = await helpers.getAllUsers();
            expect(users).toEqual([{ "id": 1, "username": "test" }]);
        })
    })

    describe('GET By USERNAME', () => {
        test('username test should return', async () => {
            const users = await helpers.getUserByUsername('test');
            expect(users).toEqual({
                "id": 1,
                "password": "$2b$12$6el8udvmW43HYOnOJu1DLOEab1coHhzjbjoJl0HeZM5tSYC3YOsgO",
                "username": "test",
            });
        })
    })

    describe('POST NEW USER', () => {
        test('add new  user', async () => {
            const users = await helpers.addNewUser({ username: "tom", password: "1234" });
            expect(users).toStrictEqual([2]);
        })

        test('check new user exists', async () => {
            const users = await helpers.getAllUsers();
            expect(users).toEqual([{ "id": 1, "username": "test" }, { "id": 2, "username": "tom" }])
        })
    })

    describe('DELETE USER', () => {
        test('delete new  user', async () => {
            const users = await helpers.deleteUser(2);
            expect(users).toBe(1);
        })
    })

})

