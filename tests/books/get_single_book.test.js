const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

describe('GET /books/:bookId tests', () => {
  it('should respond with detailed information about a book', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/books/4')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({"id":4,"name":"The Midnight Library","author":"Matt Haig","type":"fiction","price":15.6,"current-stock":87,"available":true})
  })

  it('should respond with 404 not found when book with provided $bookId does not exists', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/books/9')
    expect(response.status).toEqual(404)
    expect(response.body).toMatchObject({"error": "No book with id 9"})
  })
})