// Feature Grid component - Presentation Layer

import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';

const FeatureGrid = () => {
  const { navigationItems, navigateTo } = useNavigation();

  // Filter out the home item for the feature grid
  const featureItems = navigationItems.filter(item => item.path !== '/');

  return (
    <div className="features-grid">
      {featureItems.map((item) => (
        <div
          key={item.path}
          className="feature-card"
          onClick={() => navigateTo(item.path)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigateTo(item.path);
            }
          }}
        >
         
          <h3 className="feature-title">
            {item.label}
          </h3>
          
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
