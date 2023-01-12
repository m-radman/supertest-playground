const request = require("supertest")
const constants = require("../../auth/constants")
let simpleBooksUrl

describe("GET /books/:bookId tests", () => {
  beforeAll(async function () {
    jest.setTimeout(constants.JEST_TIMEOUT)

    simpleBooksUrl = constants.SIMPLE_BOOKS_API_BASE_URL
  })

  it("should respond with detailed information about a book", async () => {
    const response = await request(simpleBooksUrl).get("/books/4")
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      id: 4,
      name: "The Midnight Library",
      author: "Matt Haig",
      type: "fiction",
      price: 15.6,
      "current-stock": 87,
      available: true,
    })
  })

  it("should respond with 404 not found when book with provided $bookId does not exists", async () => {
    const response = await request(simpleBooksUrl).get("/books/9")
    expect(response.status).toEqual(404)
    expect(response.body).toMatchObject({ error: "No book with id 9" })
  })
})
