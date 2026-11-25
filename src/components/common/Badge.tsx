import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'red' | 'sage' | 'neutral' | 'forest';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    green: 'bg-[#557A65]/10 text-[#304F40] border-[#557A65]/25',
    amber: 'bg-[#D9A85C]/15 text-[#8F6627] border-[#D9A85C]/35',
    red: 'bg-[#C87570]/15 text-[#913B36] border-[#C87570]/30',
    sage: 'bg-[#A7BBA9]/25 text-[#304F40] border-[#A7BBA9]/40',
    forest: 'bg-[#304F40] text-[#EFF2EF] border-[#304F40]',
    neutral: 'bg-[#EFF2EF] text-[#77817A] border-[#E5EAE5]',
  };

  const dotColors = {
    green: 'bg-[#557A65]',
    amber: 'bg-[#D9A85C]',
    red: 'bg-[#C87570]',
    sage: 'bg-[#557A65]',
    forest: 'bg-[#A7BBA9]',
    neutral: 'bg-[#77817A]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]} ${
            variant === 'green' || variant === 'amber' ? 'animate-pulse' : ''
          }`}
        />
      )}
      {children}
    </span>
  );
};
