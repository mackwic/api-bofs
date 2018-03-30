const app = require('../../server')
const { expect, request } = require('../utils')

describe.skip('GET /bof/next', () => {
  it('respond 200', async () => {
    // arrange
    // act
    const response = await request(app).get('/bof/next')
    // assert
    expect(response.body.date).to.equals('2018-04-19')
  })
})
