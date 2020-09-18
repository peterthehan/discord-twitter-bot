const { twitterKeys, rules } = require("../config");
const Twitter = require("twitter-lite");
const TwitterBot = require("../classes/TwitterBot");

module.exports = async (client) => {
  console.log("twitter: ready");

  const twitterClient = new Twitter({ ...twitterKeys });
  rules
    .map((rule) => new TwitterBot(twitterClient, rule))
    .forEach(async (bot) => {
      await bot.loadWebhook(client);
      setInterval(async () => {
        const tweets = await bot.fetchNewTweets();
        bot.sendTweets(tweets);
      }, bot.getDelay());
    });
};
