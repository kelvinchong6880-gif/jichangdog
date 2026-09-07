import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('src');
const publicDir = path.resolve('public');

async function processHtmlFiles(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await processHtmlFiles(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(fullPath).toLowerCase();
            if (ext === '.astro' || ext === '.md' || ext === '.mdx' || ext === '.html') {
                await updateImagesInFile(fullPath);
            }
        }
    }
}

async function updateImagesInFile(filePath) {
    let content = await fs.readFile(filePath, 'utf-8');
    let originalContent = content;
    
    // Find all <img ... > or <img ... />
    const imgRegex = /<img\s+([^>]+)>/gi;
    const replacements = [];
    
    let match;
    let imgCount = 0;
    while ((match = imgRegex.exec(content)) !== null) {
        imgCount++;
        const fullTag = match[0];
        let attributes = match[1];
        if (attributes.endsWith('/')) {
            attributes = attributes.slice(0, -1);
        }
        
        // 1. Update src to .webp
        const srcMatch = attributes.match(/src="([^"]+)"/);
        let currentSrc = srcMatch ? srcMatch[1] : null;
        
        if (currentSrc && (currentSrc.includes('.png') || currentSrc.includes('.jpg') || currentSrc.includes('.jpeg'))) {
            // Fix extensions in URL
            const urlObj = new URL(currentSrc, 'http://localhost');
            let pathname = urlObj.pathname;
            
            if (pathname.startsWith('/images/')) {
                const extIndex = pathname.lastIndexOf('.');
                if (extIndex > 0) {
                    pathname = pathname.substring(0, extIndex) + '.webp';
                }
                const newSrc = pathname + urlObj.search;
                attributes = attributes.replace(`src="${currentSrc}"`, `src="${newSrc}"`);
                currentSrc = newSrc;
            }
        }
        
        let cleanSrc = currentSrc;
        if (cleanSrc && cleanSrc.includes('?')) {
            cleanSrc = cleanSrc.split('?')[0];
        }
        
        // 2. Add width and height
        if (cleanSrc && cleanSrc.startsWith('/images/')) {
            const physicalPath = path.join(publicDir, cleanSrc);
            try {
                const metadata = await sharp(physicalPath).metadata();
                
                if (!attributes.match(/\bwidth="/)) {
                    attributes += ` width="${metadata.width}"`;
                }
                if (!attributes.match(/\bheight="/)) {
                    attributes += ` height="${metadata.height}"`;
                }
            } catch (e) {
                // Ignore missing file errors
            }
        }
        
        // 3. Add loading="lazy" decoding="async"
        // Skip first image in file as it might be LCP (Hero image)
        const isHero = imgCount <= 2 && (filePath.includes('index.astro') || filePath.includes('brand'));
        const hasLazy = attributes.includes('loading="lazy"');
        const hasAsync = attributes.includes('decoding="async"');
        
        // If it's not the hero image, or it's deep in the page
        if (!isHero) {
            if (!hasLazy) attributes += ` loading="lazy"`;
            if (!hasAsync) attributes += ` decoding="async"`;
        }
        
        const newTag = `<img ${attributes.trim()}>`;
        
        if (fullTag !== newTag) {
            replacements.push({
                start: match.index,
                end: match.index + fullTag.length,
                newTag: newTag
            });
        }
    }
    
    // Apply replacements from back to front
    for (let i = replacements.length - 1; i >= 0; i--) {
        const r = replacements[i];
        content = content.substring(0, r.start) + r.newTag + content.substring(r.end);
    }
    
    if (content !== originalContent) {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Updated ${replacements.length} images in ${path.basename(filePath)}`);
    }
}

processHtmlFiles(srcDir).then(() => console.log('HTML update complete!')).catch(console.error);
