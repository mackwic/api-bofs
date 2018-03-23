const app = require('../server');
const config = require('../src/config');
const Logger = require('../src/logger');

app.listen(config.get('PORT'), () => {
  Logger.log(`Listening on port ${config.get('PORT')}`);
});
