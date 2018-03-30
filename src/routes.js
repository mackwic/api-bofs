const logger = require('./logger')
const rootController = require('./controllers/root')
const bofsController = require('./controllers/bofs')

const routes = {
  '/': { get: rootController.get },
  '/bofs/next': { get: bofsController.getNext }
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
