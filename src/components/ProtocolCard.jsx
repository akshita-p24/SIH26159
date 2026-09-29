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
      className={`enterprise-card bg-white p-5 flex flex-col justify-between transition-all duration-150 hover:shadow-sm ${
        isCritical
          ? 'border-[#DD6E2D]/40'
          : isWarning
          ? 'border-[#d8c3a1]'
          : 'border-[#E5DFD8]'
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0B192C] text-[#EDDEC2] flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
              <Mail size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#17151A] tracking-tight">
                  {protocol}
                </h3>
                <span className="text-xs text-[#77727A] font-mono">
                  {connections} conns
                </span>
              </div>
              <p className="text-xs text-[#77727A]">
                {description || `${protocol} Email Transport Stream`}
              </p>
            </div>
          </div>
          <SecurityBadge level={status} />
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-2 gap-3 py-4 text-xs">
          <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-[#77727A]">
              <Lock size={13} />
              <span className="font-medium">TLS Version</span>
            </div>
            <div className="font-semibold text-[#17151A] flex items-center gap-1.5 font-mono">
              <span>{tlsVersion}</span>
              {tlsVersion === 'TLS 1.0' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#DD6E2D]/15 text-[#DD6E2D] font-sans font-bold">
                  OBSOLETE
                </span>
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-[#77727A]">
              <KeyRound size={13} />
              <span className="font-medium">Cipher Suite</span>
            </div>
            <div className={`font-semibold font-mono truncate ${cipherSuite.includes('Weak') ? 'text-[#DD6E2D]' : 'text-[#17151A]'}`} title={cipherSuite}>
              {cipherSuite}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-[#77727A]">
              <ShieldCheck size={13} />
              <span className="font-medium">STARTTLS</span>
            </div>
            <div className={`font-semibold ${starttls === 'Misconfigured' ? 'text-[#DD6E2D]' : 'text-[#17151A]'}`}>
              {starttls}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-[#77727A]">
              <FileBadge2 size={13} />
              <span className="font-medium">Certificate</span>
            </div>
            <div className={`font-semibold ${certificate.includes('Issue') ? 'text-[#DD6E2D]' : 'text-[#17151A]'}`}>
              {certificate}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer / AI Risk */}
      <div className="pt-3 border-t border-[#E5DFD8] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#EDDEC2] text-[#0B192C]">
            <Cpu size={14} />
          </div>
          <span className="text-xs text-[#77727A]">AI Risk Assessment:</span>
          <span className={`text-xs font-bold ${
            aiRisk === 'High' ? 'text-[#DD6E2D]' : aiRisk === 'Medium' ? 'text-[#844c12]' : 'text-[#166534]'
          }`}>
            {aiRisk}
          </span>
        </div>

        {onInspect && (
          <button
            onClick={() => onInspect(protocol)}
            className="text-xs font-semibold text-[#0B192C] hover:text-[#DD6E2D] inline-flex items-center gap-1 transition-colors"
          >
            <span>Telemetry</span>
            <ArrowUpRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
