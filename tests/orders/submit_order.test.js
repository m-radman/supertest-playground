const request = require("supertest")
const utils = require("../../auth/utils")
const constants = require("../../auth/constants")
let accessToken
let simpleBooksUrl

describe("POST /orders tests", () => {
  beforeAll(async function () {
    jest.setTimeout(constants.JEST_TIMEOUT)

    simpleBooksUrl = constants.SIMPLE_BOOKS_API_BASE_URL
    accessToken = await utils.generateAccessToken()
  })

  it("should respond with created order", async () => {
    const response = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        bookId: 3,
        customerName: "Kelly Monroe",
      })
    expect(response.body).toHaveProperty("orderId")
  })

  it("should respod with status 400 when request body is missing bookId", async () => {
    const response = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ customerName: "Doc Watson" })
    expect(response.status).toEqual(400)
    expect(response.body).toMatchObject({ error: "Invalid or missing bookId." })
  })

  it("should respond with 201 when request body is missing customerName", async () => {
    const response = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ bookId: 1 })
    expect(response.status).toEqual(201)

    const newOrder = await request(simpleBooksUrl)
      .get(`/orders/${response.body.orderId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(newOrder.status).toEqual(200)
    expect(newOrder.body).not.toHaveProperty("customerName")
  })

  it("should respond with status 401 when authorization header is missing", async () => {
    const response = await request(simpleBooksUrl).post("/orders").send({
      bookId: 5,
      customerName: "Billy Jean",
    })
    expect(response.status).toEqual(401)
  })

  it("should respond with status 401 when authorization header contains invalid access token", async () => {
    const response = await request(simpleBooksUrl)
      .post("/orders")
      .set("Authorization", "Bearer invalidtoken")
      .send({
        bookId: 5,
        customerName: "Billy Jean",
      })
    expect(response.status).toEqual(401)
  })
})
