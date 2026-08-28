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
  if (brand.name === '微风') {
    astroCards += `
      <a href="/jichang/weifeng/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/weifeng.png?v=2" width="36" height="36" alt="微风" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 微风机场：高性价比 IPLC 稳定专线</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🔥 独家测评</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度测试微风机场晚高峰抗压能力、流媒体与 ChatGPT 原生解锁情况。全 IPLC 专线配置，附最新价格表与选购建议。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '飞猫云') {
    astroCards += `
      <a href="/jichang/feimaoyun/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="飞猫云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 飞猫云机场：速度与流媒体解锁实测</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🚀 便宜机场推荐</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">全面评测这款主打低门槛月付的高性价比便宜梯子，从节点覆盖、真实连通率到 Netflix 解锁表现，给你最中肯的购买参考。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === 'firefly') {
    astroCards += `
      <a href="/jichang/firefly/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="Firefly" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] Firefly 机场：高端全专线优质机场首选</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">💎 优质高端机场</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度评测 Firefly 机场。全线采用 IPLC/IEPL 顶级专线，测速下载高达 167 MB/s，原生解锁 Netflix 与 ChatGPT，外贸与高端用户首选。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '无忧') {
    astroCards += `
      <a href="/jichang/wuyou/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="无忧" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 无忧机场：真专线还是普通中转？测速全解析</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🛡️ 稳定不过墙专线</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">全面实测无忧机场，验证其全 IPLC 内网专线架构。详解晚高峰抗压零丢包表现、流媒体解锁能力及各档套餐性价比分析。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '跨界') {
    astroCards += `
      <a href="/jichang/kuajie/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="跨界" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 跨界机场：完美适配 Clash 的顶级专线节点</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">💻 Clash专属推荐</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度评测跨界机场。专为 Clash Meta / Verge 优化的机场，自带完善的分流规则，全线 IPLC 专线，支持 Netflix 原生解锁与晚高峰 4K 极速秒开。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '灵猫') {
    astroCards += `
      <a href="/jichang/lingmao/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="灵猫" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 灵猫机场：老牌稳定 V2ray/VMess 专线首选</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🛡️ V2ray极致防封锁</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">万字深度评测灵猫机场。完美支持 V2rayN 与小火箭一键导入，采用全 IPLC 物理专线架构，轻松应对晚高峰 4K 测速与极高强度的敏感时期封锁。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '闪跃') {
    astroCards += `
      <a href="/jichang/shanyue/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="闪跃" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] 闪跃机场：小白新手零基础好用梯子推荐</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">😎 傻瓜式一键配置</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">闪跃机场好用吗？万字深度评测这款主打免折腾与高稳定性的机场。支持全平台一键导入配置，全节点 IPLC 专线，晚高峰 YouTube 4K 极速秒开。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === 'flybit') {
    astroCards += `
      <a href="/jichang/flybit/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="Flybit" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] Flybit 机场：无敌性价比与不限时按量计费包</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">💰 极致平民战神</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Flybit 机场性价比深度评测。低至月付 15 元起，更有永不过期的不限时传家宝套餐。晚高峰测速流畅，完美解锁 Netflix 与 ChatGPT，性价比天花板。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === 'xxyun') {
    astroCards += `
      <a href="/jichang/xxyun/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="XXYUN" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[深度测评] XXYUN 机场：月付 9.99 的大带宽平价神盘</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">⚡ BGP高速平价</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">万字硬核测评 XXYUN 机场。主打 9.99元低门槛、BGP+中转架构的高带宽便宜机场。不限制设备数，完美原生解锁 Netflix 与 ChatGPT。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '大哥云') {
    astroCards += `
      <a href="/jichang/dageyun/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="大哥云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[追踪报告] 大哥云：主打 Trojan 协议的千兆大带宽老牌机场</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🛡️ 纯粹 Trojan</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">长达半年的深度跟踪测评大哥云(Dageyun)。全面拆解其 Trojan 协议节点的晚高峰抗压能力、1000Mbps 千兆测速数据以及内置的 9折隐藏优惠券。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '二猫云') {
    astroCards += `
      <a href="/jichang/ermaoyun/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="二猫云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[架构审计] 二猫云：2.5Gbps IEPL专线与猫系套餐测评</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">🐾 IEPL 物理专线</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度审计二猫云全 IEPL 专线网络架构。全网独家解密其 2.5Gbps 峰值口径下的白猫、橘猫套餐性价比，以及极度硬核的 99元不限时传家宝套餐的底层逻辑。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '飞V' || brand.name === 'FlyV') {
    astroCards += `
      <a href="/jichang/flyv/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="飞V" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[性能怪兽] 飞V (FlyV)：纯独享原生 IP 与超大流量池基建</h3>
          </div>
          <div style="background: #eff4ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">💎 独享原生 IP</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度剖析飞V (FlyV) 机场。全节点物理专线，提供高达 1.8TB 甚至纯独享 500GB 黄金原生IP专线的骨灰级极客机场，不限设备数，晚高峰 8K 极速秒开。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '光年梯' || brand.name === '光年') {
    astroCards += `
      <a href="/jichang/guangnian/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="光年梯" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[性价比之王] 光年梯：全线 IPLC 专线与 2.5Gbps 超大带宽</h3>
          </div>
          <div style="background: #eef2ff; color: #4f46e5; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #c7d2fe; white-space: nowrap; margin-left: 12px;">🏆 IPLC 性价比</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度测评光年梯 (Lightyear) 机场。每月 18元起享纯正 IPLC 专线，自带云端去广告规则，更有 680元独享私人原生 IP 专线，完美赋能跨境电商与 TikTok 矩阵运营。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '光速云') {
    astroCards += `
      <a href="/jichang/guangsu/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="光速云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[极致速度] 光速云：全球 IPLC 物理专线与不限时 1TB 传家宝</h3>
          </div>
          <div style="background: #f0fdfa; color: #0d9488; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #99f6e4; white-space: nowrap; margin-left: 12px;">⚡ IPLC 极速</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">深度解构光速云 (Guangsu Cloud) 机场。月付 23元起享 2.5Gbps 全球 IPLC 专线，提供永久不限时 1TB 流量包。不限设备并发，完美解锁 Netflix 4K 与 ChatGPT。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '极连云') {
    astroCards += `
      <a href="/jichang/jilian/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="极连云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[Clash 首选] 极连云：全线 IPLC 专线与 2.5Gbps 高速节点</h3>
          </div>
          <div style="background: #f5f3ff; color: #7c3aed; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #c4b5fd; white-space: nowrap; margin-left: 12px;">🔥 完美适配 Clash</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">寻找稳定 Clash 节点推荐的必看评测。月付 18元起，全 IPLC 专线，不限设备并发，完美解锁 Netflix 与 ChatGPT，支持 Clash Verge Rev 一键订阅。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '可信云') {
    astroCards += `
      <a href="/jichang/kexin/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="可信云" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[科学上网首选] 可信云：全 IEPL 专线与一键无脑订阅</h3>
          </div>
          <div style="background: #ecfdf5; color: #059669; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #a7f3d0; white-space: nowrap; margin-left: 12px;">🌟 新手小白极度友好</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">可信云机场怎么样？2026年新手首选的 Clash 科学上网机场推荐。全线 IEPL 专线，不限设备，完美解锁流媒体与 AI，月付 15元起，支持长周期狂暴折扣。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '快狸') {
    astroCards += `
      <a href="/jichang/kuaili/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="快狸" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[小火箭首选] 快狸：全 IEPL 专线完美适配 Shadowrocket</h3>
          </div>
          <div style="background: #fff7ed; color: #ea580c; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #fed7aa; white-space: nowrap; margin-left: 12px;">🍎 专为 iOS 优化</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">寻找稳定 Shadowrocket 机场推荐的必看评测。全线 IEPL 专线 2.5Gbps 满配，完美解锁 TikTok 与 Netflix。支持苹果小火箭扫码订阅，月付 15元起。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else if (brand.name === '浪网') {
    astroCards += `
      <a href="/jichang/langwang/" class="review-card-special" style="display: block; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; text-decoration: none; transition: all 0.3s ease; grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="/images/brands/${brand.imgName}.png?v=2" width="36" height="36" alt="浪网" style="border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onerror="this.style.display='none'">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin: 0; font-weight: 700; line-height: 1.3;">[商务级小火箭] 浪网：专线定制与不限时流量包</h3>
          </div>
          <div style="background: #eff6ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; white-space: nowrap; margin-left: 12px;">👔 跨国商务首选</div>
        </div>
        <p style="font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">浪网机场怎么样？主打 BGP 多线融合与专线级出口。极度罕见提供 640元/月定制独享专线与永不限时大流量包，完美适配小火箭，高端外贸/TikTok 直播用户必看。</p>
        <span style="font-size: 0.85rem; font-weight: 700; color: #2563eb; display: flex; align-items: center; gap: 4px;">立即阅读完整报告 <span>→</span></span>
      </a>`;
  } else {
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
