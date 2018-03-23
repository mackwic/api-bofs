const logger = require('./logger');
const rootController = require('./controllers/root');

const routes = {
  '/': { get: rootController.get },
};

function setupAllRoutesInApp(app, routeObject) {
  Object.entries(routeObject).forEach(([routePath, methods]) => {
    Object.entries(methods).forEach(([routeMethod, controller]) => {
      logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`);
      app[routeMethod](routePath, controller);
    });
  });
}

module.exports = {
  routes,
  setupAllRoutesInApp,
};
