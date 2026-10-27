const sharp = require('sharp');
const fs = require('fs');

if (!fs.existsSync('./thumbs')) {
  fs.mkdirSync('./thumbs');
}

fs.readdirSync('./images').forEach(async file => {
  if (!file.match(/\.(png|jpg|jpeg)$/i)) return;

  await sharp(`./images/${file}`)
    .webp({ quality: 80 })
    .toFile(`./thumbs/${file.replace(/\.[^.]+$/, '.webp')}`);
});