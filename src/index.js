const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

// TODO: maybe move somewhere else
const BASE_URL = 'https://elsys-bg.org';
const NEWS_PATH = 'novini-i-sybitija/novini';

async function getDOM(url) {
  const response = await fetch(url);
  const html = await response.text();
  return new JSDOM(html);
}

async function getPostContent(url) {
  const dom = await getDOM(url);
  const { document } = dom.window;

  const article = document.querySelector('.single-text > .text');
  if (article === null) return 'error retreiving article ;-;';
  return article.innerHTML;
}

async function getPosts(url) {
  const posts = [];
  const dom = await getDOM(url);
  const { document } = dom.window;

  const newsList = document.querySelectorAll('ul.comments-box.news-view > li');
  for (const e of newsList) {
    const title = e.querySelector('header > h3').textContent;
    const time = e.querySelector('header > time').dateTime;
    const postUrl = BASE_URL + e.querySelector('a.read-more').href;
    const description = e.querySelector('p').textContent;
    const content = await getPostContent(postUrl);

    posts.push({
      title,
      time,
      url: postUrl,
      description,
      content,
    });
  }

  console.log(posts);

  return posts;
}

getPosts(`${BASE_URL}/${NEWS_PATH}`);
