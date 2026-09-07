import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src');

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (fullPath.endsWith('.astro') || fullPath.endsWith('.ts') || fullPath.endsWith('.md')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  
  return arrayOfFiles;
}

const files = getAllFiles(SRC_DIR);

let modifiedFilesCount = 0;
let totalReplaces = 0;

const replacements = [
  { regex: /唯一授权/g, replacement: '官方注册链接' },
  { regex: /防伪通道/g, replacement: '官网直达链接' },
  { regex: /防伪必填/g, replacement: '结账必填' },
  { regex: /防伪(提取|认证|追踪|验证)?码/g, replacement: '专属验证码' },
  { regex: /防伪/g, replacement: '安全' },
  { regex: /(性能|极客)核武/g, replacement: '高性能方案' },
  { regex: /核武/g, replacement: '核心方案' },
  { regex: /黑科技/g, replacement: '核心技术' },
  { regex: /强烈推荐/g, replacement: '推荐方案' },
  { regex: /内幕/g, replacement: '详情信息' }
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasModified = false;
  
  replacements.forEach(({ regex, replacement }) => {
    const matches = content.match(regex);
    if (matches) {
      totalReplaces += matches.length;
      content = content.replace(regex, replacement);
      hasModified = true;
    }
  });
  
  if (hasModified) {
    fs.writeFileSync(file, content, 'utf-8');
    modifiedFilesCount++;
    console.log(`Updated: ${path.relative(SRC_DIR, file)}`);
  }
});

console.log(`\n🎉 Process complete! Modified ${modifiedFilesCount} files and made ${totalReplaces} replacements.`);
