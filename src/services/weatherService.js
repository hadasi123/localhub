// Weather service for LocalHub - Data Layer

import { createWeatherData, WeatherTypes } from '../types';

// Weather icons mapping
export const weatherIcons = {
  [WeatherTypes.CLEAR]: '☀️',
  [WeatherTypes.CLOUDY]: '☁️',
  [WeatherTypes.RAINY]: '🌧️',
  [WeatherTypes.STORMY]: '⛈️',
  [WeatherTypes.SNOWY]: '❄️',
  [WeatherTypes.FOGGY]: '🌫️'
};

// Weather service class
class WeatherService {
  constructor() {
    this.cache = null;
    this.cacheExpiry = 10 * 60 * 1000; // 10 minutes
    this.apiUrl = 'https://api.open-meteo.com/v1/forecast';
    this.israelCoordinates = {
      latitude: 34.84,
      longitude: 32.06
    };
  }

  // Get current weather for Israel using Open-Meteo API
  async getCurrentWeather() {
    try {
      // Check cache first
      if (this.cache && this.isCacheValid()) {
        return this.cache;
      }

      // Fetch real weather data from Open-Meteo API
      const weatherData = await this.fetchWeatherFromAPI();
      
      // Cache the result
      this.cache = weatherData;
      this.cacheTimestamp = Date.now();
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Return fallback data if API fails
      return this.getFallbackWeatherData();
    }
  }

  // Fetch weather data from Open-Meteo API
  async fetchWeatherFromAPI() {
    const params = new URLSearchParams({
      latitude: this.israelCoordinates.latitude.toString(),
      longitude: this.israelCoordinates.longitude.toString(),
      daily: 'apparent_temperature_mean,temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'Asia/Jerusalem',
      forecast_days: 1
    });

    const response = await fetch(`${this.apiUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract today's weather data
    const temperature = Math.round(data.daily.apparent_temperature_mean[0]);
    const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
    const minTemp = Math.round(data.daily.temperature_2m_min[0]);
    const weatherCode = data.daily.weather_code[0];

    // Convert weather code to description and icon
    const { description, icon } = this.getWeatherFromCode(weatherCode);

    return createWeatherData({
      temperature: temperature,
      description: description,
      icon: icon,
      location: 'Israel',
      maxTemperature: maxTemp,
      minTemperature: minTemp,
      timestamp: new Date().toISOString()
    });
  }

  // Convert WMO weather code to description and icon
  getWeatherFromCode(code) {
    // WMO Weather interpretation codes (WW)
    const weatherCodes = {
      0: { description: 'שמיים בהירים', icon: WeatherTypes.CLEAR },
      1: { description: 'לרוב שמיים בהירים', icon: WeatherTypes.CLEAR },
      2: { description: 'מעונן חלקית', icon: WeatherTypes.CLOUDY },
      3: { description: 'עננות מורגשת', icon: WeatherTypes.CLOUDY },
      45: { description: 'עננות', icon: WeatherTypes.FOGGY },
      48: { description: 'עננות', icon: WeatherTypes.FOGGY },
      51: { description: 'עננות קלה', icon: WeatherTypes.RAINY },
      53: { description: 'עננות בינונית', icon: WeatherTypes.RAINY },
      55: { description: 'עננות כבדה', icon: WeatherTypes.RAINY },
      61: { description: 'טפטוף לפרקים', icon: WeatherTypes.RAINY },
      63: { description: 'גשום', icon: WeatherTypes.RAINY },
      65: { description: 'גשם כבד', icon: WeatherTypes.RAINY },
      71: { description: 'שלג', icon: WeatherTypes.SNOWY },
      73: { description: 'שלג', icon: WeatherTypes.SNOWY },
      75: { description: 'שלג', icon: WeatherTypes.SNOWY },
      77: { description: 'שלג', icon: WeatherTypes.SNOWY },
      80: { description: 'ממטרי גשם', icon: WeatherTypes.RAINY },
      81: { description: 'גשם', icon: WeatherTypes.RAINY },
      82: { description: 'סופת גשמים', icon: WeatherTypes.RAINY },
      85: { description: 'שלג', icon: WeatherTypes.SNOWY },
      86: { description: 'מושלג', icon: WeatherTypes.SNOWY },
      95: { description: 'סערת ברקים', icon: WeatherTypes.STORMY },
      96: { description: 'סוער וגשום', icon: WeatherTypes.STORMY },
      99: { description: 'סוער וגשום', icon: WeatherTypes.STORMY }
    };

    return weatherCodes[code] || { description: 'Unknown', icon: WeatherTypes.CLEAR };
  }

  // Fallback weather data if API fails
  getFallbackWeatherData() {
    return createWeatherData({
      temperature: 25,
      description: 'Partly cloudy',
      icon: WeatherTypes.CLOUDY,
      location: 'Israel',
      maxTemperature: 28,
      minTemperature: 22,
      timestamp: new Date().toISOString()
    });
  }

  // Check if cache is still valid
  isCacheValid() {
    return this.cacheTimestamp && 
           (Date.now() - this.cacheTimestamp) < this.cacheExpiry;
  }

  // Get weather icon
  getWeatherIcon(weatherType) {
    return weatherIcons[weatherType] || weatherIcons[WeatherTypes.CLEAR];
  }

  // Format temperature
  formatTemperature(temp) {
    return `${temp}°C`;
  }

  // Get weather description with emoji
  getWeatherDescription(weather) {
    const icon = this.getWeatherIcon(weather.icon);
    return `${icon} ${weather.description}`;
  }
}

// Create singleton instance
const weatherService = new WeatherService();

export default weatherService;
