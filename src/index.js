const express = require('express');
const RSS = require('rss');

const { getArticles } = require('./scraper');
const config = require('./config');

const app = express();

app.get('/news', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const url = `${config.BASE_URL}/${config.NEWS_PATH}/`;

  const feed = new RSS({
    title: 'Новини',
    feed_url: req.url,
    site_url: url,
  });

  const articles = await getArticles(url);
  for (article of articles) {
    feed.item(article);
  }

  return res.send(feed.xml());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`up @ ${PORT}`));
