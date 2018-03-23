const { name, version, contributors } = require('../../package.json');

module.exports = {
  get: (req, res) => {
    const json = {
      name, version, contributors,
    };
    return res.send(json);
  },
};
