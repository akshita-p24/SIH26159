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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none rounded-full cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#111111] hover:bg-black active:bg-black text-white shadow-xs focus:ring-black/20',
    brand: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-xs focus:ring-[#7C3AED]/30',
    secondary: 'bg-[#FEF1E1] hover:bg-[#FDE8D0] text-[#111111] border border-[#FCE6CD] focus:ring-[#FEF1E1]/40 font-medium',
    outline: 'border border-[#EAE6DF] bg-white hover:bg-[#FAF9F7] text-[#111111] focus:ring-black/10',
    ghost: 'text-[#5F6368] hover:text-[#111111] hover:bg-black/5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 15} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 15} />}
    </button>
  );
}
