const { supertest } = require('../utils')
const app = require('../../server')

describe('GET /', () => {
  it('responds with api version', (done) => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
