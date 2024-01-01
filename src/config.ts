export default {
  BASE_URL: 'https://elsys-bg.org',

  FEED_LANG: 'bg',
  FEED_COPYRIGHT:
    '(C) Copyright 2024. Технологично училище Електронни системи към Технически Университет - София',

  HOME_TITLE: 'ТУЕС',

  FEEDS: [
    {
      SLUG: 'news',
      PATH: 'novini-i-sybitija/novini',
      TITLE: 'Новини',
      CATEGORY: 'Новини',
    },
    {
      SLUG: 'blog',
      PATH: 'blog',
      TITLE: 'Блог',
      CATEGORY: 'Блог',
    },
    {
      SLUG: 'excursions',
      PATH: 'uchenicheski-jivot/ekskurzii',
      TITLE: 'Екскурзии',
      CATEGORY: 'Екскурзии',
    },
    {
      SLUG: 'inspiration_talks',
      PATH: 'uchenicheski-jivot/inspiration-talks',
      TITLE: 'TUES Inspiration Talks & Workshops',
      CATEGORY: 'Inspiration Talks',
    },
  ],
} as const;
