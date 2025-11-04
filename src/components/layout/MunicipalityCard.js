import React from 'react';

const MunicipalityCard = () => {
  return (
    <div className="card municipality-card mb-4">
      <div className="card-header">
        <h3 className="card-title">מגזין קרית אונו</h3>
      </div>
      <div className="card-body" style={{ padding: 0, height: '600px' }}>
        <iframe
          src="https://www.qonomuni.com/"
          title="מגזין קרית אונו"
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MunicipalityCard;
