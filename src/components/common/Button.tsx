import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-btn transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#557A65]/20 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none';

  const variantStyles = {
    primary: 'bg-[#557A65] text-white hover:bg-[#304F40] shadow-subtle',
    secondary: 'bg-[#EFF2EF] text-[#202923] hover:bg-[#E5EAE5] border border-[#E5EAE5]',
    outline: 'bg-white text-[#202923] border border-[#E5EAE5] hover:bg-[#F6F7F5] hover:border-[#D0D8D1]',
    ghost: 'bg-transparent text-[#77817A] hover:text-[#202923] hover:bg-[#EFF2EF]',
    danger: 'bg-[#C87570] text-white hover:bg-[#913B36] shadow-subtle',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2 h-9 sm:h-10',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 h-11',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
