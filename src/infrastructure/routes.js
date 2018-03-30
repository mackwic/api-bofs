
// Infrastructure
const config = require('./config')
const logger = require('./logger')
const spreadsheetRepository = require('./repositories/spreadsheet')(
  config.get('DOCUMENT_ID'),
  config.get('DOCUMENT_CREDENTIALS_CLIENT_EMAIL'),
  config.get('DOCUMENT_CREDENTIALS_PRIVATE_KEY')
)
const dateAdapter = require('./adapters/date-from-spreadsheet-to-domain')
// Use cases
const applicationInformationUseCase = require('../use-cases/application-information')
const bofUseCase = require('../use-cases/bof-events')(dateAdapter, spreadsheetRepository)

const routes = {
  '/': { get: applicationInformationUseCase.getApplicationInformation },
  '/bof/next': { get: bofUseCase.getNext }
}

function setupAllRoutesInApp (app, routeObject) {
  Object.entries(routeObject).forEach(([routePath, methods]) => {
    Object.entries(methods).forEach(([routeMethod, controller]) => {
      logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`)
      app[routeMethod](routePath, controller)
    })
  })
}

module.exports = {
  routes,
  setupAllRoutesInApp
}
