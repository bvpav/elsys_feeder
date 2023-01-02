// @deno-types="npm:@types/rss"
import RSS from 'npm:rss';
import config from './config.ts';
import { getArticles } from './scraper.ts';

export async function createMixedFeed(feedUrl: string) {
  const feed = new RSS({
    title: config.HOME_TITLE,
    feed_url: feedUrl,
    site_url: config.BASE_URL,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: config.FEEDS.map((feed) => feed.CATEGORY),
  });

  const pathArticles = await Promise.all(
    config.FEEDS.map(async (feedConfig) => {
      const url = `${config.BASE_URL}/${feedConfig.PATH}/`;
      const pathArticles = await getArticles(url);
      return pathArticles.map((pathArticle) => ({
        ...pathArticle,
        categories: [feedConfig.CATEGORY],
      }));
    })
  );
  const articles = pathArticles.reduce(
    (articles, moreArticles) => [...articles, ...moreArticles],
    []
  );
  articles.sort((a1, a2) => a2.date.getTime() - a1.date.getTime());

  articles.forEach((article) => feed.item(article));

  return feed;
}

const feedConfigs = new Map(config.FEEDS.map((feed) => [feed.SLUG, feed]));

type Slug = typeof config.FEEDS[number]['SLUG'];

export async function createFeed(slug: Slug, feedUrl: string) {
  const feedConfig = feedConfigs.get(slug)!;
  const url = `${config.BASE_URL}/${feedConfig.PATH}/`;

  const feed = new RSS({
    title: feedConfig.TITLE,
    feed_url: feedUrl,
    site_url: url,
    language: config.FEED_LANG,
    copyright: config.FEED_COPYRIGHT,
    categories: [feedConfig.CATEGORY],
  });

  (await getArticles(url))
    .map((article) => ({
      ...article,
      categories: [feedConfig.CATEGORY],
    }))
    .forEach((article) => feed.item(article));

  return feed;
}
