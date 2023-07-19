import config from './config';
import { load } from 'cheerio';

async function getDOM(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  return load(html, {
    decodeEntities: false,
  });
}

async function getArticleContent(url: string) {
  const $ = await getDOM(url);
  const article = $('.single-text > .text').html();
  if (article === null) return 'error retrieving article ;-;';
  return article;
}

export async function getArticles(url: string) {
  const $ = await getDOM(url);
  const articleList = $('ul.comments-box.news-view > li');
  return Promise.all(
    articleList.toArray().map(async (e) => {
      // FIXME: add type assertions
      const title = $('header > h3', e).text();
      const time = $('header > time', e).attr('datetime')!;
      const articleUrl = config.BASE_URL + $('a.read-more', e).attr('href')!;
      const content = await getArticleContent(articleUrl);

      return {
        title,
        date: new Date(time),
        url: articleUrl,
        description: content,
      };
    })
  );
}
