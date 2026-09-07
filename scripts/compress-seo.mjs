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
let modifiedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let hasModified = false;

  const replaceTitle = (_match, prefix, title, suffix) => {
    // Remove the mechanical truncation we did previously
    let newTitle = cleanTitle(title.replace(/\.\.\.$/, ''));
    if (newTitle !== title) hasModified = true;
    return prefix + newTitle + suffix;
  };

  const replaceDesc = (_match, prefix, desc, suffix) => {
    let newDesc = cleanDescription(desc.replace(/\.\.\.$/, ''));
    if (newDesc !== desc) hasModified = true;
    return prefix + newDesc + suffix;
  };

  content = content.replace(/(<BaseLayout\s+[^>]*?title=["'])(.*?)(["'])/gs, replaceTitle);
  content = content.replace(/(const\s+title\s*=\s*["'])(.*?)(["'];?)/g, replaceTitle);
  
  content = content.replace(/(<BaseLayout\s+[^>]*?description=["'])(.*?)(["'])/gs, replaceDesc);
  content = content.replace(/(const\s+description\s*=\s*["'])(.*?)(["'];?)/g, replaceDesc);

  if (hasModified) {
    fs.writeFileSync(f, content, 'utf8');
    modifiedCount++;
  }
});

function cleanTitle(t) {
  let r = t;
  
  r = r.replace(/180天真实追踪报告/g, '测评');
  r = r.replace(/物理测速专评/g, '测速');
  r = r.replace(/专线架构审计报告/g, '架构解析');
  r = r.replace(/深度评测/g, '评测');
  r = r.replace(/盲测/g, '评测');
  r = r.replace(/小白教程/g, '教程');
  r = r.replace(/图文教程/g, '教程');
  r = r.replace(/全指南/g, '指南');
  r = r.replace(/终极教程/g, '教程');
  r = r.replace(/必看/g, '');
  r = r.replace(/详细/g, '');
  r = r.replace(/全面/g, '');
  r = r.replace(/极客/g, '');
  r = r.replace(/老牌巨头/g, '');
  r = r.replace(/老牌机场/g, '机场');
  r = r.replace(/还能打吗？/g, '表现');
  r = r.replace(/还能战否？/g, '表现');
  r = r.replace(/死磕/g, '采用');
  r = r.replace(/魔法上网工具表现如何？/g, '');
  r = r.replace(/晚高峰速度、流媒体解锁与配置全解析/g, '配置解析');
  r = r.replace(/晚高峰速度与流媒体解锁.*?全解析/g, '测速');
  r = r.replace(/全IPLC专线、稳定解锁流媒体与AI/g, '全IPLC解锁流媒体');
  r = r.replace(/（拒绝.*?）/g, '');
  r = r.replace(/\(拒绝.*?\)/g, '');
  r = r.replace(/【.*?】/g, '');
  r = r.replace(/\[.*?\]/g, '');
  r = r.replace(/202[0-9]\s*/g, '');
  
  // Clean up punctuation
  r = r.replace(/：\s*：/g, '：');
  r = r.replace(/：\s*$/g, '');
  r = r.replace(/\s+/g, ' ').trim();
  
  // Restore truncated text logic: if we truncated it previously, we actually lost the original text in the file.
  // Wait, I overwrote the files! The original text is gone from the files.
  // I need to use `git checkout` to restore the original titles first before running this script!!
  
  return r;
}

function cleanDescription(d) {
  let r = d;
  
  r = r.replace(/近 4000 字本站追踪测评 /g, '');
  r = r.replace(/近 4000 字本站极客测速评测/g, '');
  r = r.replace(/近 4000 字本站测速评测 /g, '');
  r = r.replace(/本站发布对.*?长达半年的跟踪测评。/g, '');
  r = r.replace(/本站极客测速评测/g, '测速评测');
  r = r.replace(/审计.*?网络架构。市场上本站解密其/g, '解密');
  r = r.replace(/寻找 好用的魔法上网工具 与 稳定魔法上网工具 的高阶避封锁评测。/g, '');
  r = r.replace(/警惕假冒.*?！带你/g, '');
  r = r.replace(/打不开.*?、提示.*?？/g, '');
  r = r.replace(/抛弃软路由！/g, '');
  r = r.replace(/教你零门槛/g, '教你');
  r = r.replace(/附本站9折优惠码。/g, '');
  r = r.replace(/附专属官方购买通道与备用选购指南。/g, '');
  r = r.replace(/提供极具性价比的.*?实测/g, '实测');
  r = r.replace(/详细测试/g, '测试');
  r = r.replace(/（Netflix、Disney\+、ChatGPT 等）/g, '');
  r = r.replace(/提供 2026 最新测速图与晚高峰稳定性分析，助您在注册前全面了解其实际体验。/g, '');
  r = r.replace(/202[0-9] 最新教程/g, '教程');
  r = r.replace(/202[0-9]/g, '');
  
  r = r.replace(/\s+/g, ' ').trim();
  
  const sentences = r.split('。').filter(s => s.trim().length > 0);
  if (sentences.length > 2) {
    r = sentences.slice(0, 2).join('。') + '。';
  }
  
  return r;
}

console.log(`Processed and modified ${modifiedCount} files successfully.`);
