const express = require('express');

const Config = require('./src/config');
const Logger = require('./src/logger');
const Routes = require('./src/routes');

const app = express();

Routes.setupAllRoutesInApp(app, Routes.routes);

if (require.main === module) {
  // the file is run directly => run the server
  Logger.log(`Listening on port ${Config.port}`);
  app.listen(Config.port);
}

module.exports = {
  app, config: Config, routes: Routes.routes,
};
