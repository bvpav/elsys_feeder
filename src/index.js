const express = require('express');

const config = require('./config');
const { createMixedFeed, createFeed } = require('./rss');

const app = express();

app.get('/', async (req, res) => {
  res.set('Content-Type', 'application/rss+xml');
  const feed = await createMixedFeed(req.url);
  return res.send(feed.xml());
});

for (const feedConfig of config.FEEDS) {
  app.get(`/${feedConfig.SLUG}`, async (req, res) => {
    res.set('Content-Type', 'application/rss+xml');
    const feed = await createFeed(feedConfig.SLUG, req.url);
    return res.send(feed.xml());
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`up @ http://localhost:${PORT}`));
