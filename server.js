const express = require('express');
const routes = require('./src/routes');

if (!process.env.SPREADSHEET_ID) {
  throw new Error("Environment variable 'SPREADSHEET_ID' must be provided");
}

if (!process.env.CLIENT_EMAIL) {
  throw new Error("Environment variable 'CLIENT_EMAIL' must be provided");
}

if (!process.env.PRIVATE_KEY) {
  throw new Error("Environment variable 'PRIVATE_KEY' must be provided");
}

const app = express();
routes.setupAllRoutesInApp(app, routes.routes);

module.exports = app;
