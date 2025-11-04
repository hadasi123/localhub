// Feature Grid component - Presentation Layer

import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';

const FeatureGrid = () => {
  const { navigationItems, navigateTo } = useNavigation();

  // Filter out the home item for the feature grid
  const featureItems = navigationItems.filter(item => item.path !== '/');

  // Split into two columns with 3 items each
  const leftColumn = featureItems.slice(0, 3);
  const rightColumn = featureItems.slice(3, 6);

  return (
    <div className="features-grid two-col">
      <div className="features-column">
        {leftColumn.map((item) => (
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
            <h3 className="feature-title">{item.label}</h3>
          </div>
        ))}
      </div>
      <div className="features-column">
        {rightColumn.map((item) => (
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
            <h3 className="feature-title">{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
