import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pagesRoot = join(root, 'src', 'pages');
const outputPath = join(root, 'src', 'data', 'sitemap-lastmod.json');

function collectAstroFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectAstroFiles(path);
    return extname(entry.name) === '.astro' ? [path] : [];
  });
}

function pageRoute(file) {
  const sourcePath = relative(pagesRoot, file).split(sep).join('/');
  const withoutExtension = sourcePath.slice(0, -'.astro'.length);
  const route = withoutExtension === 'index'
    ? '/'
    : withoutExtension.endsWith('/index')
      ? `/${withoutExtension.slice(0, -'/index'.length)}/`
      : `/${withoutExtension}/`;
  return route.replace(/\/+/g, '/');
}

function gitLastModified(file) {
  const repositoryPath = relative(root, file).split(sep).join('/');
  try {
    return execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', repositoryPath],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
  } catch {
    return '';
  }
}

const entries = collectAstroFiles(pagesRoot)
  .map((file) => {
    const gitDate = gitLastModified(file);
    if (!gitDate) {
      throw new Error(`No Git modification date found for ${relative(root, file)}`);
    }
    return [pageRoute(file), gitDate];
  })
  .sort(([routeA], [routeB]) => routeA.localeCompare(routeB));

const lastmodByRoute = Object.fromEntries(entries);
writeFileSync(outputPath, `${JSON.stringify(lastmodByRoute, null, 2)}\n`, 'utf8');
console.log(`Wrote ${entries.length} route dates to ${relative(root, outputPath)}.`);
