"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withYellowBorder?: boolean;
  withHoverEffect?: boolean;
}

const Card = ({ 
  children, 
  className = '', 
  withYellowBorder = false,
  withHoverEffect = false
}: CardProps) => {
  const baseStyles = "bg-white rounded-md shadow-md overflow-hidden";
  const borderStyles = withYellowBorder ? "border-l-4 border-[#fcd34b]" : "";
  const hoverStyles = withHoverEffect ? "transition-transform duration-200 hover:scale-[1.02]" : "";
  
  return (
    <div className={`${baseStyles} ${borderStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3 className={`text-xl font-bold mb-2 ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return (
    <div className={`p-6 pt-0 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent, CardFooter }; 
