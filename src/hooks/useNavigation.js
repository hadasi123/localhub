// Navigation hook - Business Logic Layer

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sellIcon from '../assets/icons/icons/sell.svg';
import phoneBookIcon from '../assets/icons/icons/phonebook.svg';
import businessIcon from '../assets/icons/icons/bussinesses.svg';
import educationIcon from '../assets/icons/icons/education.svg';
import carpoolIcon from '../assets/icons/icons/carpool.svg';
import lostFoundIcon from '../assets/icons/icons/lost-found.svg';

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
      iconType: 'svg'
    
    },
    {
      path: '/phone-book',
      label: 'ספר טלפונים',
      icon: phoneBookIcon,
      iconType: 'svg'
    },
    {
      path: '/business',
      label: 'עסקים',
      icon: businessIcon,
      iconType: 'svg'
    },
    {
      path: '/education',
      label: 'חינוך ותרבות',
      icon: educationIcon,
      iconType: 'svg'
    },
    {
      path: '/carpool',
      label: 'קארפול',
      icon: carpoolIcon,
      iconType: 'svg'
    },
    {
      path: '/lost-and-found',
      label: 'השבת אבידה',
      icon: lostFoundIcon,
      iconType: 'svg'
    },
    {
      path: '/',
      label: 'ראשי',
      icon: '🏠'
    }
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
