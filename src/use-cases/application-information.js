const { name, version, contributors } = require('../../package.json')

module.exports = {
  getApplicationInformation: (req, res) => {
    const json = {
      name, contributors, version: `${version}+${process.env.CONTAINER_VERSION}`
    }
    return res.send(json)
  }
}
