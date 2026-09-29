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
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  History,
  Activity,
  ChevronRight,
  CheckCircle2,
  UploadCloud
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
    { date: 'Sep 29 (Current)', score: 72 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Assessment Context */}
      <div className="bg-[#EDDEC2] border border-[#d8c3a1] rounded-[10px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#0B192C] text-[#EDDEC2] mt-0.5">
            <Activity size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#0B192C] tracking-tight">
                Active Assessment: secure_email.pcap
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DD6E2D] text-white font-mono font-semibold">
                MEDIUM RISK
              </span>
            </div>
            <p className="text-xs text-[#242126] mt-0.5">
              1,284 packets inspected across 46 TLS handshakes. AI classifier detected obsolete 3DES cipher suites and TLS 1.0 negotiations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/explainability')}
          >
            Explain Score (SHAP)
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/pcap')}
          >
            New Capture
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Overall Security Score */}
        <StatCard
          title="Overall Security Score"
          value="72 / 100"
          status="MEDIUM RISK"
          subtitle="Assessed via Cryptographic ML"
          icon={ShieldCheck}
          badgeText="Medium Risk"
          badgeType="warning"
          highlight={true}
        />

        {/* TLS Coverage */}
        <StatCard
          title="TLS Coverage"
          value="94%"
          status="Encrypted"
          subtitle="43 of 46 Sessions TLS"
          icon={Lock}
          badgeText="Target > 90%"
        />

        {/* Weak Ciphers */}
        <StatCard
          title="Weak Ciphers"
          value="3"
          status="Flagged"
          subtitle="3DES & CBC-mode detected"
          icon={KeyRound}
          badgeText="Action Req."
          badgeType="danger"
        />

        {/* Certificate Issues */}
        <StatCard
          title="Certificate Issues"
          value="1"
          status="Warning"
          subtitle="POP3 Validation Mismatch"
          icon={FileBadge2}
          badgeText="Audit Required"
          badgeType="warning"
        />

        {/* Network Connections */}
        <StatCard
          title="Network Connections"
          value="46"
          status="Inspected"
          subtitle="SMTP: 21 | IMAP: 17 | POP3: 8"
          icon={Network}
          badgeText="Full Stream"
        />
      </div>

      {/* Visual Analytics Row: Score Gauge + Trend Line Chart + Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Security Score Visualization (Radial Gauge) */}
        <div className="lg:col-span-4">
          <ChartCard
            title="Cryptographic Posture Meter"
            subtitle="Calculated based on cipher strength, protocol version & certificates"
            className="h-full"
          >
            <div className="flex flex-col items-center justify-center py-2">
              {/* Semi-circular SVG gauge */}
              <div className="relative w-48 h-32 flex items-center justify-center">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E5DFD8"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6" /* half circle */
                    strokeLinecap="round"
                  />
                  {/* Score Arc: 72% of 125.6 = 90.4 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#DD6E2D"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={125.6 + (125.6 * (1 - 0.72))}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score Centered Display */}
                <div className="absolute top-10 flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#17151A] tracking-tight font-sans">
                    72
                  </span>
                  <span className="text-[11px] font-semibold text-[#77727A] uppercase tracking-wider">
                    Score / 100
                  </span>
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-1 flex items-center gap-2">
                <SecurityBadge level="MEDIUM RISK" size="sm" />
                <span className="text-xs text-[#77727A] font-medium">
                  Moderate Threat Vector
                </span>
              </div>

              {/* Score Breakdown Metrics */}
              <div className="w-full grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[#E5DFD8] text-center">
                <div className="p-2 rounded bg-[#F5F3F1]">
                  <span className="text-[10px] text-[#77727A] block uppercase font-medium">Cipher</span>
                  <span className="text-xs font-bold text-[#DD6E2D]">64 / 100</span>
                </div>
                <div className="p-2 rounded bg-[#F5F3F1]">
                  <span className="text-[10px] text-[#77727A] block uppercase font-medium">Protocol</span>
                  <span className="text-xs font-bold text-[#844c12]">76 / 100</span>
                </div>
                <div className="p-2 rounded bg-[#F5F3F1]">
                  <span className="text-[10px] text-[#77727A] block uppercase font-medium">Cert PKI</span>
                  <span className="text-xs font-bold text-[#166534]">88 / 100</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Security Score Trend Line Chart */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Security Score Trend"
            subtitle="Historical assessment points over the last 30 days"
            action={
              <span className="text-xs font-mono text-[#77727A] flex items-center gap-1">
                <History size={13} /> 6 PCAP Runs
              </span>
            }
            className="h-full"
          >
            <div className="h-48 w-full flex flex-col justify-between pt-2">
              {/* SVG Trend Line Chart */}
              <div className="relative h-36 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#E5DFD8" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="#E5DFD8" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="320" y2="100" stroke="#E5DFD8" strokeDasharray="3 3" />

                  {/* Shaded Area under Curve */}
                  <polygon
                    points="20,40 80,48 140,54 200,66 260,80 300,74 300,110 20,110"
                    fill="#EDDEC2"
                    fillOpacity="0.4"
                  />

                  {/* Trend Path */}
                  <polyline
                    fill="none"
                    stroke="#0B192C"
                    strokeWidth="2.5"
                    points="20,40 80,48 140,54 200,66 260,80 300,74"
                  />

                  {/* Data Points */}
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
                        fill={pt.active ? "#DD6E2D" : "#0B192C"}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.cx}
                        y={pt.cy - 8}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight={pt.active ? "bold" : "normal"}
                        fill={pt.active ? "#DD6E2D" : "#17151A"}
                        fontFamily="monospace"
                      >
                        {pt.val}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[10px] text-[#77727A] font-mono border-t border-[#E5DFD8] pt-2">
                {trendData.map((d, i) => (
                  <span key={i} className={i === trendData.length - 1 ? 'font-bold text-[#DD6E2D]' : ''}>
                    {d.date}
                  </span>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Key Findings Panel */}
        <div className="lg:col-span-3">
          <ChartCard
            title="Key Findings Breakdown"
            subtitle="Aggregated by cryptographic severity"
            className="h-full"
          >
            <div className="space-y-3 py-1">
              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-lg border border-[#DD6E2D]/30 bg-[#DD6E2D]/5 hover:bg-[#DD6E2D]/10 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DD6E2D]" />
                  <div>
                    <div className="text-xs font-bold text-[#17151A]">HIGH SEVERITY</div>
                    <div className="text-[11px] text-[#77727A]">3DES SWEET32 Cipher</div>
                  </div>
                </div>
                <span className="text-lg font-bold text-[#DD6E2D] font-mono">1</span>
              </div>

              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-lg border border-[#d8c3a1] bg-[#EDDEC2]/40 hover:bg-[#EDDEC2]/60 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#844c12]" />
                  <div>
                    <div className="text-xs font-bold text-[#17151A]">MEDIUM SEVERITY</div>
                    <div className="text-[11px] text-[#77727A]">TLS 1.0 & Cert Failure</div>
                  </div>
                </div>
                <span className="text-lg font-bold text-[#844c12] font-mono">2</span>
              </div>

              <div
                onClick={() => navigate('/findings')}
                className="p-3 rounded-lg border border-[#E5DFD8] bg-[#F5F3F1] hover:bg-[#eae6e1] transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#77727A]" />
                  <div>
                    <div className="text-xs font-bold text-[#17151A]">LOW SEVERITY</div>
                    <div className="text-[11px] text-[#77727A]">STARTTLS & 1024-DH</div>
                  </div>
                </div>
                <span className="text-lg font-bold text-[#242126] font-mono">3</span>
              </div>

              <button
                onClick={() => navigate('/findings')}
                className="w-full mt-2 py-2 text-xs font-semibold text-[#0B192C] hover:text-[#DD6E2D] flex items-center justify-center gap-1 border-t border-[#E5DFD8] transition-colors"
              >
                <span>View All 6 Findings</span>
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
            <h3 className="text-sm font-bold text-[#17151A] tracking-tight font-sans">
              Protocol Security Overview
            </h3>
            <p className="text-xs text-[#77727A]">
              Cryptographic posture across SMTP, IMAP, and POP3 mail transmission layers
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/protocols')}
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
            description="Outbound MTA Relay (Port 587 / 25)"
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
            description="Legacy Ingest Endpoint (Port 995)"
            onInspect={() => navigate('/protocols')}
          />
        </div>
      </div>

      {/* Recent Vulnerability Stream */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#17151A] tracking-tight font-sans">
              Critical Cryptographic Vulnerabilities
            </h3>
            <p className="text-xs text-[#77727A]">
              Live detection table with automated packet stream evidence
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/findings')}
          >
            Full Findings Table
          </Button>
        </div>

        <FindingTable showFilters={false} initialLimit={3} />
      </div>
    </div>
  );
}
