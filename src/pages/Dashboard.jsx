import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ProtocolCard from '../components/ProtocolCard';
import FindingTable from '../components/FindingTable';
import Button from '../components/Button';
import SecurityBadge from '../components/SecurityBadge';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileBadge2,
  Network,
  ArrowRight,
  ArrowLeft,
  Activity,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  // Historical assessment points for the Security Score Trend line chart
  const trendData = [
    { date: 'Sep 12', score: 84 },
    { date: 'Sep 16', score: 81 },
    { date: 'Sep 20', score: 79 },
    { date: 'Sep 24', score: 75 },
    { date: 'Sep 27', score: 70 },
    { date: 'Sep 29', score: 72 },
  ];

  return (
    <div className="space-y-5">
      {/* Top Banner with Animated Arrow Indicator pointing towards the sidebar */}
      <div className="bg-white border border-[#EFECE6] rounded-[22px] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Animated Arrow Indicator (strictly no wording) directing users to the sidebar */}
          <div
            className="w-10 h-10 rounded-full bg-[#EAE8FE] border border-[#DDD6FE] text-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-2xs"
            title="Navigate modules via sidebar"
          >
            <ArrowLeft size={18} className="animate-bounce-left" strokeWidth={2.5} />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-[#111111] tracking-tight font-sans">
                Active Assessment: secure_email.pcap
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FEF1E1] text-[#B45309] border border-[#FCE6CD] font-mono font-semibold">
                MEDIUM RISK
              </span>
            </div>
            <p className="text-xs text-[#5F6368] mt-0.5">
              1,284 packets inspected across 46 handshakes. Identified weak 3DES cipher suites and TLS 1.0 negotiations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/explainability')}
            className="rounded-full"
          >
            Explain Score
          </Button>
          <Button
            variant="brand"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/pcap')}
            className="rounded-full"
          >
            New Capture
          </Button>
        </div>
      </div>

      {/* KPI Cards Row - Reference-inspired pastel shapes & circular action pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Overall Security Score (Soft Peach) */}
        <div className="p-4 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD] flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#8C6D52] tracking-wider uppercase">
                Security Score
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] font-sans mt-1">
                72 / 100
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#8C6D52]/15 flex items-center justify-between text-xs">
            <span className="text-[#8C6D52] text-[11px]">Cryptographic ML</span>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[#8C6D52] text-[10px] font-bold">
              Medium Risk
            </span>
          </div>
        </div>

        {/* TLS Coverage (Soft Baby Blue / Periwinkle) */}
        <div className="p-4 rounded-[20px] bg-[#DDEBFF] border border-[#CDE1FE] flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#4B6B94] tracking-wider uppercase">
                TLS Coverage
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] font-sans mt-1">
                94%
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#4B6B94]/15 flex items-center justify-between text-xs">
            <span className="text-[#4B6B94] text-[11px]">43 of 46 Sessions</span>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[#4B6B94] text-[10px] font-bold">
              &gt; 90% Target
            </span>
          </div>
        </div>

        {/* Weak Ciphers (Soft Lavender) */}
        <div className="p-4 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE] flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#6D5BA8] tracking-wider uppercase">
                Weak Ciphers
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] font-sans mt-1">
                3
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#6D5BA8]/15 flex items-center justify-between text-xs">
            <span className="text-[#6D5BA8] text-[11px]">3DES & CBC suites</span>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-rose-700 text-[10px] font-bold">
              Action Req.
            </span>
          </div>
        </div>

        {/* Cert Anomalies (Soft Mint) */}
        <div className="p-4 rounded-[20px] bg-[#E3F6EC] border border-[#C8EFE0] flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#3D7A5C] tracking-wider uppercase">
                Cert Anomalies
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] font-sans mt-1">
                1
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#3D7A5C]/15 flex items-center justify-between text-xs">
            <span className="text-[#3D7A5C] text-[11px]">POP3 SAN Mismatch</span>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[#3D7A5C] text-[10px] font-bold">
              Audit Req.
            </span>
          </div>
        </div>

        {/* Connections (Clean Canvas Card) */}
        <div className="p-4 rounded-[20px] bg-white border border-[#EFECE6] flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#5F6368] tracking-wider uppercase">
                Connections
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] font-sans mt-1">
                46
              </h3>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-xs">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#EAE6DF] flex items-center justify-between text-xs">
            <span className="text-[#5F6368] text-[11px]">SMTP, IMAP, POP3</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FAF9F7] text-[#5F6368] text-[10px] font-bold">
              All Streams
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row: Score Gauge + Trend Line Chart + Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Security Score Visualization (Radial Gauge) - CLEAN ALIGNMENT */}
        <div className="lg:col-span-4">
          <ChartCard
            title="Posture Score Breakdown"
            subtitle="Weighted score across cipher strength, TLS & certificates"
            className="h-full"
          >
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F3F0FF"
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
                    strokeDashoffset={238.76 * (1 - 0.72)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold text-[#111111] tracking-tight font-sans">
                    72
                  </span>
                  <span className="text-[10px] font-semibold text-[#80868B] uppercase tracking-wider mt-0.5">
                    Score / 100
                  </span>
                </div>
              </div>

              {/* Status pill clearly separated and never hidden */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <SecurityBadge level="MEDIUM RISK" size="sm" />
                <span className="text-xs text-[#5F6368] font-medium">
                  Moderate Threat Vector
                </span>
              </div>

              {/* Score Breakdown Metrics */}
              <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-[#EAE6DF] text-center">
                <div className="p-2 rounded-xl bg-[#FEF1E1] border border-[#FCE6CD]">
                  <span className="text-[10px] text-[#8C6D52] block uppercase font-medium">Cipher</span>
                  <span className="text-xs font-bold text-[#B45309]">64 / 100</span>
                </div>
                <div className="p-2 rounded-xl bg-[#ECEAFD] border border-[#DDD6FE]">
                  <span className="text-[10px] text-[#6D5BA8] block uppercase font-medium">Protocol</span>
                  <span className="text-xs font-bold text-[#7C3AED]">76 / 100</span>
                </div>
                <div className="p-2 rounded-xl bg-[#E3F6EC] border border-[#C8EFE0]">
                  <span className="text-[10px] text-[#3D7A5C] block uppercase font-medium">Cert PKI</span>
                  <span className="text-xs font-bold text-[#15803D]">88 / 100</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Security Score Trend Line Chart (Purple/Lavender Theme) */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Security Score Trend"
            subtitle="Historical assessment runs over the last 30 days"
            action={
              <span className="text-xs font-mono text-[#80868B]">
                6 Runs
              </span>
            }
            className="h-full"
          >
            <div className="h-44 w-full flex flex-col justify-between pt-2">
              <div className="relative h-32 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#EAE6DF" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="#EAE6DF" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="320" y2="100" stroke="#EAE6DF" strokeDasharray="3 3" />

                  {/* Soft Lavender shaded area */}
                  <polygon
                    points="20,40 80,48 140,54 200,66 260,80 300,74 300,110 20,110"
                    fill="#ECEAFD"
                    fillOpacity="0.8"
                  />

                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.5"
                    points="20,40 80,48 140,54 200,66 260,80 300,74"
                  />

                  {[
                    { cx: 20, cy: 40, val: 84 },
                    { cx: 80, cy: 48, val: 81 },
                    { cx: 140, cy: 54, val: 79 },
                    { cx: 200, cy: 66, val: 75 },
                    { cx: 260, cy: 80, val: 70 },
                    { cx: 300, cy: 74, val: 72, active: true },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={pt.active ? "5" : "3.5"}
                        fill={pt.active ? "#7C3AED" : "#111111"}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.cx}
                        y={pt.cy - 7}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight={pt.active ? "bold" : "normal"}
                        fill={pt.active ? "#7C3AED" : "#111111"}
                        fontFamily="monospace"
                      >
                        {pt.val}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-[#80868B] font-mono border-t border-[#EAE6DF] pt-2">
                {trendData.map((d, i) => (
                  <span key={i} className={i === trendData.length - 1 ? 'font-bold text-[#7C3AED]' : ''}>
                    {d.date}
                  </span>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Key Findings Breakdown */}
        <div className="lg:col-span-3">
          <ChartCard
            title="Findings by Severity"
            subtitle="Summary of flagged deficiencies"
            className="h-full"
          >
            <div className="space-y-2.5 py-1">
              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-2xl border border-rose-200 bg-rose-50/60 hover:bg-rose-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div>
                    <div className="text-xs font-bold text-[#111111]">HIGH SEVERITY</div>
                    <div className="text-[11px] text-[#5F6368]">3DES Cipher</div>
                  </div>
                </div>
                <span className="text-base font-bold text-rose-700 font-mono">1</span>
              </div>

              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-2xl border border-amber-200 bg-[#FEF1E1] hover:bg-[#FDE8D0] transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div>
                    <div className="text-xs font-bold text-[#111111]">MEDIUM SEVERITY</div>
                    <div className="text-[11px] text-[#5F6368]">TLS 1.0 & Cert Failure</div>
                  </div>
                </div>
                <span className="text-base font-bold text-amber-800 font-mono">2</span>
              </div>

              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-2xl border border-[#DDD6FE] bg-[#ECEAFD] hover:bg-[#E2DEFC] transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                  <div>
                    <div className="text-xs font-bold text-[#111111]">LOW SEVERITY</div>
                    <div className="text-[11px] text-[#5F6368]">STARTTLS & DH-1024</div>
                  </div>
                </div>
                <span className="text-base font-bold text-[#7C3AED] font-mono">2</span>
              </div>

              <button
                onClick={() => navigate('/findings')}
                className="w-full mt-1.5 pt-2 text-xs font-semibold text-[#5F6368] hover:text-[#7C3AED] flex items-center justify-center gap-1 border-t border-[#EAE6DF] transition-colors cursor-pointer"
              >
                <span>View All Findings</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Protocol Security Overview Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
              Protocol Security Posture
            </h3>
            <p className="text-xs text-[#5F6368]">
              Posture summary across SMTP, IMAP, and POP3 mail layers
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/protocols')}
            className="rounded-full"
          >
            Protocol Details
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProtocolCard
            protocol="SMTP"
            status="SECURE"
            connections={21}
            tlsVersion="TLS 1.3"
            cipherSuite="AES-256-GCM"
            starttls="Enabled"
            certificate="Valid"
            aiRisk="Low"
            description="Outbound MTA Relay (Port 587)"
            onInspect={() => navigate('/protocols')}
          />

          <ProtocolCard
            protocol="IMAP"
            status="WARNING"
            connections={17}
            tlsVersion="TLS 1.2"
            cipherSuite="AES-128-GCM"
            starttls="Enabled"
            certificate="Valid"
            aiRisk="Medium"
            description="Mailbox Access Stream (Port 993)"
            onInspect={() => navigate('/protocols')}
          />

          <ProtocolCard
            protocol="POP3"
            status="CRITICAL"
            connections={8}
            tlsVersion="TLS 1.0"
            cipherSuite="Weak Cipher"
            starttls="Misconfigured"
            certificate="Issue Detected"
            aiRisk="High"
            description="Legacy Ingestion (Port 995)"
            onInspect={() => navigate('/protocols')}
          />
        </div>
      </div>

      {/* Recent Vulnerability Stream */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
              Recent Cryptographic Findings
            </h3>
            <p className="text-xs text-[#5F6368]">
              Live detection table from current capture
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/findings')}
            className="rounded-full"
          >
            Full Findings Table
          </Button>
        </div>

        <FindingTable showFilters={false} initialLimit={3} />
      </div>
    </div>
  );
}
