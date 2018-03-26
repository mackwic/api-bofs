const { name, version, contributors } = require('../../package.json');

module.exports = {
  get: (req, res) => {
    const json = {
      name, contributors, version: `${version}+${process.env.CONTAINER_VERSION}`,
    };
    return res.send(json);
  },
};
