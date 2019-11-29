const db = require('../database/dbConfig');
const helpers = require('./jokesHelpers');

beforeAll(async () => {
  await db('jokes').truncate();
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

  describe('post new joke', () => {
    test('posts successfully', async () => {
      const newJoke = {
        joke_q: 'Q testing',
        joke_a: 'A testing',
        privated: 0,
        user_id: 1,
      };
      const postJoke = await helpers.postNewJokeByUserID(newJoke);

      expect(postJoke).toStrictEqual([4]);
    });
  });

  describe('update joke', () => {
    test('updates successfully', async () => {
      const updateJoke = {
        joke_q: 'Q updates',
        joke_a: 'A updates',
        privated: 0,
        user_id: 1,
      };
      const updatedJoke = await helpers.updateJokeByID(updateJoke, 1);

      expect(updatedJoke).toBe(1);
    });
  });

  describe('delete joke', () => {
    test('deletes joke successfully', async () => {
      const deleted = await helpers.deleteJokeByJokeID(4);

      expect(deleted).toBe(1);
    });
  });
});
