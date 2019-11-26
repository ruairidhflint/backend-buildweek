const request = require('supertest');
const server = require('./server');

describe('Server tests', () => {
  describe('Server GET top level endpoint', () => {
    test('Testing envrionment used', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

    test('should return 200 OK', async () => {
      const response = await request(server).get('/');
      expect(response.statusCode).toEqual(200);
      expect(response.body.API).toEqual('Working');
    });

    test('should return "working"', async () => {
      const response = await request(server).get('/');
      expect(response.body.API).toEqual('Working');
    });
  });
});
