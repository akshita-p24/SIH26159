import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none rounded-[8px]';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-4 py-2.5 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#DD6E2D] hover:bg-[#c55d22] active:bg-[#b0521c] text-white shadow-sm focus:ring-[#DD6E2D]/40',
    brand: 'bg-[#0B192C] hover:bg-[#071324] text-white shadow-sm focus:ring-[#0B192C]/40',
    secondary: 'bg-[#EDDEC2] hover:bg-[#e4d2b2] text-[#0B192C] focus:ring-[#DD6E2D]/30 font-semibold',
    outline: 'border border-[#E5DFD8] bg-white hover:bg-[#F5F3F1] text-[#242126] focus:ring-[#0B192C]/20',
    ghost: 'text-[#77727A] hover:text-[#17151A] hover:bg-[#F5F3F1]'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </button>
  );
}
