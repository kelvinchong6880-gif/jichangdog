import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = 'https://jichangdog.com';
const host = 'jichangdog.com';
const key = 'e33c47144a279867bb4e7b4e891d05ff';
const keyLocation = `${site}/${key}.txt`;
const endpoint = 'https://api.indexnow.org/IndexNow';
const routeDates = JSON.parse(readFileSync(`${root}/src/data/sitemap-lastmod.json`, 'utf8'));
const allRoutes = Object.keys(routeDates);
const args = new Map();

for (let index = 2; index < process.argv.length; index += 1) {
  const argument = process.argv[index];
  if (argument.startsWith('--')) {
    const next = process.argv[index + 1];
    args.set(argument, next && !next.startsWith('--') ? process.argv[++index] : true);
  }
}

const head = String(args.get('--head') || process.env.GITHUB_SHA || '').trim();
const base = String(args.get('--base') || '').trim();

function pageRoute(sourceFile) {
  const normalized = sourceFile.split(sep).join('/');
  if (!normalized.startsWith('src/pages/') || extname(normalized) !== '.astro') return undefined;
  const page = normalized.slice('src/pages/'.length, -'.astro'.length);
  if (page === 'index') return '/';
  return page.endsWith('/index') ? `/${page.slice(0, -'/index'.length)}/` : `/${page}/`;
}

function changedRoutes() {
  if (args.has('--all') || !base || /^0+$/.test(base)) return allRoutes;
  const output = execFileSync('git', ['diff', '--name-only', base, head || 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
  });
  const files = output.split(/\r?\n/).filter(Boolean);
  const sharedChange = files.some((file) => /^(astro\.config\.mjs|package\.json|src\/(components|layouts|styles)\/)/.test(file));
  if (sharedChange) return allRoutes;
  return [...new Set(files.map(pageRoute).filter(Boolean))];
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'jichangdog-indexnow/1.0' } });
  return response.ok ? (await response.text()).trim() : '';
}

async function waitForDeployment() {
  if (args.has('--no-wait')) return false;
  if (!head) throw new Error('A deployment commit is required. Pass --head or set GITHUB_SHA.');
  const versionUrl = `${site}/deployment-version.txt`;
  const initialVersion = await fetchText(versionUrl).catch(() => '');
  const initialDeployment = !initialVersion;
  const attempts = Number(process.env.INDEXNOW_WAIT_ATTEMPTS || 40);
  const delayMs = Number(process.env.INDEXNOW_WAIT_DELAY_MS || 15000);
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const deployedVersion = await fetchText(versionUrl).catch(() => '');
    if (deployedVersion === head) return initialDeployment;
    console.log(`Waiting for Cloudflare deployment (${attempt}/${attempts})...`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  console.log(`Cloudflare has not published commit ${head}; IndexNow submission skipped.`);
  return undefined;
}

if (args.has('--dry-run')) {
  const routes = changedRoutes();
  console.log(`Dry run: ${routes.length} URL(s) would be submitted.`);
  process.exit(0);
}

const firstDeployment = await waitForDeployment();
if (firstDeployment === undefined) process.exit(0);
const hostedKey = await fetchText(keyLocation);
if (hostedKey !== key) throw new Error(`IndexNow key verification failed at ${keyLocation}.`);

const routes = firstDeployment ? allRoutes : changedRoutes();
const urlList = routes.map((route) => new URL(route, site).href);
if (urlList.length === 0) {
  console.log('No public page URLs changed; IndexNow submission skipped.');
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
  throw new Error(`IndexNow returned HTTP ${response.status}: ${await response.text()}`);
}
console.log(`Submitted ${urlList.length} URL(s) to IndexNow (HTTP ${response.status}).`);
