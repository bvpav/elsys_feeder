import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { Router } from 'https://deno.land/x/tinyrouter@1.1.0/mod.ts';

import config from './config.ts';
import { createMixedFeed, createFeed } from './rss.ts';

const router = new Router();

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

const PORT = Deno.env.get('PORT') || '5000';
serve((req) => router.handler(req), { port: Number(PORT) });
