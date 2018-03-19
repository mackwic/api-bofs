const express = require('express');

const Logger = require('./src/logger');
const Routes = require('./src/routes');
const config = require('./src/config');

const app = express();

Routes.setupAllRoutesInApp(app, Routes.routes);

if (require.main === module) {
  // the file is run directly => run the server
  app.listen(config.port, () => {
    Logger.log(`Listening on port ${config.port}`);
  });
}

module.exports = {
  app, config, routes: Routes.routes,
};
