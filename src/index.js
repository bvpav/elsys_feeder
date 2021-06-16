const express = require('express');
const RSS = require('rss');

const { getArticles } = require('./scraper');
const config = require('./config');

const app = express();

app.get('/', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const articles = [];

  const feed = new RSS({
    title: config.HOME_TITLE,
    feed_url: req.url,
    site_url: config.BASE_URL,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [
      config.NEWS_CATEGORY,
      config.BLOG_CATEGORY,
      config.EXCURSIONS_CATEGORY,
      config.INSPO_CATEGORY,
    ],
  });

  const paths = [
    config.BLOG_PATH,
    config.NEWS_PATH,
    config.EXCURSIONS_PATH,
    config.INSPO_PATH,
  ];
  for (const path of paths) {
    const url = `${config.BASE_URL}/${path}/`;
    const pathArticles = await getArticles(url);
    // TODO: add the category here somehow
    articles.push(...pathArticles);
  }

  articles.sort((a1, a2) => a2.date - a1.date);

  for (article of articles) {
    feed.item({
      ...article,
      categories: [
        config.NEWS_CATEGORY,
        config.BLOG_CATEGORY,
        config.EXCURSIONS_CATEGORY,
        config.INSPO_CATEGORY,
      ],
    });
  }

  return res.send(feed.xml());
});

app.get('/news', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const url = `${config.BASE_URL}/${config.NEWS_PATH}/`;

  const feed = new RSS({
    title: config.NEWS_TITLE,
    feed_url: req.url,
    site_url: url,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [config.NEWS_CATEGORY],
  });

  const articles = await getArticles(url);
  for (article of articles) {
    feed.item({
      ...article,
      categories: [config.NEWS_CATEGORY],
    });
  }

  return res.send(feed.xml());
});

app.get('/blog', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const url = `${config.BASE_URL}/${config.BLOG_PATH}/`;

  const feed = new RSS({
    title: config.BLOG_TITLE,
    feed_url: req.url,
    site_url: url,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [config.BLOG_CATEGORY],
  });

  const articles = await getArticles(url);
  for (article of articles) {
    feed.item({
      ...article,
      categories: [config.BLOG_CATEGORY],
    });
  }

  return res.send(feed.xml());
});

app.get('/excursions', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const url = `${config.BASE_URL}/${config.EXCURSIONS_PATH}/`;

  const feed = new RSS({
    title: config.EXCURSIONS_TITLE,
    feed_url: req.url,
    site_url: url,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [config.EXCURSIONS_CATEGORY],
  });

  const articles = await getArticles(url);
  for (article of articles) {
    feed.item({
      ...article,
      categories: [config.EXCURSIONS_CATEGORY],
    });
  }

  return res.send(feed.xml());
});

app.get('/inspiration_talks', async (req, res) => {
  res.set('Content-Type', 'text/xml');

  const url = `${config.BASE_URL}/${config.INSPO_PATH}/`;

  const feed = new RSS({
    title: config.INSPO_TITLE,
    feed_url: req.url,
    site_url: url,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [config.INSPO_CATEGORY],
  });

  const articles = await getArticles(url);
  for (article of articles) {
    feed.item({
      ...article,
      categories: [config.INSPO_CATEGORY],
    });
  }

  return res.send(feed.xml());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`up @ http://localhost:${PORT}`));
