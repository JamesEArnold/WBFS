"use client";

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) => {
  
  const baseStyles = "inline-flex items-center justify-center font-bold transition-colors duration-200";
  
  const variantStyles = {
    default: "bg-black text-[#fcd34b] hover:bg-gray-800",
    primary: "bg-[#fcd34b] text-black hover:bg-[#f7c948]",
    secondary: "bg-white text-black border border-gray-300 hover:bg-gray-100",
    outline: "bg-transparent text-black border-2 border-[#fcd34b] hover:bg-[#fcd34b] hover:text-black",
  };
  
  const sizeStyles = {
    sm: "text-sm py-2 px-4 rounded-md",
    md: "text-base py-3 px-6 rounded-md",
    lg: "text-lg py-4 px-8 rounded-md",
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button; 
