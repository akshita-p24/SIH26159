import React from 'react';

export default function StatCard({
  title,
  value,
  status,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'default',
  highlight = false,
  className = ''
}) {
  return (
    <div
      className={`enterprise-card p-4 relative overflow-hidden transition-all duration-150 ${
        highlight ? 'border-l-4 border-l-[#DD6E2D] bg-[#FFFFFF]' : 'bg-white'
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#77727A] tracking-wider uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-[#17151A] font-sans">
              {value}
            </h3>
            {status && (
              <span className="text-xs font-medium text-[#77727A]">
                {status}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="p-2 rounded-md bg-[#F5F3F1] text-[#0B192C] border border-[#E5DFD8]">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-2.5 pt-2.5 border-t border-[#E5DFD8]/60 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-[#77727A] truncate font-normal">
              {subtitle}
            </span>
          )}
          {badgeText && (
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                badgeType === 'warning'
                  ? 'bg-[#EDDEC2] text-[#844c12]'
                  : badgeType === 'danger'
                  ? 'bg-[#DD6E2D]/15 text-[#DD6E2D]'
                  : 'bg-[#F5F3F1] text-[#77727A]'
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
