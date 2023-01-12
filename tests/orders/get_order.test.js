const crypto = require("crypto")

const request = require("supertest")
const utils = require("../../auth/utils")
const constants = require("../../auth/constants")
let accessToken
let orderId
let simpleBooksUrl

describe("GET /orders/:orderId tests", () => {
  beforeAll(async function () {
    jest.setTimeout(constants.JEST_TIMEOUT)

    simpleBooksUrl = constants.SIMPLE_BOOKS_API_BASE_URL
    accessToken = await utils.generateAccessToken()

    const createOrder = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ bookId: 5, customerName: "Jon Berg" })

    if (createOrder.status !== 201) {
      throw Error("Failed to create order")
    }

    orderId = createOrder.body.orderId
  })

  it("should respond with a specified order", async () => {
    const response = await request(simpleBooksUrl)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(200)
  })

  it("should respond with status 404 when order with provided orderId does not exist", async () => {
    const response = await request(simpleBooksUrl)
      .get("/order/notrealorderid")
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(404)
  })

  it("should respond with status 401 when authorization header is missing", async () => {
    const response = await request(simpleBooksUrl).get(`/orders/${orderId}`)
    expect(response.status).toEqual(401)
  })

  it("should respond with status 401 when authorization header contains invalid token", async () => {
    const response = await request(simpleBooksUrl)
      .get(`/orders/${orderId}`)
      .set("Authorization", "Bearer invalidtoken")
    expect(response.status).toEqual(401)
  })
})
