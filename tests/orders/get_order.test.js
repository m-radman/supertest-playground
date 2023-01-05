const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

describe('GET /orders/:orderId tests', () => {
  it('should respond with an order', async () => {
    // TODO 
  })

  it('should respond with 404 not found when order with provided $orderId does not exists', async () => {
    // TODO 
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    // TODO 
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    // TODO 
  })
})