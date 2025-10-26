// Main App component - Presentation Layer

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import './styles/components.css';
import './styles/rtl.css';

// Pages
import HomePage from './pages/HomePage';
// During repair: use the fixed placeholder page to avoid import errors
import LostAndFoundPage from './pages/lost-and-found/LostAndFoundPage';
import CarpoolPage from './pages/carpool/CarpoolPage';
import EducationPage from './pages/education/EducationPage';
import BusinessPage from './pages/business/BusinessPage';
import PhoneBookPage from './pages/phone-book/PhoneBookPage';
import SellPage from './pages/sell/SellPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost-and-found" element={<LostAndFoundPage />} />
          <Route path="/carpool" element={<CarpoolPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/phone-book" element={<PhoneBookPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
