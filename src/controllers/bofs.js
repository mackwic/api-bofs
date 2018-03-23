const config = require('../config');
const spreadsheetController = require('../repositories/spreadsheet')(
  config.get('DOCUMENT_ID'),
  config.get('DOCUMENT_CREDENTIALS_CLIENT_EMAIL'),
  config.get('DOCUMENT_CREDENTIALS_PRIVATE_KEY'),
);

module.exports = {
  async getNext(req, res) {
    const nextBofDate = await spreadsheetController.getNextBofDate();
    res.send({ date: nextBofDate });
  },
};
