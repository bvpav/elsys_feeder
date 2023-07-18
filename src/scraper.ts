// @deno-types="npm:@types/jsdom"
import { JSDOM } from 'npm:jsdom@^20.0.3';

import config from './config.ts';

async function getDOM(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  return new JSDOM(html);
}

async function getArticleContent(url: string) {
  const dom = await getDOM(url);
  const { document } = dom.window;

  const article = document.querySelector('.single-text > .text');
  if (article === null) return 'error retreiving article ;-;';
  return article.innerHTML;
}

export async function getArticles(url: string) {
  const dom = await getDOM(url);
  const { document } = dom.window;

  const articleList = document.querySelectorAll(
    'ul.comments-box.news-view > li'
  );
  return Promise.all(
    [...articleList].map(async (e) => {
      // FIXME: add type assertions
      const title = e.querySelector('header > h3')!.textContent || '';
      const time = e.querySelector<HTMLTimeElement>('header > time')!.dateTime;
      const articleUrl =
        config.BASE_URL +
        e.querySelector<HTMLAnchorElement>('a.read-more')!.href;
      // const description = e.querySelector('p').textContent;
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
