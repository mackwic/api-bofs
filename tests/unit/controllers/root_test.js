
const pkg = require('../../../package.json');
const sinon = require('sinon');

const RootController = require('../../../src/controllers/root');

describe('RootController', () => {
  describe('#get', () => {
    it('should return package.json object', () => {
      // arrange
      const res = { send: sinon.stub() };
      // act
      RootController.get({}, res);
      // assert
      sinon.assert.calledWith(res.send, {
        name: pkg.name,
        version: pkg.version,
        author: pkg.author,
      });
    });
  });
});
