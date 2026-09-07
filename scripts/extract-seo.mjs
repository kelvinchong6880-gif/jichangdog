import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) results = results.concat(getFiles(file));
    else if (file.endsWith('.astro')) results.push(file);
  }
  return results;
}

const files = getFiles('src/pages');
const data = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  let title = null;
  let description = null;
  
  // Match BaseLayout title="..."
  const titleMatch1 = content.match(/title=["'](.*?)["']/);
  // Match const title = "..."
  const titleMatch2 = content.match(/const\s+title\s*=\s*["'](.*?)["']/);
  
  if (titleMatch2) title = titleMatch2[1];
  else if (titleMatch1) title = titleMatch1[1];
  
  const descMatch1 = content.match(/description=["'](.*?)["']/);
  const descMatch2 = content.match(/const\s+description\s*=\s*["'](.*?)["']/);
  
  if (descMatch2) description = descMatch2[1];
  else if (descMatch1) description = descMatch1[1];
  
  if (title || description) {
    data.push({
      file: f,
      title: title || '',
      titleLength: title ? title.length : 0,
      description: description || '',
      descLength: description ? description.length : 0
    });
  }
});

fs.writeFileSync('scripts/seo-meta.json', JSON.stringify(data, null, 2));
console.log('Extracted ' + data.length + ' pages metadata');
