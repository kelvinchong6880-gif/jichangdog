const fs = require('fs');
const astro = fs.readFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\src\\\\pages\\\\jichang\\\\index.astro', 'utf-8');
const match = astro.match(/<div class="featured-grid">([\s\S]*?)<\/div>\s*<\/section>/);
if (match) {
  let gridContent = match[1];
  const articles = gridContent.split('</article>').filter(a => a.trim().length > 0).slice(0, 6);
  
  // Need to insert the badges for the top 6 since the generator doesn't have them
  const badges = [
    '<span class="badge badge-primary">优先推荐</span>',
    '<span class="badge">重点关注</span>',
    '<span class="badge">重点关注</span>',
    '<span class="badge">性价比首选</span>',
    '<span class="badge">高端稳定</span>',
    '<span class="badge">极速网络</span>'
  ];
  
  let newGrid = '    <div class="featured-grid">\n';
  for(let i=0; i<6; i++){
    let art = articles[i];
    art = art.replace('</div>\n        <h3>', badges[i] + '\n        </div>\n        <h3>');
    newGrid += art + '</article>';
  }
  newGrid += '\n    </div>';
  fs.writeFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\top6.html', newGrid);
}
