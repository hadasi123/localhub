// Navigation hook - Business Logic Layer

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import lostAndFoundIcon from '../assets/icons/lost_and_found.png';

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with icons
  const navigationItems = [
    {
      path: '/sell',
      label: 'לוח מודעות',
      icon: '💰'
    },
    {
      path: '/phone-book',
      label: 'ספר טלפונים',
      icon: '📞'
    },
    {
      path: '/business',
      label: 'עסקים',
      icon: '🏢'
    },
    {
      path: '/education',
      label: 'חינוך ותרבות',
      icon: '📚'
    },
    {
      path: '/carpool',
      label: 'קארפול',
      icon: '🚗'
    },
    {
      path: '/lost-and-found',
      label: 'אבידות ומציאות',
      icon: lostAndFoundIcon,
      iconType: 'image'
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
