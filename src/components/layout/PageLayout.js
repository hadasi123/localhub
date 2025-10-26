// Page Layout component - Presentation Layer

import React from 'react';
import Header from './Header';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-grey-50" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
