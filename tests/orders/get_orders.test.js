const request = require('supertest');
const SIMPLE_BOOKS_API_BASE_URL = 'https://simple-books-api.glitch.me'

const CLIENT_NAME = 'SupertestPlayground'
const CLIENT_EMAIL = 'ivacizmas@example.com'
const ACCESS_TOKEN = '8a3f41cb98d1608664c552af9cc2c5f341bc1d89ac03fd0d31335947a5142753'

async function generateAccessToken () {
  const authResponse = await request(SIMPLE_BOOKS_API_BASE_URL).post('/api-clients')
    .set('Content-Type', 'application/json')
    .send({
      "clientName": CLIENT_NAME,
      "clientEmail": CLIENT_EMAIL
    })
  
  if(authResponse.status == 200) {
    ACCESS_TOKEN = authResponse.body.accessToken
    console.debug(`New ACCESS_TOKEN "${ACCESS_TOKEN}" is successfully generated and preserved locally.`)
  } else if(authResponse.status === 409) {
    console.debug(`Current ACCESS_TOKEN "${ACCESS_TOKEN}" is still valid. API client is already registered. `)
  } else {
    throw Error(`Failed to register API client. POST /api-clients responded with ${authResponse.status} ${JSON.stringify(authResponse.body)}`)
  }
} 

describe('GET /orders tests', () => {
  it('should respond with a list of all orders', async () => {
    await generateAccessToken()

    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
    expect(response.status).toEqual(200)
    console.log(response.body)
  })

  it('should respond with 401 unauthorized request when authorization header is missing', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders')
    expect(response.status).toEqual(401)
  })

  it('should respond with 401 unauthorized request when authorization header contains invalid token', async () => {
    const response = await request(SIMPLE_BOOKS_API_BASE_URL).get('/orders')
      .set('Authorization', `Bearer someinvalidtokenhere`)
    expect(response.status).toEqual(401)
  })
})