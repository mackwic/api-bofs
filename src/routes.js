const Logger = require('./logger');
const RootController = require('./controllers/root');

const routes = {
  '/': { get: RootController.get },
};

function setupAllRoutesInApp(app, routeObject) {
  for (routePath of Object.keys(routeObject)) {
    for (routeMethod of Object.keys(routeObject[routePath])) {
      const callback = routeObject[routePath][routeMethod];
      Logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`);
      app[routeMethod](routePath, callback);
    }
  }
}

module.exports = {
  routes,
  setupAllRoutesInApp,
};
