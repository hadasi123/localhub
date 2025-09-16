// Home Page - Presentation Layer

import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import WeatherCard from '../components/layout/WeatherCard';
import NewsFeed from '../components/layout/NewsFeed';
import FeatureGrid from '../components/layout/FeatureGrid';

const HomePage = () => {
  return (
    <PageLayout>
      <div className="fade-in">
       
        <div className="weather-news-section mb-8">
          <div className="weather-container">
            <WeatherCard />
          </div>
          <div className="news-container">
            <NewsFeed />
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
