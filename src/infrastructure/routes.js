
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
const bofEventsUseCase = require('../use-cases/bof-events')(dateAdapter, spreadsheetRepository)
const bofSlotUseCase = require('../../src/use-cases/bof-slots')(spreadsheetRepository)

const routes = {
  '/': { get: applicationInformationUseCase.getApplicationInformation },
  '/bof-events/next': { get: bofEventsUseCase.getNext },
  '/bof-events/next/tracks/:track/hours/:hour': { get: bofSlotUseCase.getForNextEventByTrackAndHour }
}

function handleErrorsInController (routePath, controller) {
  return async (req, res) => {
    try {
      await controller(req, res)
    } catch (error) {
      logger.error(`ERROR on route path ${routePath}:`)
      logger.error(error)
      res.status(500).send({
        error: {
          message: error.message,
          stacktrace: error.stack.split('\n')
        }
      })
    }
  }
}

function setupAllRoutesInApp (app, routeObject) {
  Object.entries(routeObject).forEach(([routePath, methods]) => {
    Object.entries(methods).forEach(async ([routeMethod, controller]) => {
      logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`)
      controller = handleErrorsInController(routePath, controller)
      app[routeMethod](routePath, controller)
    })
  })
}

module.exports = {
  handleErrorsInController,
  routes,
  setupAllRoutesInApp
}
