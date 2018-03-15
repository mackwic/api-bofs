const request = require('supertest');

const { app } = require('../../server');

describe('GET /', () => {
  it('respond with api version', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
