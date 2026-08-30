// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import sitemapLastmod from './src/data/sitemap-lastmod.json' with { type: 'json' };

/** @type {Record<string, string>} */
const routeLastmod = sitemapLastmod;

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangdog.com',
  integrations: [
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = routeLastmod[pathname];

        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ]
});
