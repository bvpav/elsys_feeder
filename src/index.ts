import { Router } from 'itty-router';

import config from './config';
import { createMixedFeed, createFeed } from './rss';

const router = Router();

router.get('/', async (req) => {
  const feed = await createMixedFeed(req.url);
  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
});

for (const feedConfig of config.FEEDS) {
  router.get(`/${feedConfig.SLUG}`, async (req) => {
    const feed = await createFeed(feedConfig.SLUG, req.url);
    return new Response(feed.xml(), {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    });
  });
}

router.all('*', () => Response.redirect(config.BASE_URL, 301));

export default {
  async fetch(req: Request) {
    return router.handle(req);
  },
};
