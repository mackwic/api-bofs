const app = require('../../server')
const { expect, supertest } = require('../utils')

describe('GET /bof-events/next', () => {
  it('respond 200', async () => {
    // arrange
    // act
    const response = await supertest(app)
      .get('/bof-events/next')
      .expect(200)
    // assert
    expect(response.body.date).to.equal('2018-05-17')
  })
})

describe('GET /bof-events/next/tracks/:track/hours/:hour', () => {
  it('respond 200', async () => {
    // arrange
    // act
    const response = await supertest(app)
      .get('/bof-events/next/tracks/1/hours/14:30')
      .expect(200)
    // assert
    expect(response.body).to.deep.equal({
      title: 'HBMC',
      private: true,
      speakersEmailsRaw: 'pde@octo.com, jpe@octo.com, api@octo.com, adc@octo.com',
      description: 'REX sur le projet HBMC (refonte des applications grand public de la BNP : Mes Comptes & Hello bank!)\n      ',
      takeAway: '.',
      targetedAudience: '.'
    })
  })
})
