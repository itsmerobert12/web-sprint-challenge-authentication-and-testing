
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


// Write your tests here
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('GET /api/jokes', () => {

  test('returns a status 200 OK', async () => {
    const res = await request(server)
      .get('/api/jokes')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6Ik1ld3R3byIsImlhdCI6MTY0MzM0NTMzMCwiZXhwIjoxNjQzNDMxNzMwfQ.bujXX2wW9liVaOFoSrxeKu5FvEm9n-H5azDl3TI1pwY')
    console.log(res)
    expect(res.status).toBe(200)
  })
  test('returns a status 401 Unauthorized', async () => {
    const res = await request(server)
      .get('/api/jokes')
    expect(res.status).toBe(401)
  })
})

describe('POST /api/auth/register', () => {
  test('returns a status 201 Created', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Vaporeon', password: '1234' })
    console.log(res)
    expect(res.status).toBe(201)
  })
  test('returns a status 422 Unprocessable Entity', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Vaporeon' })
    expect(res.status).toBe(422)
  })
})

describe('POST /api/auth/login', () => {
  test('returns a status 200 OK', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Eevee', password: '1234' })
    expect(res.status).toBe(200)
  })
  test('returns a status 422 Unprocessable Entity', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Eevee', password: '' })
    expect(res.status).toBe(422)
  })
})
