const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const directories = [
  path.join(__dirname, '../public/gallery'),
  path.join(__dirname, '../src/data')
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    // Skip if file already exists (for local development)
    if (fs.existsSync(destination)) {
      console.log(`File already exists: ${destination}`);
      resolve();
      return;
    }

    console.log(`Downloading: ${url} to ${destination}`);
    
    const file = fs.createWriteStream(destination);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${destination}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(destination, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// List of assets to download
// The URLs should be stored in environment variables or a config file
const assets = [
  {
    url: process.env.ASSET_URL_DOBBY_VAN || 'https://example.com/placeholder.jpg',
    destination: path.join(__dirname, '../public/gallery/dobby_van.jpeg')
  },
  {
    url: process.env.ASSET_URL_OMBRE || 'https://example.com/placeholder.jpg',
    destination: path.join(__dirname, '../public/gallery/ombre.jpg')
  },
  // Add more assets as needed
  {
    url: process.env.ASSET_URL_ATTRACTIONS_JSON || 'https://example.com/attractions.json',
    destination: path.join(__dirname, '../src/data/beaujolais_attractions.json')
  }
];

// Download all assets
Promise.all(assets.map(asset => downloadFile(asset.url, asset.destination)))
  .then(() => {
    console.log('All assets downloaded successfully');
  })
  .catch(error => {
    console.error('Error downloading assets:', error);
    process.exit(1);
  });
