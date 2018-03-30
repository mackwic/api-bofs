const { expect, sinon } = require('../../utils')

const bofEventsUseCase = require('../../../src/use-cases/bof-events')
const dateAdapter = require('../../../src/infrastructure/adapters/date-from-spreadsheet-to-domain')

describe('.getNext(req, res)', () => {
  it('returns the formated date from the spreadsheet repository', async () => {
    // arrange
    const spreadsheetRepository = {
      getNextBofEventDate () {
        return Promise.resolve('13 avril 2020')
      }
    }
    const { getNext } = bofEventsUseCase(dateAdapter, spreadsheetRepository)
    const res = { send: sinon.stub() }

    // act
    await getNext({}, res)

    // assert
    expect(res.send).to.have.been.calledWith({
      date: '2020-04-13'
    })
  })
})
