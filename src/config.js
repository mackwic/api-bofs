const Envie = require('envie');
const Joi = require('joi');

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
});

config.validate();

module.exports = config;
