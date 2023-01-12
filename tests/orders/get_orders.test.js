const request = require("supertest")
const utils = require("../../auth/utils")
const constants = require("../../auth/constants")
let accessToken
let simpleBooksUrl

describe("GET /orders tests", () => {
  beforeAll(async function () {
    jest.setTimeout(constants.JEST_TIMEOUT)

    simpleBooksUrl = constants.SIMPLE_BOOKS_API_BASE_URL
    accessToken = await utils.generateAccessToken()
  })

  it("should respond with a list of all orders", async () => {
    const createOrder = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        bookId: 6,
        customerName: "Oswald Pengu",
      })
    expect(createOrder.body).toHaveProperty("orderId")

    const response = await request(simpleBooksUrl)
      .get("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(200)
    expect(response.length).not.toEqual(0)
  })

  it("should respond with status 401 when authorization header is missing", async () => {
    const response = await request(simpleBooksUrl).get("/orders")
    expect(response.status).toEqual(401)
  })

  it("should respond with status 401 when authorization header contains invalid token", async () => {
    const response = await request(simpleBooksUrl)
      .get("/orders")
      .set("Authorization", "Bearer invalidtoken")
    expect(response.status).toEqual(401)
  })
})
