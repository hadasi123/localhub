// Alert component - Presentation Layer

import React from 'react';

const Alert = ({ 
  children, 
  type = 'info', 
  className = '', 
  onClose,
  ...props 
}) => {
  const typeClasses = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  const classes = [
    'alert',
    typeClasses[type],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
