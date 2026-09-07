import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const compareFile = path.join(srcDir, 'pages/compare/index.astro');
const brandsFile = path.join(srcDir, 'pages/brands/index.astro');
const jichangFile = path.join(srcDir, 'pages/jichang/index.astro');
const speedtestFile = path.join(srcDir, 'pages/speed-test/index.astro');

const compareContent = fs.readFileSync(compareFile, 'utf-8');

const airports = [];

// Parse compare array
const objRegex = /{ name: '([^']+)', price: '([^']+)', type: '([^']+)', code: '([^']+)', link: '([^']+)', logo: '([^']+)' }/g;
let match;
while ((match = objRegex.exec(compareContent)) !== null) {
  let id = match[6].split('.')[0];
  if (id === 'feimao-yun') id = 'feimaoyun';
  if (id === 'ermao-yun') id = 'ermaoyun';
  if (id === 'weitu-yun') id = 'weituyun';
  if (id === '1flyun') id = 'yifanyun';
  if (id === 'yuzouyun') id = 'yuzhouyun';
  if (id === 'wangjikuaimche') id = 'wangjikuaiche';
  if (id === 'common-blue') {
    // common-blue is used by multiple. Let's use pinyin of name
    const n = match[1];
    if (n === '光年梯') id = 'guangnian';
    if (n === '浪网') id = 'langwang';
    if (n === '暮光') id = 'muguang';
    if (n === '全球云') id = 'quanqiu';
    if (n === 'u1s1') id = 'u1s1';
  }
  
  airports.push({
    id,
    name: match[1],
    price: match[2],
    type: match[3],
    code: match[4],
    link: match[5],
    logo: match[6].replace('.png', '.webp') // use webp
  });
}

// Parse brands
const brandsContent = fs.readFileSync(brandsFile, 'utf-8');
const brandCardRegex = /<article class="featured-card">([\s\S]*?)<\/article>/g;
let brandMatch;
while ((brandMatch = brandCardRegex.exec(brandsContent)) !== null) {
  const card = brandMatch[1];
  const nameMatch = card.match(/<h3>([^<]+)<\/h3>/);
  if (!nameMatch) continue;
  let name = nameMatch[1].trim();
  
  // normalize names
  if (name.toLowerCase() === 'sogo云') name = 'sogo 云';
  
  const tagMatch = card.match(/<span class="badge[^"]*">([\s\S]*?)<\/span>/);
  const tag = tagMatch ? tagMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  const descMatch = card.match(/<p>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : '';
  
  const airport = airports.find(a => a.name.toLowerCase() === name.toLowerCase());
  if (airport) {
    airport.brandTag = tag;
    airport.brandDesc = desc;
  } else {
    console.warn('Brand not found:', name);
  }
}

// Parse jichang
const jichangContent = fs.readFileSync(jichangFile, 'utf-8');
const jichangCardRegex = /<a href="\/jichang\/([^\/]+)\/"[^>]*>([\s\S]*?)<\/a>/g;
let jiMatch;
while ((jiMatch = jichangCardRegex.exec(jichangContent)) !== null) {
  const id = jiMatch[1];
  const card = jiMatch[2];
  
  const titleMatch = card.match(/<h3>([^<]+)<\/h3>/);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  const tagMatch = card.match(/<div[^>]*>([^<]+)<\/div>\s*<\/div>\s*<p/);
  const tag = tagMatch ? tagMatch[1].trim() : '';
  
  const descMatch = card.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : '';
  
  const airport = airports.find(a => a.id === id || a.name.toLowerCase().includes(id.toLowerCase()));
  if (airport) {
    airport.reviewId = id;
    airport.reviewTitle = title;
    airport.reviewTag = tag;
    airport.reviewDesc = desc;
  }
}

// Parse speed-test
const speedContent = fs.readFileSync(speedtestFile, 'utf-8');
const speedCardRegex = /<a href="\/speed-test\/([^\/]+)\/"[^>]*>([\s\S]*?)<\/a>/g;
let spMatch;
while ((spMatch = speedCardRegex.exec(speedContent)) !== null) {
  const id = spMatch[1];
  const card = spMatch[2];
  
  const titleMatch = card.match(/<h3>([^<]+)<\/h3>/);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  const tagMatch = card.match(/<div class="card-tag"[^>]*>([^<]+)<\/div>/);
  const tag = tagMatch ? tagMatch[1].trim() : '';
  
  const descMatch = card.match(/<p>([\s\S]*?)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : '';
  
  const airport = airports.find(a => a.reviewId === id || a.id === id || a.name.toLowerCase().includes(id.toLowerCase()));
  if (airport) {
    airport.speedId = id;
    airport.speedTitle = title;
    airport.speedTag = tag;
    airport.speedDesc = desc;
  }
}

let tsOutput = `export interface Airport {
  id: string;
  name: string;
  price: string;
  type: string;
  code: string;
  link: string;
  logo: string;
  
  brandTag?: string;
  brandDesc?: string;
  
  reviewId?: string;
  reviewTitle?: string;
  reviewTag?: string;
  reviewDesc?: string;
  
  speedId?: string;
  speedTitle?: string;
  speedTag?: string;
  speedDesc?: string;
}

export const allAirports: Airport[] = ${JSON.stringify(airports, null, 2)};
`;

fs.writeFileSync(path.join(srcDir, 'data/airports.ts'), tsOutput, 'utf-8');
console.log('Successfully generated src/data/airports.ts with ' + airports.length + ' airports.');
