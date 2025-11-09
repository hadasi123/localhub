import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import addIcon from '../../assets/icons/feature-icons/add.svg';

/**
 * FloatingActionButton
 * Renders a fixed-position action button via a React Portal to document.body
 * so it remains independent of page layout/animations.
 */
const FloatingActionButton = ({ onClick, label, ariaLabel }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <Button
      onClick={onClick}
      className="fab-add"
      aria-label={ariaLabel || label}
    >
      {label}
      <img src={addIcon} alt="" aria-hidden="true" />
    </Button>,
    document.body
  );
};

export default FloatingActionButton;
