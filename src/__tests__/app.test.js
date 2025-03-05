import { fetchWeather, fetchImage } from '../../src/client/js/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('Client-Side Functions', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('fetchWeather should return weather data', async () => {
    // Mock fetch for weather data
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ temp: 15, weather: 'Sunny' }),
    });

    const weather = await fetchWeather('Paris');
    expect(weather).toEqual({ temp: 15, weather: 'Sunny' }); // Check mocked response
    expect(fetch).toHaveBeenCalledWith('/weather?location=Paris'); // Ensure fetch was called with the correct URL
  });

  it('fetchImage should return an image URL', async () => {
    // Mock fetch for image data
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ hits: [{ webformatURL: 'https://example.com/image.jpg' }] }),
    });

    const image = await fetchImage('Paris');
    expect(image).toBe('https://example.com/image.jpg'); // Check mocked response
    expect(fetch).toHaveBeenCalledWith('/image?location=Paris'); // Ensure fetch was called with the correct URL
  });
});