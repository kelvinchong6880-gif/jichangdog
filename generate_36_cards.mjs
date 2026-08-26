import fs from 'fs';
import path from 'path';

const dir = 'c:\\\\Users\\\\USER\\\\Desktop\\\\新博客文章资料\\\\品牌套餐价格';
const files = fs.readdirSync(dir);

const predefinedOrderNames = [
  '微风',
  '飞猫云',
  'firefly',
  '无忧',
  '跨界',
  '灵猫',
  '闪跃',
  'flybit',
  'xxyun'
];

const linksMapping = {
  '微风': 'https://edp01.breezenetaff.com/#/?code=hM8APccJ',
  'firefly': 'https://vip02.fireflyaff.com/#/?code=8nDg6OEY',
  '跨界': 'https://vip02.kuajieaff.com/#/?code=hh3QezsW',
  '闪跃': 'https://wep01.flashleapaff.com/#/?code=cs0ekCMG',
  '无忧': 'https://wep01.worryfreeaff.com/#/?code=s1kH64A8',
  '灵猫': 'https://edp01.civetaff.com/#/?code=CYg7QSJo',
  'flybit': 'https://1.flybit.network/#/register?code=Aga7bd1s',
  'xsus': 'https://xsus.cloud/register?code=QQh1M1i9',
  'xxyun': 'https://www.xx-yun.com/?code=pi9fB906',
  '大哥云': 'https://a03.dgy02.com/#/register?code=wojBN2a4',
  '网际快车': 'https://NGYHGO.快车.com',
  '山水云': 'https://ss2.byvvcsx.com/#/register?code=Rh44jFWe',
  '老猫云': 'https://222.22laomao.com/#/register?code=jcPU1grl',
  '气泡云': 'https://x1.qipaoyun.xyz/#/register?code=UtKCpyVa',
  '飞猫云': 'https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB',
  'sogo 云': 'https://wzjc.sogoyunaff.cc/#/?code=BC2BL855',
  '暮光': 'https://varnexa.twilightaff.com/#/?code=2ILQOoYB',
  '星岛梦': 'https://kfccbb.xingdaomeng.com/#/?code=0YcwWgSw',
  '唯兔云': 'https://fast.v2yunvipaff.com/#/?code=nbBJVFQP',
  '光速云': 'https://mdlky.gsyaff.com/#/?code=5PLKd4WN',
  'u1s1': 'https://pkdj7.vipaff.cc/#/?code=YUCKdFlR',
  '极连云': 'https://kdjhao.jlyvipaff.com/#/?code=3d87WSjS',
  '全球云': 'https://sswdh.gcvipaff.com/#/?code=SHjBKSgm',
  '光年梯': 'https://ggmq.gntaff.com/#/?code=hTN6UF4T',
  '一翻云': 'https://wzjc.1flyunaff.cc/#/?code=0tH3Mmch',
  '二猫云': 'https://wzjc.2maoyunaff.cc/#/?code=bvsFDmSt',
  '宇宙云': 'https://wzjc.yuzoucloud.cc/#/?code=IWowgER5',
  'edgenova': 'https://work.edgenovaaff.cc/#/?code=k7VCKPvN',
  '可信云': 'https://work.kosingaff.com/#/?code=k7T1sOyG',
  '速界': 'https://work.speedworldaff.cc/#/?code=wZYGdnTC',
  '快狸': 'https://work.kuailicloud.cc/#/?code=azB6yNBW',
  '飞V': 'https://varnexa.flyvaff.com/#/?code=XsiIuDgj',
  '梯子云': 'https://varnexa.ladderaff.com/#/?code=zUCoDtv6',
  '浪网': 'https://varnexa.wavenetaff.com/#/?code=9U2hOtDu',
  '灵动': 'https://varnexa.lingdongaff.com/#/?code=HDiWuF7L',
  '隐形人': 'https://varnexa.invisibleaff.com/#/?code=BtPRayAl'
};

