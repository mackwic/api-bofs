const moment = require('moment');

module.exports = {
  parseNextBofsDate: (rawDate) => {
    moment.locale('fr');

    const momentDate = moment(rawDate, 'DD MMMM YYYY', true);
    if (!momentDate.isValid()) {
      throw new Error(`Unsupported date format: "${rawDate}", expect format "DD MMMM YYYY"`);
    }

    return momentDate.format('YYYY-MM-DD');
  },
};
