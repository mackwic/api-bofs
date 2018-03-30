const { expect, sinon } = require('../../utils')

const routes = require('../../../src/infrastructure/routes')

describe('Routes', () => {
  describe('.setupAllRoutesInApp(app, routeObject)', () => {
    it('calls app methods', () => {
      // arrange
      const app = { get: sinon.stub() }
      const routeObject = {
        '/': { get: () => {} }
      }
      // act
      routes.setupAllRoutesInApp(app, routeObject)
      // assert
      expect(app.get).to.have.been.calledOnce
    })

    it('calls app methods once per route', () => {
      // arrange
      const app = { get: sinon.stub() }
      const routeObject = {
        '/': { get: () => {} },
        '/api': { get: () => {} }
      }
      // act
      routes.setupAllRoutesInApp(app, routeObject)
      // assert
      expect(app.get).to.have.been.calledTwice
    })

    it('calls the right app methods according to the descriptor', () => {
      // arrange
      const app = { post: sinon.stub() }
      const routeObject = {
        '/': { post: () => {} }
      }
      // act
      routes.setupAllRoutesInApp(app, routeObject)
      // assert
      expect(app.post).to.have.been.calledOnce
    })

    it('calls the app method with the callback', () => {
      // arrange
      const app = { post: sinon.stub() }
      const callback = () => {}
      const routeObject = {
        '/': { post: callback }
      }
      // act
      routes.setupAllRoutesInApp(app, routeObject)
      // assert
      expect(app.post).to.have.been.calledWith('/')
    })
  })

  describe('.hanleErrorsInController(routePath, controller)', () => {
    it('should be a simple proxy on the UseCase', () => {
      // arrange
      const fakeUseCase = sinon.stub()
      const handler = routes.handleErrorsInController('/', fakeUseCase)
      // act
      handler()
      // assert
      expect(fakeUseCase).to.have.been.called
    })

    it('should catch exceptions and return a 500 when the request handler throws', () => {
      // arrange
      const response = { status: sinon.stub().returnsThis(), send: sinon.stub() }
      const fakeUseCase = () => { throw new Error() }
      const handler = routes.handleErrorsInController('/', fakeUseCase)
      // act
      handler({}, response)
      // assert
      expect(response.status).to.have.been.calledWith(500)
    })
  })
})
