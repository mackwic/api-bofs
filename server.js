const express = require('express')
const routes = require('./src/routes')

const app = express()
routes.setupAllRoutesInApp(app, routes.routes)

module.exports = app
