import React from 'react';
import wazeImage from '../../assets/waze.jpg';
import trafficIcon from '../../assets/icons/feature-icons/traffic.svg';

// Visible only between 05:00 (inclusive) and 11:00 (exclusive) local browser time
const isWithinTrafficWindow = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 5 && hour < 11;
};

const getAverageWaitLabel = (date = new Date()) => {
  const h = date.getHours();
  const m = date.getMinutes();
  const minutes = h * 60 + m;

  const inRange = (sh, sm, eh, em) => minutes >= (sh * 60 + sm) && minutes < (eh * 60 + em);

  if (inRange(7, 45, 8, 0)) return '8 דק׳ ';
  if (inRange(7, 30, 7, 45)) return '5 דק׳ ';
  if (inRange(7, 0, 7, 30)) return '4 דק׳ ';
  if (inRange(8, 0, 8, 30)) return '7 דק׳ ';
  if (inRange(8, 30, 9, 0)) return '4 דק׳ ';
  if (inRange(9, 0, 11, 0)) return '3 דק׳ ';
  if (inRange(6, 0, 7, 0)) return '3 דק׳ ';
  if (inRange(5, 0, 6, 0)) return '3 דק׳ '; 

  return '';
};

const TrafficCard = () => {
  if (!isWithinTrafficWindow()) return null;

  const cardStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.6)), url(${wazeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    color: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-md)',
    marginBottom: 'var(--spacing-lg)',
    minHeight: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const avgWait = getAverageWaitLabel();

  return (
    <div className="traffic-card" style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={trafficIcon} alt="traffic icon" style={{ width: 60, height: 80 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--info)' }}>
          זמן המתנה ממוצע ברמזור:
        </span>
        {avgWait ? (
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--info)' }}>
            {avgWait}
          </span>
        ) : null}
        </div>
      </div>
    </div>
  );
};

export default TrafficCard;
