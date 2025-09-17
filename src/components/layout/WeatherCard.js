// Weather Card component - Presentation Layer

import React from 'react';
import { useWeather } from '../../hooks/useWeather';
import { Card, CardBody } from '../ui/Card';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const WeatherCard = () => {
  const { 
    weather, 
    loading, 
    error, 
    refreshWeather, 
    getWeatherIcon, 
    formatTemperature
  } = useWeather();

  if (loading && !weather) {
    return (
      <Card className="weather-card">
        <CardBody className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p>בטעינה...</p>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert type="error" className="mb-4">
        <p>הטעינה נכשלה</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshWeather}
          className="mt-2"
        >
          Try Again
        </Button>
      </Alert>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card className="weather-card">
      <CardBody>
        <div className="text-center">
          <div className="weather-icon mb-2">
            {getWeatherIcon(weather.icon)}
          </div>
          
          <div className="weather-temp">
            {formatTemperature(weather.temperature)}
          </div>
          
          <div className="weather-description">
            {weather.description}
          </div>
          
          <div className="weather-location">
            {weather.location}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WeatherCard;
