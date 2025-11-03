// Home Page - Presentation Layer

import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import WeatherCard from '../components/layout/WeatherCard';
import AirPollutionCard from '../components/layout/AirPollutionCard';
import FeatureGrid from '../components/layout/FeatureGrid';

const HomePage = () => {
  return (
    <PageLayout>
      <div className="fade-in">
       
        <div className="weather-news-section mb-8">
          <div className="weather-container">
            <WeatherCard />
            <AirPollutionCard />
            
          </div>
        </div>

        <div>
          <FeatureGrid />
        </div>

      </div>
    </PageLayout>
  );
};

export default HomePage;
