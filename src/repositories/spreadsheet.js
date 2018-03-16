const GoogleSpreadsheet = require('google-spreadsheet');
const moment = require('moment');

function getSpreadsheets(config) {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(config.id);
    doc.useServiceAccountAuth(config.credentials, (authError) => {
      if (authError) return reject(authError);
      return doc.getInfo((getInfoError, spreadsheets) => {
        if (getInfoError) return reject(getInfoError);
        return resolve(spreadsheets);
      });
    });
  });
}

function findCell(inscriptionWorksheet) {
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

function parseDate(rawFrenchDate) {
  moment.locale('fr');
  return moment(rawFrenchDate, 'DD MMMM YYYY').format('YYYY-MM-DD');
}

function getNextBofDate(config) {
  return async () => {
    let spreadsheets;
    try {
      spreadsheets = await getSpreadsheets(config);
    } catch (e) {
      return Promise.reject(e);
    }

    const INSCRIPTION_WORKSHEET_INDEX = 1;
    const inscriptionWorksheet = spreadsheets.worksheets[INSCRIPTION_WORKSHEET_INDEX];

    let cell;
    try {
      cell = await findCell(inscriptionWorksheet);
    } catch (e) {
      return Promise.reject(e);
    }

    const nextBofDate = parseDate(cell.value);

    return Promise.resolve(nextBofDate);
  };
}

module.exports = config => ({
  getNextBofDate: getNextBofDate(config),
});
