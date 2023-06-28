const { Configuration, OpenAIApi } = require('openai');
const config = require('./common/config');

/* OPEN AI CONFIGURATION */
const configuration = new Configuration({
  apiKey: config.gptKey,
});
const openai = new OpenAIApi(configuration);
module.exports = openai;
