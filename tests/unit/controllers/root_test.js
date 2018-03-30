const pkg = require('../../../package.json')
const { expect, sinon } = require('../../utils')

const rootController = require('../../../src/controllers/root')

describe('rootController', () => {
  describe('.get((req, res))', () => {
    it('returns package.json object', () => {
      // arrange
      const res = { send: sinon.stub() }
      // act
      rootController.get({}, res)
      // assert
      expect(res.send).to.have.been.calledWith({
        name: pkg.name,
        version: pkg.version,
        contributors: pkg.contributors
      })
    })
  })
})
