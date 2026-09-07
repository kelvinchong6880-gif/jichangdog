import fs from 'fs';

const filePath = 'src/layouts/BaseLayout.astro';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Props
content = content.replace(
  /interface Props {\s*title: string;\s*description: string;\s*}/,
  `interface Props {
  title: string;
  description: string;
  image?: string;
}`
);

// 2. Update Astro.props and logic
content = content.replace(
  /const { title, description } = Astro\.props;\s*const canonicalURL = new URL\(Astro\.url\.pathname, Astro\.site \|\| Astro\.url\);\s*const siteUrl = \(Astro\.site \? Astro\.site\.toString\(\) : Astro\.url\.origin\)\.replace\(\/\\\/\\$\/, ''\);\s*const pathname = Astro\.url\.pathname;\s*const isHomePage = pathname === '\/';\s*const isArticle = \/\\^\\\\\\\/\(guide\|knowledge\|jichang\|speed-test\|recommend\)\\\/\[\^\\\/\]\+\\\/\$\/\.test\(pathname\);\s*const datePublished = \(pagePublished as Record<string, string>\)\[pathname\];\s*const dateModified = \(pageModified as Record<string, string>\)\[pathname\];/,
  `const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site || Astro.url);
const siteUrl = (Astro.site ? Astro.site.toString() : Astro.url.origin).replace(/\\/$/, '');
const pathname = Astro.url.pathname;
const isHomePage = pathname === '/';
const isArticle = /^\\/(guide|knowledge|jichang|speed-test|recommend)\\/[^/]+\\/$/.test(pathname);
const datePublished = (pagePublished as Record<string, string>)[pathname];
const dateModified = (pageModified as Record<string, string>)[pathname];

const segments = pathname.split('/').filter(Boolean);
let resolvedImage = image || '/images/home-cover.webp';
if (!image) {
  if (segments[0] === 'jichang' && segments[1]) {
    resolvedImage = \`/images/brands/\${segments[1]}.webp\`;
  } else if (segments[0] === 'speed-test' && segments[1]) {
    resolvedImage = \`/images/reviews/\${segments[1]}/speedtest.webp\`;
  } else if (segments[0] === 'knowledge' || segments[0] === 'guide' || segments[0] === 'recommend') {
    resolvedImage = '/images/article-cover.webp';
  }
}
const fullImageUrl = resolvedImage.startsWith('http') ? resolvedImage : \`\${siteUrl}\${resolvedImage}\`;`
);

// 3. Update Schema JSON
content = content.replace(
  /image: `\$\{siteUrl\}\/images\/logo\.png`,/,
  `image: fullImageUrl,`
);

// 4. Update meta tags
content = content.replace(
  /<meta property="og:image" content={`\$\{siteUrl\}\/images\/logo\.png`}>/,
  `<meta property="og:image" content={fullImageUrl}>`
);
content = content.replace(
  /<meta name="twitter:image" content={`\$\{siteUrl\}\/images\/logo\.png`}>/,
  `<meta name="twitter:image" content={fullImageUrl}>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('BaseLayout.astro updated successfully!');
