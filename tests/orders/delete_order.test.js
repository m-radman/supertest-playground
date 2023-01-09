const request = require("supertest")
const SIMPLE_BOOKS_API_BASE_URL = "https://simple-books-api.glitch.me"

const ACCESS_TOKEN =
  "8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753"

describe("DELETE /orders/:orderId tests", () => {
  it("should delete an order and respond with ok status", async () => {
    const createOrder = await request(SIMPLE_BOOKS_API_BASE_URL)
      .post("/orders")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({ bookId: 5, customerName: "Jon Berg" })

    if (createOrder.status !== 201) {
      throw Error("Failed to create order")
    }

    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete(`/orders/${createOrder.body.orderId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
    expect(response.status).toEqual(204)
  })

  it("should respond with 404 not found when order with given orderId does not exists", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete("/orders/notrealorderid")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
    expect(response.status).toEqual(404)
  })

  it("should respond with 401 unauthorized request when authorization header is missing", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).delete(
      "/orders/notrealorderid"
    )
    expect(response.status).toEqual(401)
  })

  it("should respond with 401 unauthorized request when authorization header contains invalid token", async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL)
      .delete("/orders/notrealorderid")
      .set("Authorization", `Bearer invalidtoken`)
    expect(response.status).toEqual(401)
  })
})
