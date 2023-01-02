const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const config = require('./config');

async function getDOM(url) {
  const response = await fetch(url);
  const html = await response.text();
  return new JSDOM(html);
}

async function getArticleContent(url) {
  const dom = await getDOM(url);
  const { document } = dom.window;

  const article = document.querySelector('.single-text > .text');
  if (article === null) return 'error retreiving article ;-;';
  return article.innerHTML;
}

async function getArticles(url) {
  const dom = await getDOM(url);
  const { document } = dom.window;

  const articleList = document.querySelectorAll(
    'ul.comments-box.news-view > li'
  );
  return Promise.all(
    [...articleList].map(async (e) => {
      const title = e.querySelector('header > h3').textContent;
      const time = e.querySelector('header > time').dateTime;
      const articleUrl = config.BASE_URL + e.querySelector('a.read-more').href;
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

module.exports = { getArticles };
