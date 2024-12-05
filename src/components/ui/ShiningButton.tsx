import React from 'react';

const ShiningButton = ({ children, className }: { children: React.ReactNode, className: React.StyleHTMLAttributes<HTMLButtonElement> }) => {
  return (
    <button className={`shining-button ${className}`}>
      {children}
    </button>
  );
};

export default ShiningButton;
