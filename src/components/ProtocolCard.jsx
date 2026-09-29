import React from 'react';
import SecurityBadge from './SecurityBadge';
import { Mail, ShieldCheck, KeyRound, Lock, FileBadge2, Cpu, ArrowUpRight } from 'lucide-react';

export default function ProtocolCard({
  protocol,
  status,
  connections,
  tlsVersion,
  cipherSuite,
  starttls,
  certificate,
  aiRisk,
  description,
  onInspect
}) {
  const isCritical = status === 'CRITICAL';
  const isWarning = status === 'WARNING';

  return (
    <div
      className={`enterprise-card bg-white p-5 rounded-[22px] flex flex-col justify-between transition-all duration-150 shadow-2xs ${
        isCritical
          ? 'border-rose-200'
          : isWarning
          ? 'border-[#FCE6CD]'
          : 'border-[#EFECE6]'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#EAE6DF]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Mail size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#111111] tracking-tight font-sans">
                  {protocol}
                </h3>
                <span className="text-xs text-[#80868B] font-mono">
                  {connections} streams
                </span>
              </div>
              <p className="text-xs text-[#5F6368]">
                {description || `${protocol} Transport Stream`}
              </p>
            </div>
          </div>
          <SecurityBadge level={status} />
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-3.5 text-xs">
          <div className="p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EAE6DF] space-y-1">
            <div className="flex items-center gap-1.5 text-[#5F6368]">
              <Lock size={12} />
              <span className="font-medium text-[11px]">TLS Version</span>
            </div>
            <div className="font-semibold text-[#111111] flex items-center gap-1.5 font-mono text-xs">
              <span>{tlsVersion}</span>
              {tlsVersion === 'TLS 1.0' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 font-sans font-semibold">
                  Obsolete
                </span>
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EAE6DF] space-y-1">
            <div className="flex items-center gap-1.5 text-[#5F6368]">
              <KeyRound size={12} />
              <span className="font-medium text-[11px]">Cipher Suite</span>
            </div>
            <div className={`font-semibold font-mono text-xs truncate ${cipherSuite.includes('Weak') ? 'text-rose-600' : 'text-[#111111]'}`} title={cipherSuite}>
              {cipherSuite}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EAE6DF] space-y-1">
            <div className="flex items-center gap-1.5 text-[#5F6368]">
              <ShieldCheck size={12} />
              <span className="font-medium text-[11px]">STARTTLS</span>
            </div>
            <div className={`font-semibold text-xs ${starttls === 'Misconfigured' ? 'text-[#B45309]' : 'text-[#111111]'}`}>
              {starttls}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF9F7] border border-[#EAE6DF] space-y-1">
            <div className="flex items-center gap-1.5 text-[#5F6368]">
              <FileBadge2 size={12} />
              <span className="font-medium text-[11px]">Certificate</span>
            </div>
            <div className={`font-semibold text-xs ${certificate.includes('Issue') ? 'text-rose-600' : 'text-[#111111]'}`}>
              {certificate}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer / AI Risk */}
      <div className="pt-3 border-t border-[#EAE6DF]/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#5F6368]">
          <Cpu size={14} className="text-[#80868B]" />
          <span>Risk:</span>
          <span className={`font-semibold ${
            aiRisk === 'High' ? 'text-rose-600' : aiRisk === 'Medium' ? 'text-[#B45309]' : 'text-[#15803D]'
          }`}>
            {aiRisk}
          </span>
        </div>

        {onInspect && (
          <button
            onClick={() => onInspect(protocol)}
            className="w-7 h-7 rounded-full bg-[#111111] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            title="View Details"
          >
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
