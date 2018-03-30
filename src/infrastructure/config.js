const Envie = require('envie')
const Joi = require('joi')

const config = Envie({
  NODE_ENV: Joi
    .string()
    .default('development')
    .only(['production', 'development', 'test'])
    .description('which mode the server run to. test disable certain features'),
  PORT: Joi
    .number()
    .default(3000)
    .description('the local PORT on which to listen'),
  DOCUMENT_ID: Joi
    .string()
    .describe('Google Sheet ID of octoconf document'),
  DOCUMENT_CREDENTIALS_CLIENT_EMAIL: Joi
    .string().email()
    .describe('Email of the Google Console account'),
  DOCUMENT_CREDENTIALS_PRIVATE_KEY: Joi
    .string().replace(/\\n/g, '\n')
    .description('Private Key of the Google Console account')
})

// FIXME don't work
// config.validate()

module.exports = config
