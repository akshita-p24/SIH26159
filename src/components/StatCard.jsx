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
        highlight ? 'border-l-4 border-l-[#E07A5F] bg-white' : 'bg-white'
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
              {value}
            </h3>
            {status && (
              <span className="text-xs font-medium text-[#64748B]">
                {status}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className="p-2 rounded-lg bg-[#F8FAFC] text-[#1E293B] border border-[#E2E8F0]">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>

      {(subtitle || badgeText) && (
        <div className="mt-2.5 pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-[#64748B] truncate font-normal">
              {subtitle}
            </span>
          )}
          {badgeText && (
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                badgeType === 'warning'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : badgeType === 'danger'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
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
