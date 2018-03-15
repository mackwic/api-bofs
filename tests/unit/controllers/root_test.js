
const sinon = require('sinon');

const RootController = require('../../../src/controllers/root');

describe('RootController', () => {
    describe('#get', () => {

        it('should return package.json object', () => {
            // arrange
            const package = require('../../../package.json');
            const res = { send: sinon.stub() };
            // act
            RootController.get({}, res);
            // assert
            sinon.assert.calledWith(res.send, {
                name: package.name,
                version: package.version,
                author: package.author,
            });
        })
    });
});
