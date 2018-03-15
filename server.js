const express = require('express');

const Logger = require('./src/logger');
const Routes = require('./src/routes');

const app = express();
const config = {
  PORT: (process.env.PORT || 3000),
};

Routes.setupAllRoutesInApp(app, Routes.routes);

if (require.main === module) {
  // the file is run directly, run the server
  Logger.log(`Listing on port ${config.PORT}`);
  app.listen(config.PORT);
}

module.exports = {
  app, config, routes: Routes.routes,
};
