const express = require('express')
const morgan = require('morgan')
const routes = require('./src/infrastructure/routes')

const app = express()
app.use(morgan('dev'))
routes.setupAllRoutesInApp(app, routes.routes)

module.exports = app
