const request = require("supertest")
const ACCESS_TOKEN = require("../../auth/generateAccessToken")
const SIMPLE_BOOKS_API_BASE_URL = "https://simple-books-api.glitch.me"
let accessToken

describe("GET /orders tests", () => {
  beforeAll(async function () {
    jest.setTimeout(15 * 1000)

    accessToken = await ACCESS_TOKEN.generateAccessToken()
  })

  it("should respond with a list of all orders", async () => {
    const createOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        bookId: 6,
        customerName: "Oswald Pengu",
      })
    expect(createOrder.body).toHaveProperty("orderId")

    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .get("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(200)
    expect(response.length).not.toEqual(0)
  })

  it("should respond with status 401 when authorization header is missing", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get("/orders")
    expect(response.status).toEqual(401)
  })

  it("should respond with status 401 when authorization header contains invalid token", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .get("/orders")
      .set("Authorization", "Bearer invalidtoken")
    expect(response.status).toEqual(401)
  })
})
