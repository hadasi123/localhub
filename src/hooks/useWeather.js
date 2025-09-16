// Weather hook - Business Logic Layer

import { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await weatherService.getCurrentWeather();
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = () => {
    fetchWeather();
  };

  const getWeatherIcon = (weatherType) => {
    return weatherService.getWeatherIcon(weatherType);
  };

  const formatTemperature = (temp) => {
    return weatherService.formatTemperature(temp);
  };

  const getWeatherDescription = (weather) => {
    return weatherService.getWeatherDescription(weather);
  };

  useEffect(() => {
    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    weather,
    loading,
    error,
    refreshWeather,
    getWeatherIcon,
    formatTemperature,
    getWeatherDescription
  };
};
