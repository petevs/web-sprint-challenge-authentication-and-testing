// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(true)
// })

const supertest = require('supertest')
const server = require('./server')

describe("auth endpoint tests", () => {
  describe('[POST] /api/auth/register', () => {
    it('creates a new user', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({
          username: 'jimbo',
          password: 'slice'
        })
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.id).toBeDefined()
      expect(res.body.username).toBe('jimbo')
    })
    it('gives correct error if registrations details invalide', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({
          username: '',
          password: 'hi there'
        })
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe('username and password required')
  
    })
  })
  describe('[POST] /api/auth/login', () => {

    it('successfully logs in user', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({
          username: 'jimbo',
          password: 'slice'
        })
      const res = await supertest(server)
        .post('/api/auth/login')
        .send({
          username: 'jimbo',
          password: 'slice'
        })
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe("application/json")
      expect(res.body.message).toBe('welcome, jimbo')
    })
    it('responds with invalid credentials if password incorrect', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({
          username: 'jimbo',
          password: 'slice'
        })
      const res = await supertest(server)
        .post('/api/auth/login')
        .send({
          username: 'jimbo',
          password: 'wrong'
        })
      expect(res.statusCode).toBe(401)
      expect(res.type).toBe("application/json")
      expect(res.body.message).toBe('invalid credentials')
    })
  })
})