
const express = require('express');

const package = require('./package.json');

const app = express();
const config = {
    PORT: (process.env.PORT || 3000)
};

app.get('/', (req, res) => {
    const json = { name: package.name, version: package.version, author: package.author };
    res.send(json);
});

if (require.main === module) {
    // the file is run directly, run the server
    console.log(`Listing on port ${config.PORT}`);
    app.listen(config.PORT);
}

module.exports = {
    app, config
}
