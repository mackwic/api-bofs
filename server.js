const express = require('express');
const pkg = require('./package.json');

const app = express();
const config = {
  PORT: (process.env.PORT || 3000),
};

app.get('/', (req, res) => {
  const json = { name: pkg.name, version: pkg.version, author: pkg.author };
  res.send(json);
});

if (require.main === module) {
  // the file is run directly, run the server
  console.log(`Listening on port ${config.PORT}`);
  app.listen(config.PORT);
}

module.exports = {
  app, config,
};
