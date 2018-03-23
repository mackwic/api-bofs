const app = require('../../server');
const { expect, request } = require('../utils');

describe('GET /bofs/next', () => {
  it('respond 200', async () => {
    // arrange
    // act
    const response = await request(app).get('/bofs/next');
    // assert
    expect(response.body.date).to.equals('2018-04-19');
  });
});
