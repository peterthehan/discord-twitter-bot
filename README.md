# Discord Twitter Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that forwards Tweets into your Discord server.

> Take note that this bot uses the search API and not the streaming API. This means that the results are not exhaustive nor are they instantaneous. However, the trade-off here is that the nature of searching allows for the use of powerful search operators to filter the results to your needs.

## Twitter Developer Account Setup

Apply for a [Twitter developer account](https://developer.twitter.com/en/apply-for-access) in order to access their standard APIs. You will receive the necessary keys and secrets once your account is approved.

> Take note of the keys and secrets provided. You will need these in the next section.

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Webhooks` permission!

2. Open the `.env` file and add your Twitter keys and secrets:

   ```
   TWITTER_CONSUMER_KEY=PLACEHOLDER
   TWITTER_CONSUMER_SECRET=PLACEHOLDER
   TWITTER_ACCESS_TOKEN_KEY=PLACEHOLDER
   TWITTER_ACCESS_TOKEN_SECRET=PLACEHOLDER
   ```

3. Download this widget and move the `src-discord-twitter-bot` folder into the [src/widgets/](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder created in step 1.

   > npm i -s twitter-lite@^0.14.0 to install this widget's dependencies.

4. Open [config.json](https://github.com/peterthehan/discord-twitter-bot/blob/master/src-discord-twitter-bot/config.json) to configure your own settings:

   ```json
   [
     {
       "channelId": "649020657522180128",
       "delay": 3600000,
       "randomDelay": 300000,
       "embed": true,
       "spoiler": false,
       "parameters": {
         "q": "from:@NoContextWeeb exclude:replies exclude:retweets",
         "result_type": "recent",
         "count": 1
       }
     }
   ]
   ```

   Add as many rules as you want to configure for other channels/servers.

   - `channelId` is the text channel you want tweets to be forwarded to.
   - `delay` (in milliseconds) is the interval the bot will run the Twitter search query to check for new results. `delay` defaults to 15 minutes if not provided.
     - Take note of search's [rate limit](https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits) of `450 requests per 15 minutes` when configuring your rules.
   - `randomDelay` (in milliseconds) is the random interval added to the `delay`. `randomDelay` defaults to 0 minutes if not provided.
   - `embed` is a boolean that determines whether the tweet's embed is sent (`true`) or not (`false`).
   - `spoiler` is a boolean that determines whether the tweet is spoiler tagged (`true`) or not (`false`).
   - `parameters` are provided to the Twitter search endpoint. Reference can be found here: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
     - The `q` (query) parameter allows for powerful search operators. Reference can be found here: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/guides/standard-operators

5. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
