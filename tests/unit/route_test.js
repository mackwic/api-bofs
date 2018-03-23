const { expect, sinon } = require('../utils');

const routes = require('../../src/routes');

describe('Routes', () => {
  describe('.setupAllRoutesInApp(app, routeObject)', () => {
    it('calls app methods', () => {
      // arrange
      const app = { get: sinon.stub() };
      const routeObject = {
        '/': { get: () => {} },
      };
      // act
      routes.setupAllRoutesInApp(app, routeObject);
      // assert
      expect(app.get).to.have.been.calledOnce;
    });

    it('calls app methods once per route', () => {
      // arrange
      const app = { get: sinon.stub() };
      const routeObject = {
        '/': { get: () => {} },
        '/api': { get: () => {} },
      };
      // act
      routes.setupAllRoutesInApp(app, routeObject);
      // assert
      expect(app.get).to.have.been.calledTwice;
    });

    it('calls the right app methods according to the descriptor', () => {
      // arrange
      const app = { post: sinon.stub() };
      const routeObject = {
        '/': { post: () => {} },
      };
      // act
      routes.setupAllRoutesInApp(app, routeObject);
      // assert
      expect(app.post).to.have.been.calledOnce;
    });

    it('calls the app method with the callback', () => {
      // arrange
      const app = { post: sinon.stub() };
      const callback = () => {};
      const routeObject = {
        '/': { post: callback },
      };
      // act
      routes.setupAllRoutesInApp(app, routeObject);
      // assert
      expect(app.post).to.have.been.calledWith('/', callback);
    });
  });
});
