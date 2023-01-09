const request = require("supertest")
const SIMPLE_BOOKS_API_BASE_URL = "https://simple-books-api.glitch.me"

const ACCESS_TOKEN =
  "8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753"

let orderId

describe("PUT /orders/:orderId tests", () => {
  beforeAll(async function () {
    jest.setTimeout(15 * 1000)

    const createOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .post("/orders")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({ bookId: 5, customerName: "Jon Berg" })

    if (createOrder.status !== 201) {
      throw Error("Failed to create order")
    }

    orderId = createOrder.body.orderId
  })

  it("should respond with updated order", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .patch(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({ customerName: "Billy Jean" })
    expect(response.status).toEqual(204)

    const patchedOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
    expect(patchedOrder.body).toMatchObject({ customerName: "Billy Jean" })
  })

  it("should respond with 204 when request body is empty", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .patch(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({})
    expect(response.status).toEqual(204)
  })

  it("should respond with 404 not found when order with given orderId does not exists", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .patch("/orders/notrealorderid")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({ customerName: "Billy Jean" })
    expect(response.status).toEqual(404)
  })

  it("should respond with 401 unauthorized request when authorization header is missing", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .patch(`/orders/${orderId}`)
      .send({ customerName: "Billy Jean" })
    expect(response.status).toEqual(401)
  })

  it("should respond with 401 unauthorized request when authorization header contains invalid token", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .patch(`/orders/${orderId}`)
      .set("Authorization", `Bearer invalidtoken`)
      .send({ customerName: "Billy Jean" })
    expect(response.status).toEqual(401)
  })
})
