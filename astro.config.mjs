// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import sitemapLastmod from './src/data/sitemap-lastmod.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangdog.com',
  integrations: [
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = sitemapLastmod[pathname];

        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ]
});
