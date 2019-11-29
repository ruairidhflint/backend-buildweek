const db = require('../database/dbConfig');
const helpers = require('./jokesHelpers');

beforeAll(async () => {
  await db('users').truncate();
  return db.seed.run();
});


describe('jokes helpers testing', () => {
  describe('get all jokes', () => {
    test('all jokes are returned', async () => {
      const allJokes = await helpers.getAllJokes();
      expect(allJokes.length).toBe(3);
    });
  });
  describe('get public jokes', () => {
    test('all public jokes are returned', async () => {
      const publicJokes = await helpers.getPublicJokes();
      expect(publicJokes.length).toBe(2);
    });

    describe('get jokes by ID', () => {
      test('all jokes from certain user are returned', async () => {
        const allJokes = await helpers.getJokesbyUserID(1);
        expect(allJokes.length).toBe(3);
      });
    });
  });
  describe('get joke by ID', () => {
    test('correct joke returned', async () => {
      const joke = await helpers.getJokeByID(1);
      expect(joke.joke_q).toBe('Why did the chicken cross the road?');
    });
  });
});
