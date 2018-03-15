
module.exports = {
    get: (req, res) => {
        const package = require('../../package.json');

        const json = {
            name: package.name,
            version: package.version,
            author: package.author,
        };
        return res.send(json);
   }
}
