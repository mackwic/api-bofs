const Logger = require('./logger');
const RootController = require('./controllers/root');

const routes = {
  '/': { get: RootController.get },
};

function setupAllRoutesInApp(app, routeObject) {
  Object.keys(routeObject).forEach((routePath) => {
    Object.keys(routeObject[routePath]).forEach((routeMethod) => {
      const callback = routeObject[routePath][routeMethod];
      Logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`);
      app[routeMethod](routePath, callback);
    });
  });
}

module.exports = {
  routes,
  setupAllRoutesInApp,
};
