const pkg = require('../../package.json');

module.exports = {
  get: (req, res) => {
    const json = {
      name: pkg.name,
      version: pkg.version,
      author: pkg.author,
    };
    return res.send(json);
  },
};
