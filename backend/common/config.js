const convict = require('convict');
const mongodbUri = require('mongodb-uri');

convict.addFormat({
  name: 'mongo-uri',
  validate: function (val) {
    let parsed = mongodbUri.parse(val);
    mongodbUri.format(parsed);
  },
  coerce: function (urlString) {
    if (urlString) {
      let parsed = mongodbUri.parse(urlString);
      urlString = mongodbUri.format(parsed);
    }
    return urlString;
  },
});

let config = convict({
  port: {
    doc: 'The PORT backend binds to',
    format: 'port',
    default: 5001,
    env: 'PORT',
    arg: 'port',
  },
  mongo: {
    host: {
      uri: {
        doc: 'host mongo',
        format: 'mongo-uri',
        default: 'mongodb://localhost:27017/workout-tracker',
        env: 'MONGO_URI',
        arg: 'MONGO_URI',
      },
    },
  },
  jwtSecret: {
    doc: 'JWT Secret',
    format: String,
    default: 'jwt-secret',
    env: 'JWT_SECRET',
    arg: 'jwt_secret',
  },
  gptKey: {
    doc: 'Chat GPT API Key',
    format: 'api-key',
    default: '',
    env: 'apiKey',
    arg: 'apiKey',
  },
});

config.validate({ allowed: 'strict' });
config = config.get();

module.exports = config;
