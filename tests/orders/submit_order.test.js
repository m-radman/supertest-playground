const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

const ACCESS_TOKEN = '8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753'

describe('POST /orders tests', () => {
  it('should respond with new created order', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).post('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .send({ "bookId": 5, "customerName": "Jon Berg"})
      console.log(response.body)
  })

  it('should respond with 400 bad request when request body is missing bookId', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).post('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .send({"customerName": "Jon Berg"})
      expect(response.status).toEqual(400)
      expect(response.body).toMatchObject({"error": "Invalid or missing bookId."})
  })

  it('should respond with 400 bad request when request body is missing customerName', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).post('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .send({ "bookId": 5})
      expect(response.status).toEqual(400)
      expect(response.body).toMatchObject({"error": "Missing customerName"})
  })

  it('should respond with 409 conflict when book with given bookId already exists', async () => {
    // TODO 
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).post('/orders')
    .send({ "bookId": 5, "customerName": "Jon Berg"})
    expect(response.status).toEqual(401)
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).post('/orders')
    .set('Authorization', `Bearer someinvalidtokenhere`)
    .send({ "bookId": 5, "customerName": "Jon Berg"})
    expect(response.status).toEqual(401)
  })
})