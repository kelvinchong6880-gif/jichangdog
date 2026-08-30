import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const commit = process.env.CF_PAGES_COMMIT_SHA
  || process.env.GITHUB_SHA
  || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();

writeFileSync(join(root, 'public', 'deployment-version.txt'), `${commit}\n`, 'utf8');
console.log(`Deployment version: ${commit}`);
