"use client";

import React from 'react';

// Sheriff Central icon system
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon = ({ name, size = 24, color = 'currentColor', className = '' }: IconProps) => {
  // This is a placeholder for Sheriff Central's icon system
  // We'll import the appropriate icons from lucide-react or other sources
  
  return (
    <span className={`inline-flex ${className}`} style={{ width: size, height: size, color }}>
      {/* Icon content will go here */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Default icon shape if name doesn't match */}
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  );
};

export default Icon;

// Export a convenient SheriffStar icon used in the campaign
export const SheriffStar = ({ size = 24, color = '#fcd34b', className = '' }: Omit<IconProps, 'name'>) => {
  return (
    <span className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
      >
        <path d="M12 2L14.2 8.3L21 8.5L15.5 12.7L17 19L12 15.6L7 19L8.5 12.7L3 8.5L9.8 8.3L12 2Z" />
      </svg>
    </span>
  );
}; 
