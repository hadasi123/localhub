// Page Layout component - Presentation Layer

import React from 'react';
import Header from './Header';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-grey-50" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 py-8" style={{ paddingTop: '12px' }}>
        {/* Title rendering removed globally per design request */}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
