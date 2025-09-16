// Home page - Presentation Layer

import React from 'react';
import WeatherCard from '../components/layout/WeatherCard';
import NewsFeed from '../components/layout/NewsFeed';
import FeatureGrid from '../components/layout/FeatureGrid';
import '../styles/pages.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Weather and News Section */}
      <div className="weather-news-section">
        <div className="weather-container">
          <WeatherCard />
        </div>
        <div className="news-container">
          <NewsFeed />
        </div>
      </div>
      
      {/* Community Features Section */}
      <div className="features-section">
        <h2 className="section-title">Community Features</h2>
        <FeatureGrid />
      </div>
    </div>
  );
};

export default Home;
