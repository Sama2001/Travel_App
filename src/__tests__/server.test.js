const request = require('supertest');
const { app, server } = require('../../src/server/server.js'); // Import the app and server
const fetch = require('node-fetch');

jest.mock('node-fetch');

beforeAll((done) => {
  // Start the server before all tests
  server.on('listening', () => {
    console.log('Test server running on port', server.address().port);
    done();
  });
});

afterAll((done) => {
  // Close the server after all tests
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

describe('Server API Endpoints', () => {
  it('GET /geonames should return location data', async () => {
    // Mock Geonames API response
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ geonames: [{ lat: 48.8566, lng: 2.3522 }] }),
    });

    const res = await request(app).get('/geonames?location=Paris');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ lat: 48.8566, lng: 2.3522 }); // Check mocked response
  });

  it('GET /weather should return weather data', async () => {
    // Mock Weatherbit API response
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [{ temp: 15, weather: { description: 'Sunny' } }] }),
    });

    const res = await request(app).get('/weather?lat=48.8566&lng=2.3522');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ temp: 15, weather: { description: 'Sunny' } }); // Check mocked response
  });

  it('GET /image should return an image URL', async () => {
    // Mock Pixabay API response
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ hits: [{ webformatURL: 'https://example.com/image.jpg' }] }),
    });

    const res = await request(app).get('/image?location=Paris');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ webformatURL: 'https://example.com/image.jpg' }); // Check mocked response
  });
});