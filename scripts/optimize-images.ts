import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

async function optimizeImages() {
  console.log('Optimizing images...\n');

  // Optimize logo
  const logoPath = path.join(IMAGES_DIR, 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('Processing logo.png...');

    // Create optimized PNG at multiple sizes
    const sizes = [48, 96, 192];

    for (const size of sizes) {
      // WebP version (best compression)
      await sharp(logoPath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 85 })
        .toFile(path.join(IMAGES_DIR, `logo-${size}.webp`));

      // PNG version (fallback)
      await sharp(logoPath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(path.join(IMAGES_DIR, `logo-${size}.png`));
    }

    // Also create the main optimized logo.webp
    await sharp(logoPath)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(path.join(IMAGES_DIR, 'logo.webp'));

    console.log('  - Created logo-48.webp, logo-96.webp, logo-192.webp');
    console.log('  - Created logo-48.png, logo-96.png, logo-192.png');
    console.log('  - Created logo.webp');
  }

  // Optimize entrance image
  const entrancePath = path.join(IMAGES_DIR, 'Entrada de Clínica Podológica Carrera.png');
  if (fs.existsSync(entrancePath)) {
    console.log('\nProcessing entrance image...');

    // Create optimized WebP version
    await sharp(entrancePath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(IMAGES_DIR, 'entrada-clinica.webp'));

    // Create smaller version for mobile
    await sharp(entrancePath)
      .resize(400, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(IMAGES_DIR, 'entrada-clinica-mobile.webp'));

    console.log('  - Created entrada-clinica.webp');
    console.log('  - Created entrada-clinica-mobile.webp');
  }

  console.log('\nDone! Checking file sizes...\n');

  // Show file sizes
  const files = fs.readdirSync(IMAGES_DIR);
  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ${file}: ${sizeKB} KB`);
  }
}

optimizeImages().catch(console.error);
