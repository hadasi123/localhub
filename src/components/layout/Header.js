// Header component - Presentation Layer

import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';

const Header = () => {
  const { 
    navigationItems, 
    isActiveRoute, 
    navigateTo, 
    isMobileMenuOpen, 
    toggleMobileMenu, 
    closeMobileMenu 
  } = useNavigation();

  return (
    <>
      <header className="header" style={{direction:'rtl'}}>
        <div className="container">
          <div className="header-content" style={{direction:'rtl'}}>
            {/* Desktop Navigation */}
            <nav className="nav">
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.path);
                  }}
                >
                
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button style={{flex: 1}}
              className="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div style={{direction:'rtl'}} className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo">שכונת אריאל שרון</div>
          <button 
            className="mobile-nav-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            ×
          </button>
        </div>
        
        <nav className="mobile-nav-items" >
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`mobile-nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.path);
              }}
            >
              
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
