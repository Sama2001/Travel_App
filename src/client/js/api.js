// Fetch location data (latitude and longitude) from Geonames API
export const fetchLocationData = async (location) => {
  const response = await fetch(`http://localhost:3001/geonames?location=${location}`);
  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }
  const data = await response.json();
  return { lat: data.lat, lng: data.lng }; // Return coordinates
};

// Fetch weather data from Weatherbit API
export const fetchWeather = async (lat, lng, days) => {
  const response = await fetch(`http://localhost:3001/weather?lat=${lat}&lng=${lng}&days=${days}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return { temp: data.temp, weather: data.weather }; // Return weather data
};

// Fetch image from Pixabay API
export const fetchImage = async (location) => {
  const response = await fetch(`http://localhost:3001/image?location=${location}`);
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }
  const data = await response.json();
  return data.webformatURL; // Return image URL
};