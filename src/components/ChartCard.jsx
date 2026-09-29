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
    <div className={`enterprise-card bg-white rounded-[22px] border border-[#EFECE6] flex flex-col shadow-2xs ${className}`}>
      <div className="px-5 py-4 border-b border-[#EAE6DF]/70 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-[#5F6368] mt-0.5 font-normal">
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
