import React from 'react';
import ChartCard from '../components/ChartCard';
import { AlertTriangle, Info } from 'lucide-react';

export default function TLSAnalysis() {
  return (
    <div className="space-y-5">
      {/* Top Observation Alert Banner in soft peach */}
      <div className="p-4 rounded-[22px] bg-[#FEF1E1] border border-[#FCE6CD] flex items-start gap-3.5 shadow-2xs">
        <div className="p-2 rounded-xl bg-[#111111] text-white mt-0.5 flex-shrink-0">
          <Info size={18} />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
            Security Observation
          </h3>
          <p className="text-xs text-[#5F6368] mt-0.5 leading-relaxed">
            Legacy TLS 1.0 and 3DES cipher suites were detected in 3 connections on legacy ingestion port 995.
          </p>
        </div>
      </div>

      {/* Main Grid: Coverage Gauge + TLS Distribution + Cipher Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* TLS Coverage Gauge */}
        <div className="lg:col-span-4">
          <ChartCard
            title="TLS Coverage"
            subtitle="Ratio of encrypted email transport sessions"
            className="h-full"
          >
            <div className="flex flex-col items-center justify-center py-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#ECEAFD"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#7C3AED"
                    strokeWidth="8"
                    strokeDasharray="238.76"
                    strokeDashoffset={238.76 * (1 - 0.94)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-[#111111] tracking-tight font-sans">
                    94%
                  </span>
                  <span className="text-[10px] font-semibold text-[#80868B] max-w-[90px] leading-tight mt-0.5">
                    Encrypted Traffic
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-[#5F6368] font-medium">
                  43 of 46 handshakes authenticated
                </span>
              </div>

              <div className="w-full mt-3 pt-3 border-t border-[#EAE6DF] text-center text-[11px] text-[#80868B]">
                Target: <strong className="text-[#111111]">≥ 90%</strong> (Compliant)
              </div>
            </div>
          </ChartCard>
        </div>

        {/* TLS Version Distribution Chart */}
        <div className="lg:col-span-4">
          <ChartCard
            title="TLS Version Distribution"
            subtitle="Negotiated protocols across captured sessions"
            className="h-full"
          >
            <div className="space-y-3.5 py-1">
              {/* TLS 1.3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#111111] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    TLS 1.3
                  </span>
                  <span className="font-bold text-[#111111] font-mono">65% (30 sessions)</span>
                </div>
                <div className="w-full bg-[#ECEAFD] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#7C3AED] h-2.5 rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="text-[10px] text-[#15803D] font-medium block">
                  Recommended • Perfect Forward Secrecy enforced
                </span>
              </div>

              {/* TLS 1.2 */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#111111] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#94A3B8]" />
                    TLS 1.2
                  </span>
                  <span className="font-bold text-[#111111] font-mono">29% (13 sessions)</span>
                </div>
                <div className="w-full bg-[#FAF9F7] rounded-full h-2.5 overflow-hidden border border-[#EAE6DF]">
                  <div className="bg-[#94A3B8] h-2.5 rounded-full" style={{ width: '29%' }} />
                </div>
                <span className="text-[10px] text-[#80868B] font-medium block">
                  Acceptable • Standard configuration
                </span>
              </div>

              {/* TLS 1.0 */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-rose-600 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    TLS 1.0 (Obsolete)
                  </span>
                  <span className="font-bold text-rose-600 font-mono">6% (3 sessions)</span>
                </div>
                <div className="w-full bg-rose-50 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '6%' }} />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-rose-600 font-semibold">
                  <AlertTriangle size={11} />
                  <span>Deprecated • RFC 8996 Violation</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Cipher Suite Classification Horizontal Bar Chart */}
        <div className="lg:col-span-4">
          <ChartCard
            title="Cipher Suite Classification"
            subtitle="NIST SP 800-52r2 cryptographic strength"
            className="h-full"
          >
            <div className="space-y-3.5 py-1">
              {/* Strong */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#111111] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                    Strong (AEAD)
                  </span>
                  <span className="font-bold text-[#15803D] font-mono">67.4% (31 suites)</span>
                </div>
                <div className="w-full bg-[#E3F6EC] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#15803D] h-2.5 rounded-full" style={{ width: '67.4%' }} />
                </div>
                <span className="text-[10px] text-[#80868B] block font-mono">
                  AES-256-GCM, CHACHA20-POLY1305
                </span>
              </div>

              {/* Acceptable */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#111111] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                    Acceptable
                  </span>
                  <span className="font-bold text-[#B45309] font-mono">26.1% (12 suites)</span>
                </div>
                <div className="w-full bg-[#FEF1E1] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#B45309] h-2.5 rounded-full" style={{ width: '26.1%' }} />
                </div>
                <span className="text-[10px] text-[#80868B] block font-mono">
                  AES-128-GCM-SHA256
                </span>
              </div>

              {/* Weak */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-rose-600 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Weak (Insecure)
                  </span>
                  <span className="font-bold text-rose-600 font-mono">6.5% (3 suites)</span>
                </div>
                <div className="w-full bg-rose-50 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '6.5%' }} />
                </div>
                <span className="text-[10px] text-rose-600 block font-mono font-semibold">
                  3DES-EDE-CBC (SWEET32)
                </span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* STARTTLS Usage Comparison Section */}
      <ChartCard
        title="Opportunistic STARTTLS Audit"
        subtitle="Upgraded cleartext handshakes vs plain text sessions"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-1">
          {/* SMTP STARTTLS (Soft Mint) */}
          <div className="p-4 rounded-[20px] bg-[#E3F6EC] border border-[#C8EFE0] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111111] font-mono uppercase">SMTP (Port 587)</span>
              <span className="text-base font-extrabold text-[#15803D] font-mono">95%</span>
            </div>
            <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden">
              <div className="bg-[#15803D] h-2 rounded-full" style={{ width: '95%' }} />
            </div>
            <div className="text-[11px] text-[#3D7A5C] flex justify-between">
              <span>20 of 21 upgraded</span>
              <span className="font-bold">Optimal</span>
            </div>
          </div>

          {/* IMAP STARTTLS (Soft Lavender) */}
          <div className="p-4 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111111] font-mono uppercase">IMAP (Port 993)</span>
              <span className="text-base font-extrabold text-[#7C3AED] font-mono">91%</span>
            </div>
            <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden">
              <div className="bg-[#7C3AED] h-2 rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="text-[11px] text-[#6D5BA8] flex justify-between">
              <span>15 of 17 upgraded</span>
              <span className="font-bold">Standard</span>
            </div>
          </div>

          {/* POP3 STARTTLS (Soft Peach) */}
          <div className="p-4 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111111] font-mono uppercase">POP3 (Port 995)</span>
              <span className="text-base font-extrabold text-[#B45309] font-mono">72%</span>
            </div>
            <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden">
              <div className="bg-[#B45309] h-2 rounded-full" style={{ width: '72%' }} />
            </div>
            <div className="text-[11px] text-[#8C6D52] flex justify-between">
              <span>6 of 8 upgraded</span>
              <span className="font-bold text-rose-700">2 Cleartext</span>
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
