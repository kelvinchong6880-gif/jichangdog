import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.astro')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Fix .substr()
  if (content.includes('.substr(2, 9)')) {
    content = content.replace(/\.substr\(2, 9\)/g, '.substring(2, 11)');
    changed = true;
  }
  
  // 2. Fix JSON-LD is:inline
  if (content.includes('<script type="application/ld+json"')) {
    content = content.replace(/<script type="application\/ld\+json"/g, '<script type="application/ld+json" is:inline');
    changed = true;
  }
  
  // 3. Fix onerror unused variable by adding 'void event;'
  if (content.includes('onerror="this.src=')) {
    content = content.replace(/onerror="this\.src='(.*?)'"/g, 'onerror="this.src=\'$1\'; void event;"');
    changed = true;
  }
  if (content.includes('onerror="this.style.display=')) {
    content = content.replace(/onerror="this\.style\.display='none'"/g, 'onerror="this.style.display=\'none\'; void event;"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('All hints patched.');
