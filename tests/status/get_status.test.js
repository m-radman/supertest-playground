const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

describe('GET /status tests', () => {
  it('should respond with ok status', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/status')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ status: 'OK' });
  })
})