import React from 'react';
import { ShieldAlert, AlertTriangle, CircleAlert, Info, ShieldCheck } from 'lucide-react';

export default function SecurityBadge({ level, showIcon = true, size = 'sm', className = '' }) {
  const normalized = String(level).toUpperCase();

  const configs = {
    HIGH: {
      bg: 'bg-[#DD6E2D]/10',
      text: 'text-[#DD6E2D]',
      border: 'border-[#DD6E2D]/30',
      icon: ShieldAlert,
      label: 'HIGH'
    },
    CRITICAL: {
      bg: 'bg-[#b91c1c]/10',
      text: 'text-[#b91c1c]',
      border: 'border-[#b91c1c]/30',
      icon: ShieldAlert,
      label: 'CRITICAL'
    },
    MEDIUM: {
      bg: 'bg-[#EDDEC2]',
      text: 'text-[#844c12]',
      border: 'border-[#d8c3a1]',
      icon: AlertTriangle,
      label: 'MEDIUM'
    },
    'MEDIUM RISK': {
      bg: 'bg-[#EDDEC2]',
      text: 'text-[#844c12]',
      border: 'border-[#d8c3a1]',
      icon: AlertTriangle,
      label: 'MEDIUM RISK'
    },
    LOW: {
      bg: 'bg-[#F5F3F1]',
      text: 'text-[#77727A]',
      border: 'border-[#E5DFD8]',
      icon: Info,
      label: 'LOW'
    },
    'LOW RISK': {
      bg: 'bg-[#e2f3e8]',
      text: 'text-[#1e6f40]',
      border: 'border-[#c1e6cd]',
      icon: ShieldCheck,
      label: 'LOW RISK'
    },
    WARNING: {
      bg: 'bg-[#EDDEC2]',
      text: 'text-[#844c12]',
      border: 'border-[#d8c3a1]',
      icon: CircleAlert,
      label: 'WARNING'
    },
    SECURE: {
      bg: 'bg-[#e7f7ed]',
      text: 'text-[#166534]',
      border: 'border-[#bbf0cb]',
      icon: ShieldCheck,
      label: 'SECURE'
    },
    MODERN: {
      bg: 'bg-[#e7f7ed]',
      text: 'text-[#166534]',
      border: 'border-[#bbf0cb]',
      icon: ShieldCheck,
      label: 'MODERN'
    },
    WEAK: {
      bg: 'bg-[#DD6E2D]/10',
      text: 'text-[#DD6E2D]',
      border: 'border-[#DD6E2D]/30',
      icon: ShieldAlert,
      label: 'WEAK'
    }
  };

  const config = configs[normalized] || {
    bg: 'bg-[#F5F3F1]',
    text: 'text-[#242126]',
    border: 'border-[#E5DFD8]',
    icon: Info,
    label: normalized
  };

  const IconComponent = config.icon;
  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-1.5 py-0.5 font-semibold gap-1' 
    : 'text-xs px-2 py-0.5 font-semibold gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {showIcon && <IconComponent size={size === 'xs' ? 10 : 12} strokeWidth={2.5} />}
      <span>{config.label}</span>
    </span>
  );
}
