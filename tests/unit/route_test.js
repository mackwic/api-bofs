const sinon = require('sinon');

const Routes = require('../../src/routes');

describe('Routes', () => {
  describe('#setupAllRoutesInApp', () => {
    it('should exists', () => {
      // arrange
      const app = { get: () => {} };
      // act
      Routes.setupAllRoutesInApp(app, {});
      // assert
    });

    it('should call app methods', () => {
      // arrange
      const app = { get: sinon.stub() };
      const routes = {
        '/': { get: () => {} },
      };
      // act
      Routes.setupAllRoutesInApp(app, routes);
      // assert
      sinon.assert.calledOnce(app.get);
    });

    it('should call app methods once per route', () => {
      // arrange
      const app = { get: sinon.stub() };
      const routes = {
        '/': { get: () => {} },
        '/api': { get: () => {} },
      };
      // act
      Routes.setupAllRoutesInApp(app, routes);
      // assert
      sinon.assert.calledTwice(app.get);
    });

    it('should call the right app methods according to the descriptor', () => {
      // arrange
      const app = { post: sinon.stub() };
      const routes = {
        '/': { post: () => {} },
      };
      // act
      Routes.setupAllRoutesInApp(app, routes);
      // assert
      sinon.assert.calledOnce(app.post);
    });

    it('should call the app method with the callback', () => {
      // arrange
      const app = { post: sinon.stub() };
      const callback = () => {};
      const routes = {
        '/': { post: callback },
      };
      // act
      Routes.setupAllRoutesInApp(app, routes);
      // assert
      sinon.assert.calledWith(app.post, '/', callback);
    });
  });
});
