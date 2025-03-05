const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// Geonames API: Get latitude and longitude
app.get('/geonames', async (req, res) => {
  try {
    const location = req.query.location;
    const url = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.geonames && data.geonames.length > 0) {
      res.json(data.geonames[0]); // Returns { lat, lng }
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    console.error('Geonames API error:', error);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
});
// Weatherbit API: Get weather data
app.get('/weather', async (req, res) => {
  try {
    const { lat, lng, days } = req.query;
    let url;
    if (days <= 7) {
      url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`;
    } else {
      url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data[0]); // Returns weather data
  } catch (error) {
    console.error('Weatherbit API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Pixabay API: Get location image
app.get('/image', async (req, res) => {
  try {
    const location = req.query.location;
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${location}&image_type=photo`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.hits[0]); // Returns image data
  } catch (error) {
    console.error('Pixabay API error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };