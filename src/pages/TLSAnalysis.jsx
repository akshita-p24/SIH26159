import React from 'react';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import { ShieldCheck, AlertTriangle, Lock, ShieldAlert, Info, ArrowUpRight } from 'lucide-react';

export default function TLSAnalysis() {
  return (
    <div className="space-y-6">
      {/* Top Observation Alert Banner */}
      <div className="p-4 rounded-[10px] bg-[#EDDEC2] border border-[#d8c3a1] flex items-start gap-3">
        <div className="p-2 rounded bg-[#32004B] text-[#EDDEC2] mt-0.5 flex-shrink-0">
          <Info size={18} />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#32004B] font-mono">
            Security Observation
          </h3>
          <p className="text-xs text-[#242126] mt-0.5 leading-relaxed">
            "Legacy TLS and weak cryptographic configurations were detected in a subset of analyzed connections."
          </p>
        </div>
      </div>

      {/* Main Grid: Coverage Gauge + TLS Distribution + Cipher Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Large TLS Coverage Gauge */}
        <div className="lg:col-span-4">
          <ChartCard
            title="TLS Coverage"
            subtitle="Overall ratio of encrypted email transport sessions"
            className="h-full"
          >
            <div className="flex flex-col items-center justify-center py-4">
              {/* Large Radial Dial for 94% */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E5DFD8"
                    strokeWidth="8"
                  />
                  {/* 94% of circumference 251.2 = 236.128, offset = 15.07 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#32004B"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.94)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold text-[#17151A] tracking-tight font-sans">
                    94%
                  </span>
                  <span className="text-[11px] font-semibold text-[#77727A] max-w-[110px] leading-tight mt-1">
                    Encrypted Traffic Coverage
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-[#242126] font-medium">
                  43 of 46 handshakes authenticated
                </span>
              </div>

              <div className="w-full mt-4 pt-3 border-t border-[#E5DFD8] text-center text-[11px] text-[#77727A]">
                Target Threshold: <strong className="text-[#17151A]">≥ 90.0%</strong> (Compliant)
              </div>
            </div>
          </ChartCard>
        </div>

        {/* TLS Version Distribution Chart */}
        <div className="lg:col-span-4">
          <ChartCard
            title="TLS Version Distribution"
            subtitle="Breakdown of negotiated TLS protocols in stream"
            className="h-full"
          >
            <div className="space-y-4 py-2">
              {/* TLS 1.3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#17151A] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#32004B]" />
                    TLS 1.3
                  </span>
                  <span className="font-bold text-[#17151A] font-mono">65% (30 sessions)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#E5DFD8]/60">
                  <div className="bg-[#32004B] h-3 rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="text-[10px] text-[#166534] font-medium block">
                  Recommended • Perfect Forward Secrecy enforced
                </span>
              </div>

              {/* TLS 1.2 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#17151A] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#77727A]" />
                    TLS 1.2
                  </span>
                  <span className="font-bold text-[#17151A] font-mono">29% (13 sessions)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#E5DFD8]/60">
                  <div className="bg-[#77727A] h-3 rounded-full" style={{ width: '29%' }} />
                </div>
                <span className="text-[10px] text-[#77727A] font-medium block">
                  Acceptable • Subject to cipher suite restrictions
                </span>
              </div>

              {/* TLS 1.0 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#DD6E2D] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#DD6E2D]" />
                    TLS 1.0 (Obsolete)
                  </span>
                  <span className="font-bold text-[#DD6E2D] font-mono">6% (3 sessions)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#DD6E2D]/30">
                  <div className="bg-[#DD6E2D] h-3 rounded-full" style={{ width: '6%' }} />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#DD6E2D] font-bold">
                  <AlertTriangle size={11} />
                  <span>DEPRECATED • Violates PCI-DSS 4.0 / RFC 8996</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Cipher Suite Classification Horizontal Bar Chart */}
        <div className="lg:col-span-4">
          <ChartCard
            title="Cipher Suite Classification"
            subtitle="NIST SP 800-52r2 cryptographic strength ratings"
            className="h-full"
          >
            <div className="space-y-4 py-2">
              {/* Strong */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#17151A] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#166534]" />
                    Strong (AEAD)
                  </span>
                  <span className="font-bold text-[#166534] font-mono">67.4% (31 suites)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#E5DFD8]/60">
                  <div className="bg-[#166534] h-3 rounded-full" style={{ width: '67.4%' }} />
                </div>
                <span className="text-[10px] text-[#77727A] block font-mono">
                  AES-256-GCM-SHA384, CHACHA20-POLY1305
                </span>
              </div>

              {/* Acceptable */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#17151A] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#844c12]" />
                    Acceptable
                  </span>
                  <span className="font-bold text-[#844c12] font-mono">26.1% (12 suites)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#E5DFD8]/60">
                  <div className="bg-[#844c12] h-3 rounded-full" style={{ width: '26.1%' }} />
                </div>
                <span className="text-[10px] text-[#77727A] block font-mono">
                  AES-128-GCM-SHA256, ECDHE-RSA-AES128-SHA256
                </span>
              </div>

              {/* Weak */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#DD6E2D] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#DD6E2D]" />
                    Weak (Insecure)
                  </span>
                  <span className="font-bold text-[#DD6E2D] font-mono">6.5% (3 suites)</span>
                </div>
                <div className="w-full bg-[#F5F3F1] rounded-full h-3 overflow-hidden border border-[#DD6E2D]/30">
                  <div className="bg-[#DD6E2D] h-3 rounded-full" style={{ width: '6.5%' }} />
                </div>
                <span className="text-[10px] text-[#DD6E2D] block font-mono font-semibold">
                  3DES-EDE-CBC-SHA (SWEET32), RC4-MD5
                </span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* STARTTLS Usage Comparison Section */}
      <ChartCard
        title="STARTTLS Usage & Opportunistic Encryption Audit"
        subtitle="Ratio of successfully upgraded cleartext handshakes to TLS encrypted tunnels"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          {/* SMTP STARTTLS */}
          <div className="p-4 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#17151A] font-mono uppercase">SMTP (Port 587)</span>
              <span className="text-base font-extrabold text-[#166534] font-mono">95%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-[#E5DFD8]">
              <div className="bg-[#166534] h-2.5 rounded-full" style={{ width: '95%' }} />
            </div>
            <div className="text-[11px] text-[#77727A] flex justify-between">
              <span>20 of 21 sessions upgraded</span>
              <span className="text-[#166534] font-semibold">Optimal</span>
            </div>
          </div>

          {/* IMAP STARTTLS */}
          <div className="p-4 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#17151A] font-mono uppercase">IMAP (Port 143/993)</span>
              <span className="text-base font-extrabold text-[#32004B] font-mono">91%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-[#E5DFD8]">
              <div className="bg-[#32004B] h-2.5 rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="text-[11px] text-[#77727A] flex justify-between">
              <span>15 of 17 sessions upgraded</span>
              <span className="text-[#32004B] font-semibold">Standard</span>
            </div>
          </div>

          {/* POP3 STARTTLS */}
          <div className="p-4 rounded-lg bg-[#EDDEC2]/40 border border-[#d8c3a1] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#17151A] font-mono uppercase">POP3 (Port 110/995)</span>
              <span className="text-base font-extrabold text-[#DD6E2D] font-mono">72%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-[#E5DFD8]">
              <div className="bg-[#DD6E2D] h-2.5 rounded-full" style={{ width: '72%' }} />
            </div>
            <div className="text-[11px] text-[#77727A] flex justify-between">
              <span>6 of 8 sessions upgraded</span>
              <span className="text-[#DD6E2D] font-semibold">Deficient (2 cleartext)</span>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
