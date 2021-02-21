const express = require('express')
const morgan = require('morgan')
const routes = require('./src/infrastructure/routes')

const app = express()
app.use(morgan('dev'))
app.set('json spaces', 2)
routes.setupAllRoutesInApp(app, routes.routes)

module.exports = app
