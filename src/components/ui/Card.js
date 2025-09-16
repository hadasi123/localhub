// Card component - Presentation Layer

import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  const classes = [
    'card',
    hover ? 'hover:shadow-lg transition-shadow' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  const classes = ['card-header', className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  const classes = ['card-title', className].filter(Boolean).join(' ');
  
  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  );
};

const CardBody = ({ children, className = '', ...props }) => {
  const classes = ['card-body', className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  const classes = ['card-footer', className].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardBody, CardFooter };
export default Card;
