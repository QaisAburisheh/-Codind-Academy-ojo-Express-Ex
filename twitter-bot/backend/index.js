const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient, twitterBearer } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let count = 0;

app.post("/", async (req, res) => {
  const tweetContent = req.body;
  console.log(tweetContent);
  const content = tweetContent.Tweet;
  const timer = tweetContent.Time;

  const tweet = async () => {
    count++;
    try {
      await twitterClient.v2.tweet(`${content} ${count}`);
    } catch (e) {
      console.log(e);
    }
  };
  const cronTweet = new CronJob(`${timer} * * * * *`, async () => {
    tweet();
  });

  cronTweet.start();
});

// app.get("/", (req, res) => {

// })

// const serach = async () => {

//     const whereTakenTweets = await twitterBearer.v2.search('#jordan');

//     for await (const tweet of whereTakenTweets) {
//         console.log(tweet);
//     }
// }

// serach()
