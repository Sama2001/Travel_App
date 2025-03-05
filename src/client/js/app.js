// Import functions from api.js
import { fetchLocationData, fetchWeather, fetchImage } from './api';

// Add event listener to the form
document.getElementById('travel-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Get user input
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;

  try {
    // Step 1: Get latitude and longitude
    const { lat, lng } = await fetchLocationData(location);

    // Step 2: Calculate days until trip
    const today = new Date();
    const tripDate = new Date(date);
    const timeDiff = tripDate - today;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    // Step 3: Get weather data
    const weather = await fetchWeather(lat, lng, days);

    // Step 4: Get location image
    const image = await fetchImage(location);

    // Step 5: Display results
    const results = document.getElementById('results');
    results.innerHTML = `
      <h2>Weather in ${location}</h2>
      <p>Temperature: ${weather.temp}°C</p>
      <p>Weather: ${weather.weather.description}</p>
      <img src="${image}" alt="${location}" style="max-width: 100%; height: auto;">
    `;
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch data. Please try again.');
  }
});