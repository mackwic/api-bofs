const express = require('express')
const routes = require('./src/infrastructure/routes')

const app = express()
routes.setupAllRoutesInApp(app, routes.routes)

module.exports = app
