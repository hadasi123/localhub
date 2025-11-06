// Home Page - Presentation Layer

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import WeatherCard from '../components/layout/WeatherCard';
import AirPollutionCard from '../components/layout/AirPollutionCard';
import MunicipalityCard from '../components/layout/MunicipalityCard';
import Button from '../components/ui/Button';
import hazardIcon from '../assets/icons/feature-icons/hazard.svg';
import FeatureGrid from '../components/layout/FeatureGrid';
import TrafficCard from '../components/layout/TrafficCard';

const HomePage = () => {
  const navigate = useNavigate();
  const handleReportClick = () => {
    window.open('https://www.kiryatono.muni.il/express/login/?source=express', '_blank', 'noopener,noreferrer');
  };
  const handleTermsClick = () => {
    navigate('/terms-of-use');
  };

  return (
    <PageLayout>
      <div className="fade-in">
       
        <div className="weather-news-section mb-8">
          <div className="weather-container">
            <WeatherCard />
            <AirPollutionCard />
            <TrafficCard />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <FeatureGrid />
        </div>

      {/* Report button */}
        <div className="flex justify-center mb-8">
          <Button 
            style={{backgroundColor: 'var(--warning)', color: 'var(--white)', padding: '12px 24px', fontSize: '1.1rem', fontWeight: '600', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
            onClick={handleReportClick}
            className="w-full md:w-auto"
          >
           
            <img 
              src={hazardIcon} 
              alt="" 
              style={{ width: 35, height: 35, marginInlineEnd: '4px', objectFit: 'contain' }}
            />
             <span>דיווח על מפגע</span>
          </Button>
        </div>
        
        {/* Terms of Use button at the bottom */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleTermsClick}
            className="w-full md:w-auto"
            style={{
              marginTop: '32px',
              marginBottom: '32px',
              backgroundColor: 'var(--white)',
              color: 'var(--grey-500)',
              border: '1px solid var(--grey-300)',
              padding: '10px 20px',
              fontWeight: 600
            }}
          >
            תנאי שימוש
          </Button>
        </div>
          
      </div>
    </PageLayout>
  );
};

export default HomePage;
