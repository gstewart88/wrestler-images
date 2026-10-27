const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './images';
const outputDir = './thumbs';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(async (file) => {
  const inputPath = path.join(inputDir, file);

  if (!/\.(png|jpg|jpeg)$/i.test(file)) return;

  const outputFile =
    path.parse(file).name + '.webp';

  const outputPath = path.join(outputDir, outputFile);

  try {
    await sharp(inputPath)
      .resize(300, 300, {
        fit: 'cover'
      })
      .webp({ quality: 75 })
      .toFile(outputPath);

    console.log(`Created ${outputFile}`);
  } catch (err) {
    console.error(`Failed ${file}`, err);
  }
});