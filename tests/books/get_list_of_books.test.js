const request = require("supertest")
const constants = require("../../auth/constants")
let simpleBooksUrl

describe("GET /books tests", () => {
  beforeAll(async function () {
    jest.setTimeout(await constants.JEST_TIMEOUT)

    simpleBooksUrl = await constants.SIMPLE_BOOKS_API_BASE_URL
  })

  it("should respond with a list of all books", async () => {
    const response = await request(simpleBooksUrl).get("/books")
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(6)
    expect(response.body).toContainEqual(
      expect.objectContaining({ name: "The Russian" })
    )
  })

  it('should respond with a list of all "fiction" books', async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ type: "fiction" })
    expect(response.status).toEqual(200)
    response.body.forEach((book) => {
      expect(book.type).toEqual("fiction")
    })
  })

  it("should respond with a list of all non-fiction books", async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ type: "non-fiction" })
    expect(response.status).toEqual(200)
    response.body.forEach((book) => {
      expect(book.type).toEqual("non-fiction")
    })
  })

  it("should respond with bad request when type query param has invalid value", async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ type: "something_invalid" })
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject({
      error:
        "Invalid value for query parameter 'type'. Must be one of: fiction, non-fiction.",
    })
  })

  it("should respond with a limited number of books when limit param is set", async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ limit: 2 })
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(2)
  })

  it("should respond with bad request when limit query param is greater then 20", async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ limit: 21 })
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject({
      error:
        "Invalid value for query parameter 'limit'. Cannot be greater than 20.",
    })
  })

  it("should respond with bad request when limit query param is less then 1", async () => {
    const response = await request(simpleBooksUrl)
      .get("/books")
      .query({ limit: -3 })
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject({
      error:
        "Invalid value for query parameter 'limit'. Must be greater than 0.",
    })
  })
})
