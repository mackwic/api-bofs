
module.exports = {
  log: (msg) => {
    if (typeof global.it === 'function') {
      return;
    }

    /* eslint no-console: off */
    console.log(msg);
  },
};
