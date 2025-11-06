// Feature Grid component - Presentation Layer

import React, { useEffect, useRef } from 'react';
import { useNavigation } from '../../hooks/useNavigation';

const FeatureGrid = () => {
  const { navigationItems, navigateTo } = useNavigation();

  // Keep track of a pending navigation timeout to avoid double navigations
  const pendingTimeoutRef = useRef(null);

  const delayedNavigate = (path) => {
    // Clear any existing timeout to debounce rapid interactions
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
    }
    pendingTimeoutRef.current = setTimeout(() => {
      navigateTo(path);
      pendingTimeoutRef.current = null;
    }, 800);
  };

  // Cleanup on unmount to avoid running navigation after component is gone
  useEffect(() => () => {
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
    }
  }, []);

  // Filter out the home item for the feature grid
  const featureItems = navigationItems.filter(item => item.path !== '/');

  // Split into two columns with 3 items each
  const leftColumn = featureItems.slice(0, 3);
  const rightColumn = featureItems.slice(3, 6);

  const renderCard = (item) => (
    <div
      key={item.path}
      className="feature-card"
      onClick={() => delayedNavigate(item.path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          delayedNavigate(item.path);
        }
      }}
    >
      <img 
        src={item.icon} 
        alt={item.label} 
        className="feature-icon"
        style={{
          '--icon-width': item.iconWidth,
          '--icon-height': item.iconHeight
        }}
      />
      <h3 className="feature-title">{item.label}</h3>
    </div>
  );

  return (
    <div className="features-grid two-col">
      <div className="features-column">
        {leftColumn.map(renderCard)}
      </div>
      <div className="features-column">
        {rightColumn.map(renderCard)}
      </div>
    </div>
  );
};

export default FeatureGrid;
