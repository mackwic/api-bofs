const Logger = require('./logger');
const RootController = require('./controllers/root');

const routes = {
    '/': { get: RootController.get },
}

function setupAllRoutesInApp(app, routes) {
    for (routePath of Object.keys(routes)) {
        for (routeMethod of Object.keys(routes[routePath])) {
            const callback = routes[routePath][routeMethod];
            Logger.log(`Setup route ${routeMethod.toUpperCase()} ${routePath}`)
            app[routeMethod](routePath, callback);
        }
    }
}

module.exports = {
    routes,
    setupAllRoutesInApp
};
