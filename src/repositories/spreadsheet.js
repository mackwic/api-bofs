const GoogleSpreadsheet = require('google-spreadsheet');
const pify = require('pify');
const dateAdapter = require('../adapters/date');

function getBofsDocument(documentId, serviceCredentials) {
  const doc = new GoogleSpreadsheet(documentId);
  return pify(doc.useServiceAccountAuth)(serviceCredentials).then(() => pify(doc.getInfo)());
}

function findNextBofDateCell(inscriptionWorksheet) {
  const DATE_CELL_POSITION = {
    'min-row': 3,
    'max-row': 3,
    'min-col': 1,
    'max-col': 1,
  };

  return pify(inscriptionWorksheet.getCells)(DATE_CELL_POSITION).then(cells => cells[0]);
}

module.exports = function SpreadsheetRepository(documentId, clientEmail, privateKey) {
  const credentials = { client_email: clientEmail, private_key: privateKey };

  return {
    getNextBofDate() {
      return async () => {
        const doc = await getBofsDocument(documentId, credentials);

        const INSCRIPTION_WORKSHEET_INDEX = 1;
        const inscriptionWorksheet = doc.worksheets[INSCRIPTION_WORKSHEET_INDEX];
        const cell = await findNextBofDateCell(inscriptionWorksheet);

        const nextBofDate = dateAdapter.parseNextBofsDate(cell.value);

        return Promise.resolve(nextBofDate);
      };
    },
  };
};
