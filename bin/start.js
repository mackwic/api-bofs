const app = require('../server')
const config = require('../src/infrastructure/config')
const Logger = require('../src/infrastructure/logger')

app.listen(config.get('PORT'), () => {
  Logger.log(`Listening on port ${config.get('PORT')}`)
})
