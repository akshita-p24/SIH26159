import React from 'react';

export default function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = 'p-5'
}) {
  return (
    <div className={`enterprise-card bg-white flex flex-col ${className}`}>
      <div className="px-5 py-4 border-b border-[#E5DFD8] flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-[#17151A] tracking-tight">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-[#77727A] mt-0.5 font-normal">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className={`flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
