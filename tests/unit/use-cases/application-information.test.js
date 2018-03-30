const pkg = require('../../../package.json')
const { expect, sinon } = require('../../utils')

const applicationInformationUseCase = require('../../../src/use-cases/application-information')

describe('applicationInformationUseCase', () => {
  describe('.getApplicationInformation((req, res))', () => {
    it('returns package.json object', () => {
      // arrange
      const res = { send: sinon.stub() }
      // act
      applicationInformationUseCase.getApplicationInformation({}, res)
      // assert
      expect(res.send).to.have.been.calledWith({
        name: pkg.name,
        version: pkg.version,
        contributors: pkg.contributors
      })
    })
  })
})
