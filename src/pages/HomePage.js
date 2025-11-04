// Home Page - Presentation Layer

import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import WeatherCard from '../components/layout/WeatherCard';
import AirPollutionCard from '../components/layout/AirPollutionCard';
import MunicipalityCard from '../components/layout/MunicipalityCard';
import Button from '../components/ui/Button';
import FeatureGrid from '../components/layout/FeatureGrid';

const HomePage = () => {
  const handleReportClick = () => {
    window.open('https://www.kiryatono.muni.il/express/login/?source=express', '_blank', 'noopener,noreferrer');
  };

  return (
    <PageLayout>
      <div className="fade-in">
       
        <div className="weather-news-section mb-8">
          <div className="weather-container">
            <WeatherCard />
            <AirPollutionCard />
            <MunicipalityCard />
          </div>
        </div>

        {/* Report button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={handleReportClick}
            className="w-full md:w-auto"
          >
            דיווח על מפגע
          </Button>
        </div>

        <div>
          <FeatureGrid />
        </div>

      </div>
    </PageLayout>
  );
};

export default HomePage;
