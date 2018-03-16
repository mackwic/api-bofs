const request = require('supertest');
const assert = require('assert');
const { describe, it } = require('mocha');

const { app } = require('../../server');

describe('GET /bofs/next', () => {
  it('respond 200', () => request(app)
    .get('/bofs/next')
    .then((response) => {
      assert.equal(response.body.date, '2018-04-19');
    }));
});
