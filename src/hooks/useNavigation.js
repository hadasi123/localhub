// Navigation hook - Business Logic Layer

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sellIcon from '../assets/icons/feature-icons/sell.svg';
import phoneBookIcon from '../assets/icons/feature-icons/phonebook.svg';
import businessIcon from '../assets/icons/feature-icons/bussinesses.svg';
import educationIcon from '../assets/icons/feature-icons/education.svg';
import carpoolIcon from '../assets/icons/feature-icons/carpool.svg';
import lostFoundIcon from '../assets/icons/feature-icons/lost-found.svg';

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with icons
  const navigationItems = [
    {
      path: '/sell',
      label: 'לוח מודעות',
      icon: sellIcon,
      iconType: 'svg',
      iconWidth: '48px',
      iconHeight: '36px'
    },
    {
      path: '/phone-book',
      label: 'ספר טלפונים',
      icon: phoneBookIcon,
      iconType: 'svg',
      iconWidth: '48px',
      iconHeight: '46px'
    },
    {
      path: '/business',
      label: 'עסקים',
      icon: businessIcon,
      iconType: 'svg',
      iconWidth: '48px',
      iconHeight: '40px'
    },
    {
      path: '/education',
      label: 'חינוך ותרבות',
      icon: educationIcon,
      iconType: 'svg',
      iconWidth: '48px',
      iconHeight: '48px'
    },
    {
      path: '/carpool',
      label: 'קארפול',
      icon: carpoolIcon,
      iconType: 'svg',
      iconWidth: '70px',
      iconHeight: '50px'
    },
    {
      path: '/lost-and-found',
      label: 'השבת אבידה',
      icon: lostFoundIcon,
      iconType: 'svg',
      iconWidth: '48px',
      iconHeight: '48px'
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return {
    navigationItems,
    isActiveRoute,
    navigateTo,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    currentPath: location.pathname
  };
};
