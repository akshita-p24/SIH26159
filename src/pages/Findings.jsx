import React, { useState } from 'react';
import FindingTable, { INITIAL_FINDINGS } from '../components/FindingTable';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import {
  ShieldAlert,
  AlertTriangle,
  CircleAlert,
  Info,
  Download,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  ArrowDownToLine
} from 'lucide-react';

export default function Findings() {
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleExport = (format) => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 2800);
  };

  return (
    <div className="space-y-6">
      {/* Findings Statistics & Action Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-[10px] bg-white border border-[#DD6E2D]/40 border-l-4 border-l-[#DD6E2D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono">
              High Severity
            </span>
            <div className="text-xl font-bold text-[#DD6E2D] mt-0.5">1 Finding</div>
          </div>
          <div className="p-2 rounded bg-[#DD6E2D]/10 text-[#DD6E2D]">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="p-4 rounded-[10px] bg-white border border-[#d8c3a1] border-l-4 border-l-[#844c12] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono">
              Medium Severity
            </span>
            <div className="text-xl font-bold text-[#844c12] mt-0.5">2 Findings</div>
          </div>
          <div className="p-2 rounded bg-[#EDDEC2] text-[#844c12]">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="p-4 rounded-[10px] bg-white border border-[#E5DFD8] border-l-4 border-l-[#77727A] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono">
              Low Severity
            </span>
            <div className="text-xl font-bold text-[#242126] mt-0.5">2 Findings</div>
          </div>
          <div className="p-2 rounded bg-[#F5F3F1] text-[#77727A]">
            <Info size={20} />
          </div>
        </div>

        <div className="p-4 rounded-[10px] bg-[#32004B] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#EDDEC2] uppercase font-mono">
              Total Deficiencies
            </span>
            <div className="text-xl font-bold font-mono mt-0.5">5 Issues</div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowDownToLine}
            onClick={() => handleExport('CSV')}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Export notification popup */}
      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>Exporting findings table to encrypted CSV format for SIEM/SOAR ingestion.</span>
        </div>
      )}

      {/* Primary Enterprise Vulnerability Table */}
      <ChartCard
        title="Detected Cryptographic Vulnerabilities"
        subtitle="Detailed packet evidence and remediation directives"
        action={
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#77727A] font-mono hidden sm:inline">
              Source: secure_email.pcap (46 Streams)
            </span>
          </div>
        }
      >
        <FindingTable showFilters={true} />
      </ChartCard>
    </div>
  );
}
