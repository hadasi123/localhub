import React, { useEffect, useState } from 'react';
import weatherService from '../../services/weatherService';
import pollution12 from '../../assets/icons/pollution-icons/pollution-12.svg';
import pollution35 from '../../assets/icons/pollution-icons/pollution-35.4.svg';
import pollution55 from '../../assets/icons/pollution-icons/pollution-55.4.svg';
import pollution150 from '../../assets/icons/pollution-icons/pollution-150.4.svg';
import pollution250 from '../../assets/icons/pollution-icons/pollution-250.4.svg';
import pollutionOther from '../../assets/icons/pollution-icons/pollution-other.svg';

// Calculate Air Quality Index based on PM2.5 (US EPA standard)
const calculateAQI = (pm25) => {
  if (pm25 <= 12) return { level: 'איכות אוויר מצוינת', description: 'ללא ריכוזי חלקיקים', icon: pollution12, color: '#00e400' };
  if (pm25 <= 35.4) return { level: 'איכות אוויר בינונית', description: 'זיהום אוויר קל עקב ריכוזי חלקיקים', icon: pollution35, color: '#b5b52d' };
  if (pm25 <= 55.4) return { level: 'איכות אוויר ירודה', description: 'אנשים רגישים עשויים לחוש אי נוחות', icon: pollution55, color: '#ff7e00' };
  if (pm25 <= 150.4) return { level: 'איכות אוויר ירודה', description: 'כולם עשויים להתחיל לחוש השפעות בריאותיות', icon: pollution150, color: '#ff0000' };
  if (pm25 <= 250.4) return { level: 'איכות אוויר ירודה מאוד', description: 'אזהרת בריאות - כולם עלולים לחוות השפעות חמורות', icon: pollution250, color: '#8f3f97' };
  return { level: 'איכות אוויר מסוכנת', description: 'אזהרת איכות אוויר - כולם בסיכון', icon: pollutionOther, color: '#7e0023' };
};


const AirPollutionCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    weatherService.getAirPollution().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="card air-pollution-card">טוען נתוני זיהום אוויר...</div>;
  if (!data) return <div className="card air-pollution-card">לא ניתן לטעון נתוני זיהום אוויר</div>;

  const aqi = calculateAQI(data.pm2_5);

  return (
    <div className="air-pollution-card" style={{
      background: 'linear-gradient(135deg, var(--info-secondary) 50%, var(--info) 100%)',
      color: 'var(--white)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-lg)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)',
      marginBottom: 'var(--spacing-lg)'
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <img src={aqi.icon} alt={aqi.level} style={{ width: '40px', height: '40px' }} />
      </div>
      <div style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold',
        marginBottom: '0.5rem'
      }}>
        {aqi.level}
      </div>
      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
        {aqi.description}
      </div>
    </div>
  );
};

export default AirPollutionCard;
