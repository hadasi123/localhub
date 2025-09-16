// Page Layout component - Presentation Layer

import React from 'react';
import Header from './Header';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-grey-light">
      <Header />
      <main className="page">
        <div className="container">
          {(title || subtitle) && (
            <div className="page-header">
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
