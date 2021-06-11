module.exports = class TwitterBot {
  constructor(twitterClient, rule) {
    this.twitterClient = twitterClient;
    this.rule = rule;
    this.datetimeThreshold = new Date();
    this.webhook = null;
  }

  async loadWebhook(client) {
    const channel = await client.channels.fetch(this.rule.channelId);
    const webhooks = await channel.fetchWebhooks();

    this.webhook = !webhooks.size
      ? channel.createWebhook(client.user.username)
      : webhooks.first();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getDelay() {
    const delay = this.rule.delay || 900000;
    const randomDelay = this.rule.randomDelay || 0;
    return delay + this.getRandomInt(0, randomDelay);
  }

  isValidTweet(status) {
    return (
      status &&
      status.created_at &&
      status.user &&
      status.user.screen_name &&
      status.id_str
    );
  }

  isNewTweet(status) {
    return new Date(status.created_at) > this.datetimeThreshold;
  }

  getTweet(status) {
    return `https://twitter.com/${status.user.screen_name}/status/${status.id_str}`;
  }

  async fetchNewTweets() {
    const response = await this.twitterClient.get(
      "search/tweets",
      this.rule.parameters
    );

    const tweets =
      response && response.statuses
        ? response.statuses
            .filter(this.isValidTweet)
            .filter((status) => this.isNewTweet(status))
            .map(this.getTweet)
        : [];
    console.log(
      `Fetched ${
        tweets.length
      } new tweet(s) after ${this.datetimeThreshold.toLocaleString()} with params: ${JSON.stringify(
        this.rule.parameters
      )}`
    );

    this.datetimeThreshold = new Date();

    return tweets;
  }

  sendTweet(tweet) {
    if (!this.rule.embed) {
      tweet = `<${tweet}>`;
    }

    if (this.rule.spoiler) {
      tweet = `||${tweet} ||`;
    }

    this.webhook.send(tweet);
    console.log(`Sending: ${tweet}`);
  }
};
