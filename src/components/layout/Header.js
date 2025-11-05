// Header component - Presentation Layer

import React from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { useI18n } from "../../i18n";
import menuIcon from "../../assets/icons/feature-icons/menu.svg";

const Header = () => {
  const {
    navigationItems,
    isActiveRoute,
    navigateTo,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useNavigation();

  const { t } = useI18n();

  return (
    <>
      <header className="header">
        <div className="container px-4">
          <div className="header-content">
            {/* Desktop Navigation */}

            
            <div
              className="logo"
              onClick={() => navigateTo('/')}
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                padding: "8px",
              }}
            >
              שכונת אריאל שרון
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              aria-label={t("common.toggleMobileMenu", "Toggle mobile menu")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <img
                src={menuIcon}
                alt="Menu"
                style={{ width: "24px", height: "24px" }}
              />
            </button>

            <nav className="nav">
              {[...navigationItems].map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? "active" : ""}`}
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
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <button
            className="mobile-nav-close"
            onClick={closeMobileMenu}
            aria-label={t("common.closeMobileMenu", "Close mobile menu")}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav-items">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`mobile-nav-item ${isActiveRoute(item.path) ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.path);
              }}
            >
              {item.label}
              <img
                src={item.icon}
                alt=""
                className="mobile-nav-icon"
                style={{ width: "24px", height: "24px", marginRight: "4px" }}
              />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
