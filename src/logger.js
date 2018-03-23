
const config = require('./config');

module.exports = {
  log(msg) {
    if (config.get('NODE_ENV') === 'test') {
      return;
    }

    /* eslint no-console: off */
    console.log(msg);
  },
};
