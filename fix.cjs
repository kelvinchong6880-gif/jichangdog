const fs = require('fs');

let code = fs.readFileSync('generate_36_cards.mjs', 'utf8');

const startIndex = code.indexOf(`let astroCards = '';\nfor (const brand of brands) {`);
const endAstroPage = code.indexOf('const astroPage = `---');

if (startIndex !== -1 && endAstroPage !== -1) {
  const newLoop = `let astroCards = '';
for (const brand of brands) {
    astroCards += \`
      <article class="featured-card">
        <div class="brand-card-top">
          <img src="/images/brands/\${brand.imgName}.png?v=2" width="48" height="48" alt="\${brand.name}" class="brand-avatar-img large" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U0ZTlmMiIvPjwvc3ZnPg=='">
        </div>
        <h3>\${brand.name}</h3>
        <p>\${brand.desc}</p>
        <div class="price-promo-box">
          <div class="price-item">
            <span>最低价格</span>
            <strong>\${brand.formattedPrice}</strong>
          </div>
          <div class="promo-item">
            <span>专属优惠码</span>
            <div class="promo-code-group">
              <code>\${brand.code}</code>
              <button class="copy-code-btn" data-code="\${brand.code}" title="点击一键复制">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="card-actions">
          <a class="button" style="width: 100%; justify-content: center;" href="\${brand.link}" target="_blank">官网注册 <span>↗</span></a>
        </div>
      </article>\`;
}

`;
  
  const newCode = code.substring(0, startIndex) + newLoop + code.substring(endAstroPage);
  fs.writeFileSync('generate_36_cards.mjs', newCode);
  console.log('Fixed loop successfully');
} else {
  console.log('Could not find markers', { startIndex, endAstroPage });
}
