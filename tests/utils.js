const chai = require('chai')
const supertest = require('supertest')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

module.exports = {
  expect: chai.expect,
  supertest,
  sinon
}