const codeMapping = {
  '微风': 'hM8APccJ', 'firefly': '8nDg6OEY', '跨界': 'hh3QezsW', '闪跃': 'cs0ekCMG', 
  '无忧': 's1kH64A8', '灵猫': 'CYg7QSJo', 'flybit': 'Aga7bd1s', 'xsus': 'QQh1M1i9', 
  'xxyun': 'pi9fB906', '大哥云': 'wojBN2a4', '网际快车': '快车', '山水云': 'Rh44jFWe', 
  '老猫云': 'jcPU1grl', '气泡云': 'UtKCpyVa', '飞猫云': 'w5lO9fqB', 'sogo 云': 'BC2BL855', 
  '暮光': '2ILQOoYB', '星岛梦': '0YcwWgSw', '唯兔云': 'nbBJVFQP', '光速云': '5PLKd4WN', 
  'u1s1': 'YUCKdFlR', '极连云': '3d87WSjS', '全球云': 'SHjBKSgm', '光年梯': 'hTN6UF4T', 
  '一翻云': '0tH3Mmch', '二猫云': 'bvsFDmSt', '宇宙云': 'IWowgER5', 'edgenova': 'k7VCKPvN', 
  '可信云': 'k7T1sOyG', '速界': 'wZYGdnTC', '快狸': 'azB6yNBW', '飞V': 'XsiIuDgj', 
  '梯子云': 'zUCoDtv6', '浪网': '9U2hOtDu', '灵动': 'HDiWuF7L', '隐形人': 'BtPRayAl'
};

let brands = [];

for (const file of files) {
  let name = file.replace('套餐价格', '').replace('价格表', '').replace('.txt', '').trim();
  if (name === '唯图云') name = '唯兔云';
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  
  const regex = /(?:¥|￥)\s*([\d\.]+)(?:[\s\S]{0,20}?)(月|季|年|一次性)/g;
  let match;
  let minPrice = Infinity;
  let bestCycle = '';
  while ((match = regex.exec(content)) !== null) {
    const p = parseFloat(match[1]);
    if (p < minPrice) {
      minPrice = p;
      bestCycle = match[2];
    }
  }
  let formattedPrice = '¥--<small>/月付</small>';
  if (minPrice !== Infinity) {
     let cycleText = bestCycle;
     if (['月', '季', '年'].includes(bestCycle)) cycleText += '付';
     formattedPrice = '¥' + minPrice + '<small>/' + cycleText + '</small>';
  }
  
  let desc = '全IPLC专线，解锁流媒体与AI服务，稳定低延迟。';
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('详情：')) {
      desc = lines[i].replace('详情：', '').trim();
      if (!desc && i+1 < lines.length) desc = lines[i+1].trim();
      break;
    } else if (lines[i].startsWith('- ')) {
      desc = lines[i].replace('- ', '').trim();
      break;
    }
  }
  if (desc.length > 40) desc = desc.substring(0, 38) + '...';
  if (name === '微风') desc = '全IPLC专线，享受低延迟高速率，不限制设备同时接入，不限速。';
  if (name === '飞猫云') desc = '全IPLC专线网络最高2.5Gbps，原生IP解锁流媒体与AI，智能路由。';
  if (name === 'firefly') desc = 'IPLC专线网络，不限速，不限设备数，解锁Netflix、Disney+及ChatGPT。';
  if (name === '无忧') desc = '全IPLC专线，节点速率×1，稳定支持全球ChatGPT、Gemini等AI与4K观影。';
  if (name === '跨界') desc = 'IPLC高端线路不限速，解锁各大流媒体与AI，不限制设备登录数。';
  if (name === '灵猫') desc = '全IPLC专线，最高1000Mbps带宽，原生IP解锁流媒体，全天客服。';

  let lookupName = name;
  if (name.toLowerCase() === 'u1s1') lookupName = 'u1s1';
  let link = linksMapping[lookupName] || '#';
  if (link && !link.startsWith('http') && link !== '#') link = 'https://' + link;
  let code = codeMapping[lookupName] || '无需填写';

  let imgName = 'default';
  if (name === '微风') imgName = 'weifeng';
  if (name === '飞猫云') imgName = 'feimao-yun';
  if (name === 'firefly') imgName = 'firefly';
  if (name === '无忧') imgName = 'wuyou';
  if (name === '跨界') imgName = 'kuajie';
  if (name === '灵猫') imgName = 'lingmao';
  if (name === '闪跃') imgName = 'shanyue';
  if (name === '唯图云' || name === '唯兔云') imgName = 'weitu-yun';
  if (name === '一翻云') imgName = '1flyun';
  if (name === '二猫云') imgName = 'ermao-yun';
  if (name === '可信云') imgName = 'kexinyun';
  if (name === '快狸') imgName = 'kuaili';
  if (name === '飞V') imgName = 'flyv';
  if (name === '梯子云') imgName = 'tiziyun';
  if (name === '隐形人') imgName = 'yinxingren';
  if (name.toLowerCase() === 'flybit') imgName = 'flybit';
  if (name === '山水云') imgName = 'shanshuiyun';
  if (name === '星岛梦') imgName = 'xingdaomeng';
  if (name === '光速云') imgName = 'guangsuyun';
  if (name === '极连云') imgName = 'jilianyun';
  if (name === '速界') imgName = 'sujie';
  if (name === '灵动') imgName = 'lingdong';
  if (name.toLowerCase() === 'xxyun') imgName = 'xxyun';
  if (name === 'edgenova' || name === '边缘节点') imgName = 'edgenova';
  if (name.toLowerCase() === 'xsus') imgName = 'xsus';
  if (['u1s1', '暮光', '全球云', '光年梯', '浪网'].includes(name) || ['u1s1', '暮光', '全球云', '光年梯', '浪网'].includes(name.toLowerCase())) {
    imgName = 'common-blue';
  }
  if (name === '老猫云') imgName = 'laomaoyun';
  if (name === '大哥云') imgName = 'dageyun';
  if (name === '网际快车') imgName = 'wangjikuaimche';
  if (name === '气泡云') imgName = 'qipaoyun';
  if (name === 'sogo 云') imgName = 'sogoyun';
  if (name === '宇宙云') imgName = 'yuzouyun';
  
  brands.push({
    file, name, desc, formattedPrice, imgName, link, code
  });
}

