const config = require('../config');
const spreadsheetController = require('../repositories/spreadsheet')(config.document);

module.exports = {
  getNext: async (req, res) => {
    const nextBofDate = await spreadsheetController.getNextBofDate();
    res.send({ date: nextBofDate });
  },
};
