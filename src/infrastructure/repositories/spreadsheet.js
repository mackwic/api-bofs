const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

function getBofsDocument (documentId, serviceCredentials) {
  const doc = new GoogleSpreadsheet(documentId)
  return promisify(doc.useServiceAccountAuth)(serviceCredentials).then(() => promisify(doc.getInfo)())
}

function findNextBofDateCell (inscriptionWorksheet) {
  const DATE_CELL_POSITION = {
    'min-row': 3,
    'max-row': 3,
    'min-col': 1,
    'max-col': 1
  }

  return promisify(inscriptionWorksheet.getCells)(DATE_CELL_POSITION).then(cells => cells[0])
}

module.exports = function SpreadsheetRepository (documentId, clientEmail, privateKey) {
  const credentials = { client_email: clientEmail, private_key: privateKey }

  return {
    getNextBofEventDate () {
      return async () => {
        const doc = await getBofsDocument(documentId, credentials)

        const INSCRIPTION_WORKSHEET_INDEX = 1
        const inscriptionWorksheet = doc.worksheets[INSCRIPTION_WORKSHEET_INDEX]
        const rawData = await findNextBofDateCell(inscriptionWorksheet)

        return Promise.resolve(rawData.value)
      }
    }
  }
}
