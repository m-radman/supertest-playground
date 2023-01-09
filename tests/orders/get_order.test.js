const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

const ACCESS_TOKEN = '8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753'

describe('GET /orders/:orderId tests', () => {
  it('should respond with an order', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders/YFn1_hPGeumZ9LhchBenV')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    expect(response.status).toEqual(200)
    console.log(response.body)
  })

  it('should respond with 404 not found when order with provided $orderId does not exists', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders/notrealorderid')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    expect(response.status).toEqual(404)
    expect(response.body).toMatchObject({"error": "No order with id notrealorderid."})
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders/YFn1_hPGeumZ9LhchBenV')
    expect(response.status).toEqual(401)
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders/YFn1_hPGeumZ9LhchBenV')
    .set('Authorization', `Bearer ivalidtoken`)
    expect(response.status).toEqual(401)
  })
})