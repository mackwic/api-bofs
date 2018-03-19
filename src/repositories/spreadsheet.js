const GoogleSpreadsheet = require('google-spreadsheet');
const dateAdapter = require('../adapters/date');

function getBofsDocument(documentId, serviceCredentials) {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(documentId);
    doc.useServiceAccountAuth(serviceCredentials, (authError) => {
      if (authError) return reject(authError);
      return doc.getInfo((getInfoError, spreadsheets) => {
        if (getInfoError) return reject(getInfoError);
        return resolve(spreadsheets);
      });
    });
  });
}

function findNextBofDateCell(inscriptionWorksheet) {
  const DATE_CELL_POSITION = {
    'min-row': 3,
    'max-row': 3,
    'min-col': 1,
    'max-col': 1,
  };

  return new Promise((resolve, reject) => {
    inscriptionWorksheet.getCells(DATE_CELL_POSITION, (getCellsError, cells) => {
      if (getCellsError) return reject(getCellsError);
      return resolve(cells[0]);
    });
  });
}

function getNextBofDate(config) {
  return async () => {
    let doc;
    try {
      doc = await getBofsDocument(config.id, config.credentials);
    } catch (e) {
      return Promise.reject(e);
    }

    const INSCRIPTION_WORKSHEET_INDEX = 1;
    const inscriptionWorksheet = doc.worksheets[INSCRIPTION_WORKSHEET_INDEX];

    let cell;
    try {
      cell = await findNextBofDateCell(inscriptionWorksheet);
    } catch (e) {
      return Promise.reject(e);
    }

    const nextBofDate = dateAdapter.parseNextBofsDate(cell.value);

    return Promise.resolve(nextBofDate);
  };
}

module.exports = config => ({
  getNextBofDate: getNextBofDate(config),
});
