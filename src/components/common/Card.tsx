import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'accent' | 'outlined';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border-[#E5EAE5] shadow-card',
    muted: 'bg-[#EFF2EF] border-[#E5EAE5]',
    accent: 'bg-[#304F40] text-white border-transparent shadow-elevated',
    outlined: 'bg-transparent border-[#E5EAE5]',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:shadow-elevated hover:border-[#D0D8D1] hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`rounded-card border p-4 sm:p-5 ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
