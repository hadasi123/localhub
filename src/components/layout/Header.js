// Header component - Presentation Layer

import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useI18n } from '../../i18n';

const Header = () => {
  const { 
    navigationItems, 
    isActiveRoute, 
    navigateTo, 
    isMobileMenuOpen, 
    toggleMobileMenu, 
    closeMobileMenu 
  } = useNavigation();

  const { t } = useI18n();

  return (
    <>
      <header className="header rtl">
        <div className="container px-4">
          <div className="header-content rtl">
            {/* Desktop Navigation */}
            <div className="logo">שכונת אריאל שרון</div>
            <nav className="nav rtl">
              {[...navigationItems].map((item) => (
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
              aria-label={t('common.toggleMobileMenu', 'Toggle mobile menu')}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav rtl ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
          <div className="logo">שכונת אריאל שרון</div>
          <button 
            className="mobile-nav-close"
            onClick={closeMobileMenu}
            aria-label={t('common.closeMobileMenu', 'Close mobile menu')}
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
