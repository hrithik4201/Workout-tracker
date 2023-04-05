const { Configuration, OpenAIApi } = require('openai');
/* OPEN AI CONFIGURATION */
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
module.exports = openai;
