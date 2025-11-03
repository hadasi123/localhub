import React, { useEffect, useState } from 'react';
import weatherService from '../../services/weatherService';

// Calculate Air Quality Index based on PM2.5 (US EPA standard)
const calculateAQI = (pm25) => {
  if (pm25 <= 12) return { level: 'נהדר', description: 'איכות אוויר מצוינת', emoji: '😊', color: '#00e400' };
  if (pm25 <= 35.4) return { level: 'בינוני', description: 'זיהום אוויר בינוני עקב ריכוזי חלקיקים', emoji: '🙂', color: '#b5b52d' };
  if (pm25 <= 55.4) return { level: 'לא בריא לאוכלוסיות רגישות', description: 'אנשים רגישים עשויים לחוש אי נוחות', emoji: '😐', color: '#ff7e00' };
  if (pm25 <= 150.4) return { level: 'לא בריא', description: 'כולם עשויים להתחיל לחוש השפעות בריאותיות', emoji: '😷', color: '#ff0000' };
  if (pm25 <= 250.4) return { level: 'לא בריא מאוד', description: 'אזהרת בריאות - כולם עלולים לחוות השפעות חמורות', emoji: '😨', color: '#8f3f97' };
  return { level: 'מסוכן', description: 'אזהרת בריאות חירום - כולם בסיכון', emoji: '☠️', color: '#7e0023' };
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
    <div className="card air-pollution-card mb-4">
      <div className="card-header">
        <h3 className="card-title">איכות אוויר</h3>
      </div>
      <div className="card-body" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{aqi.emoji}</div>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: aqi.color,
          marginBottom: '0.5rem'
        }}>
          {aqi.level}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          {aqi.description}
        </div>
        
      </div>
    </div>
  );
};

export default AirPollutionCard;
