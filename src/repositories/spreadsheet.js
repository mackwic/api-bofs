const GoogleSpreadsheet = require('google-spreadsheet');
const moment = require('moment');

function parseDate(rawFrenchDate) {
  moment.locale('fr');
  return moment(rawFrenchDate, 'DD MMMM YYYY').format('YYYY-MM-DD');
}

function getNextBofDate(spreadsheetConfig) {
  const INSCRIPTION_WORKSHEET_INDEX = 1;

  return () => new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(spreadsheetConfig.id);
    doc.useServiceAccountAuth(spreadsheetConfig.credentials, (authError) => {
      if (authError) reject(authError);
      doc.getInfo((getInfoError, spreadsheets) => {
        if (getInfoError) reject(getInfoError);

        const dateCellPosition = {
          'min-row': 3,
          'max-row': 3,
          'min-col': 1,
          'max-col': 1,
        };

        const inscriptionWorksheet = spreadsheets.worksheets[INSCRIPTION_WORKSHEET_INDEX];

        inscriptionWorksheet.getCells(dateCellPosition, (getCellsError, cells) => {
          if (getCellsError) return reject(getCellsError);
          const nextBofDate = parseDate(cells[0].value);
          return resolve(nextBofDate);
        });
      });
    });
  });
}

module.exports = config => ({
  getNextBofDate: getNextBofDate(config),
});
