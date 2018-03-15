
const request = require('supertest');
const { describe, it } = require('mocha');

const { app } = require('../../server');

describe('GET /', function() {
    it('respond with api version', function(done) {
        request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