brands.sort((a, b) => {
  let idxA = predefinedOrderNames.indexOf(a.name);
  if (idxA === -1) idxA = a.name === '网际快车' ? 1000 : 999;
  let idxB = predefinedOrderNames.indexOf(b.name);
  if (idxB === -1) idxB = b.name === '网际快车' ? 1000 : 999;
  if (idxA !== idxB) return idxA - idxB;
  return a.name.localeCompare(b.name);
});

let astroCards = '';
for (const brand of brands) {
  astroCards += `
      <article class="featured-card">
        <div class="brand-card-top">
          <img src="/images/brands/${brand.imgName}.png?v=2" width="48" height="48" alt="${brand.name}" class="brand-avatar-img large" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U0ZTlmMiIvPjwvc3ZnPg=='">
        </div>
        <h3>${brand.name}</h3>
        <p>${brand.desc}</p>
        <div class="price-promo-box">
          <div class="price-item">
            <span>最低价格</span>
            <strong>${brand.formattedPrice}</strong>
          </div>
          <div class="promo-item">
            <span>专属优惠码</span>
            <div class="promo-code-group">
              <code>${brand.code}</code>
              <button class="copy-code-btn" data-code="${brand.code}" title="点击一键复制">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="card-actions">
          <a class="button" style="width: 100%; justify-content: center;" href="${brand.link}" target="_blank">官网注册 <span>↗</span></a>
        </div>
      </article>`;
}

const astroPage = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="全部36家机场品牌推荐｜机场狗" 
  description="机场狗为您整理全部36家稳定机场和优质机场，包含最低价格、优惠码与详细评测信息。"
>
  <section class="page-shell home-section" style="padding-top: 120px;">
    <div class="section-heading">
      <div>
        <p class="eyebrow">完整收录</p>
        <h1 style="font-size: 2.5rem; margin: 0; background: linear-gradient(135deg, var(--blue) 0%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">36 品牌档案</h1>
      </div>
    </div>
    
    <div class="featured-grid">
${astroCards}
    </div>
  </section>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const code = btn.getAttribute('data-code');
          if(code && code !== '无需填写') {
            navigator.clipboard.writeText(code).then(() => {
              const originalHTML = btn.innerHTML;
              btn.classList.add('copied');
              btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
              setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalHTML;
              }, 2000);
            });
          }
        });
      });
    });
  </script>
</BaseLayout>
`;

fs.writeFileSync('c:\\\\Users\\\\USER\\\\Desktop\\\\jichangdog.com\\\\src\\\\pages\\\\jichang\\\\index.astro', astroPage);
console.log('Successfully generated jichang/index.astro with 36 brands, links, and copy buttons.');
