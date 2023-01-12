const request = require("supertest")
const ACCESS_TOKEN = require("../../auth/generateAccessToken")
const SIMPLE_BOOKS_API_BASE_URL = "https://simple-books-api.glitch.me"
let accessToken
let orderId

describe("DELETE /orders/:orderId tests", () => {
  beforeAll(async function () {
    jest.setTimeout(15 * 1000)

    accessToken = await ACCESS_TOKEN.generateAccessToken()

    const createOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ bookId: 5, customerName: "Jon Berg" })

    if (createOrder.status !== 201) {
      throw Error("Failed to create order")
    }

    orderId = createOrder.body.orderId
  })

  it("should delete an order and respond with status 204", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(204)

    const checkOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(checkOrder.status).toEqual(404)
  })

  it("should respond with status 404 when order with provided orderId does not exist", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete("/order/notrealorderid")
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(404)
  })

  it("should respond with status 401 when authorization header is missing", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).delete(
      `/orders/${orderId}`
    )
    expect(response.status).toEqual(401)
  })

  it("should respond with status 401 when authorization header contains invalid token", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete(`/orders/${orderId}`)
      .set("Authorization", "Bearer invalidtoken")
    expect(response.status).toEqual(401)
  })
})
