const express = require('express');
const path = require('path');

const app = express();
const PORT = 3100;

// Serve images from the public/images folder with caching headers
app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  setHeaders: (res, filePath) => {
    // Cache image in browser for 1 day
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 86400 seconds = 1 day
  }
}));

app.get('/', (req, res) => {
  res.send(`
    <h1>Image CDN Cache Test</h1>
    <img src="/images/sample.jpg" width="300" />
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
