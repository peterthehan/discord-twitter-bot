const config = require("../config");
const Twitter = require("twitter-lite");
const TwitterBot = require("../classes/TwitterBot");

module.exports = async (client) => {
  console.log("twitter: ready");

  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
  config
    .map((rule) => new TwitterBot(twitterClient, rule))
    .forEach(async (bot) => {
      await bot.loadWebhook(client);
      setInterval(async () => {
        const tweets = await bot.fetchNewTweets();
        tweets.forEach((tweet) => bot.sendTweet(tweet));
      }, bot.getDelay());
    });
};
