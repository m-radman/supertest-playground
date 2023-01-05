const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

describe('DELETE /orders/:orderId tests', () => {
  it('should delete an order and respond with ok status', async () => {
    // TODO 
  })

  it('should respond with 404 not found when order with given orderId does not exists', async () => {
    // TODO 
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    // TODO 
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    // TODO 
  })
})