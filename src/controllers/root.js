const { name, version, author } = require('../../package.json');

module.exports = {
  get: (req, res) => {
    const json = {
      name, version, author,
    };
    return res.send(json);
  },
};
