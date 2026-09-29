import React from 'react';
import { ShieldAlert, AlertTriangle, CircleAlert, Info, ShieldCheck } from 'lucide-react';

export default function SecurityBadge({ level, showIcon = true, size = 'sm', className = '' }) {
  const normalized = String(level).toUpperCase();

  const configs = {
    HIGH: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: ShieldAlert,
      label: 'HIGH'
    },
    CRITICAL: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: ShieldAlert,
      label: 'CRITICAL'
    },
    MEDIUM: {
      bg: 'bg-[#FEF1E1]',
      text: 'text-[#B45309]',
      border: 'border-[#FCE6CD]',
      icon: AlertTriangle,
      label: 'MEDIUM'
    },
    'MEDIUM RISK': {
      bg: 'bg-[#FEF1E1]',
      text: 'text-[#B45309]',
      border: 'border-[#FCE6CD]',
      icon: AlertTriangle,
      label: 'MEDIUM RISK'
    },
    LOW: {
      bg: 'bg-[#ECEAFD]',
      text: 'text-[#7C3AED]',
      border: 'border-[#DDD6FE]',
      icon: Info,
      label: 'LOW'
    },
    'LOW RISK': {
      bg: 'bg-[#E3F6EC]',
      text: 'text-[#15803D]',
      border: 'border-[#C8EFE0]',
      icon: ShieldCheck,
      label: 'LOW RISK'
    },
    WARNING: {
      bg: 'bg-[#FEF1E1]',
      text: 'text-[#B45309]',
      border: 'border-[#FCE6CD]',
      icon: CircleAlert,
      label: 'WARNING'
    },
    SECURE: {
      bg: 'bg-[#E3F6EC]',
      text: 'text-[#15803D]',
      border: 'border-[#C8EFE0]',
      icon: ShieldCheck,
      label: 'SECURE'
    },
    MODERN: {
      bg: 'bg-[#E3F6EC]',
      text: 'text-[#15803D]',
      border: 'border-[#C8EFE0]',
      icon: ShieldCheck,
      label: 'MODERN'
    },
    WEAK: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: ShieldAlert,
      label: 'WEAK'
    }
  };

  const config = configs[normalized] || {
    bg: 'bg-[#FAF9F7]',
    text: 'text-[#111111]',
    border: 'border-[#EAE6DF]',
    icon: Info,
    label: normalized
  };

  const IconComponent = config.icon;
  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5 font-medium gap-1' 
    : 'text-xs px-2.5 py-0.5 font-medium gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {showIcon && <IconComponent size={size === 'xs' ? 10 : 12} strokeWidth={2.2} />}
      <span>{config.label}</span>
    </span>
  );
}
