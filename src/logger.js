
const config = require('./config');

module.exports = {
  log: (msg) => {
    if (config.environment === 'test') {
      return;
    }

    /* eslint no-console: off */
    console.log(msg);
  },
};
