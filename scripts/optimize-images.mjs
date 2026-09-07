import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public/images');
const brandsDir = path.join(publicDir, 'brands');
const reviewsDir = path.join(publicDir, 'reviews');

async function processImages(dirPath, maxW) {
    let entries;
    try {
        entries = await fs.readdir(dirPath, { withFileTypes: true });
    } catch (e) {
        if (e.code === 'ENOENT') return;
        throw e;
    }
    
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await processImages(fullPath, maxW);
        } else if (entry.isFile()) {
            const ext = path.extname(fullPath).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
                
                let image = sharp(fullPath);
                const metadata = await image.metadata();
                
                if (maxW && metadata.width > maxW) {
                    image = image.resize({ width: maxW, withoutEnlargement: true });
                }
                
                await image.webp({ quality: 82, effort: 6 }).toFile(webpPath);
                await fs.unlink(fullPath); // Delete the original file
                console.log(`Optimized: ${entry.name} -> ${path.basename(webpPath)} (Original deleted)`);
            }
        }
    }
}

async function run() {
    console.log('Optimizing brand images (converting to WebP)...');
    await processImages(brandsDir, null);
    
    console.log('Optimizing review images (resizing to max 1200px and converting to WebP)...');
    await processImages(reviewsDir, 1200);
    
    console.log('Image optimization complete!');
}

run().catch(console.error);
