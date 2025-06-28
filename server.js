require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3100;

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
    <p>Server is running on port: ${PORT}</p>
  `);
});

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', port: PORT });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
