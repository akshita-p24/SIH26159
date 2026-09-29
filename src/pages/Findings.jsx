import React, { useState } from 'react';
import FindingTable, { INITIAL_FINDINGS } from '../components/FindingTable';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { downloadCSV, downloadJSON } from '../utils/exportUtils';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileSpreadsheet,
  FileJson,
  ArrowDownToLine,
  ArrowUpRight
} from 'lucide-react';

export default function Findings() {
  const [downloadNotice, setDownloadNotice] = useState(null);

  const handleExport = (format) => {
    if (format === 'CSV') {
      const columns = [
        { header: 'Finding ID', key: 'id' },
        { header: 'Severity', key: 'severity' },
        { header: 'Finding Title', key: 'finding' },
        { header: 'Protocol', key: 'protocol' },
        { header: 'Evidence', key: 'evidence' },
        { header: 'Status', key: 'status' },
        { header: 'CVE / Reference', key: 'cve' },
        { header: 'Packet Offset', key: 'packetOffset' },
        { header: 'Impact', key: 'impact' },
        { header: 'Remediation', key: 'remediation' }
      ];
      downloadCSV('securemailscope_findings.csv', INITIAL_FINDINGS, columns);
      setDownloadNotice('Findings exported to CSV successfully.');
    } else if (format === 'JSON') {
      downloadJSON('securemailscope_findings.json', INITIAL_FINDINGS);
      setDownloadNotice('Findings exported to JSON successfully.');
    }

    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Findings Statistics & Action Header - PROPERLY ALIGNED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* High Severity Card */}
        <div className="p-4 rounded-[20px] bg-rose-50 border border-rose-200 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider font-mono">
                High Severity
              </span>
              <div className="text-2xl font-bold text-rose-800 mt-1 font-sans">1 Finding</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldAlert size={16} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-rose-200/60 text-[11px] text-rose-700 font-medium">
            SWEET32 3DES Cipher
          </div>
        </div>

        {/* Medium Severity Card */}
        <div className="p-4 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD] flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#B45309] uppercase tracking-wider font-mono">
                Medium Severity
              </span>
              <div className="text-2xl font-bold text-[#92400E] mt-1 font-sans">2 Findings</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FDE8D0] text-[#B45309] flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#FCE6CD] text-[11px] text-[#B45309] font-medium">
            TLS 1.0 & Certificate SAN
          </div>
        </div>

        {/* Low Severity Card */}
        <div className="p-4 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE] flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#7C3AED] uppercase tracking-wider font-mono">
                Low Severity
              </span>
              <div className="text-2xl font-bold text-[#6D28D9] mt-1 font-sans">2 Findings</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#DDD6FE] text-[#7C3AED] flex items-center justify-center">
              <Info size={16} />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#DDD6FE]/60 text-[11px] text-[#7C3AED] font-medium">
            STARTTLS & DH Group 1024
          </div>
        </div>

        {/* Total Issues & Clean Export Action Buttons Card */}
        <div className="p-4 rounded-[20px] bg-[#111111] text-white flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Total Issues
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-white">5 Findings</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white font-mono">
              Ready
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => handleExport('CSV')}
              className="flex-1 py-1.5 px-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <ArrowDownToLine size={13} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExport('JSON')}
              className="py-1.5 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors cursor-pointer border border-white/10"
            >
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Export notification popup */}
      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Primary Enterprise Vulnerability Table */}
      <ChartCard
        title="Detected Cryptographic Deficiencies"
        subtitle="Identified protocol, cipher, and certificate security findings"
        action={
          <span className="text-xs text-[#80868B] font-mono hidden sm:inline">
            Source: secure_email.pcap
          </span>
        }
      >
        <FindingTable showFilters={true} />
      </ChartCard>
    </div>
  );
}
