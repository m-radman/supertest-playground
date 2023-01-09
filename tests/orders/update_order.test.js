const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

const ACCESS_TOKEN = '8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753'

describe('PUT /orders/:orderId tests', () => {
  it('should respond with updated order', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).patch('/orders/YFn1_hPGeumZ9LhchBenV')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .send({"customerName": "Billy Jean"})
    expect(response.status).toEqual(204)
    console.log(response.body)
  })

  it('should respond with 400 bad request when request body is missing customerName', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).patch('/orders/YFn1_hPGeumZ9LhchBenV')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .send({})
    expect(response.status).toEqual(400)
  })

  it('should respond with 404 not found when order with given orderId does not exists', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).patch('/orders/notrealorderid')
    .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    .send({"customerName": "Billy Jean"})
    expect(response.status).toEqual(404)
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).patch('/orders/YFn1_hPGeumZ9LhchBenV')
    .send({"customerName": "Billy Jean"})
    expect(response.status).toEqual(401)
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).patch('/orders/YFn1_hPGeumZ9LhchBenV')
    .set('Authorization', `Bearer invalidtoken`)
    .send({"customerName": "Billy Jean"})
    expect(response.status).toEqual(401)
  })
})