import fs from 'fs';
const astro = fs.readFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\src\\\\pages\\\\index.astro', 'utf-8');
const top6 = fs.readFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\top6.html', 'utf-8');
const newAstro = astro.replace(/<div class="featured-grid">[\s\S]*?<\/div>\s*<\/section>/, top6 + '\n  </section>');
fs.writeFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\src\\\\pages\\\\index.astro', newAstro);
console.log('Successfully updated index.astro');
