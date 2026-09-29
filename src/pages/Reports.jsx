import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { downloadCSV, downloadJSON, downloadReportDoc } from '../utils/exportUtils';
import { INITIAL_FINDINGS } from '../components/FindingTable';
import {
  FileText,
  FileDown,
  FileJson,
  FileSpreadsheet,
  CheckCircle2,
  Shield,
  Printer,
  Calendar,
  ShieldAlert,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function Reports() {
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const reportData = {
    title: 'SecureMailScope Cryptographic Security Assessment',
    assessmentDate: '2026-09-29',
    pcapSource: 'secure_email.pcap',
    overallRisk: 'MEDIUM',
    score: 72,
    protocols: 'SMTP · IMAP · POP3',
    findingsSummary: {
      high: 1,
      medium: 2,
      low: 3,
      total: 6
    },
    keyObservations: [
      'Weak 3DES cipher detected on external SMTP connector (SWEET32 CVE-2016-2183)',
      'TLS 1.0 connection observed on POP3 port 995 (RFC 8996 violation)',
      'Certificate validation mismatch on POP3 hostname Subject Alternative Name'
    ],
    recommendations: [
      'Disable obsolete TLS versions (TLS 1.0 & TLS 1.1 across all mail daemons)',
      'Remove weak cipher suites (Deprecate 3DES and RC4 in cipher lists)',
      'Enforce modern TLS configurations (TLS 1.3 with AES-256-GCM / CHACHA20)',
      'Ensure auto-renewed certificates with valid SAN extensions'
    ]
  };

  const handleExport = (type) => {
    if (type === 'JSON') {
      downloadJSON('securemailscope_audit_report.json', reportData);
      setDownloadSuccess('JSON report downloaded successfully.');
    } else if (type === 'CSV') {
      const csvData = [
        ...INITIAL_FINDINGS.map(f => ({
          Category: 'Finding',
          ID: f.id,
          Severity: f.severity,
          Item: f.finding,
          Protocol: f.protocol,
          Details: f.evidence,
          Remediation: f.remediation
        })),
        ...reportData.recommendations.map((rec, i) => ({
          Category: 'Recommendation',
          ID: `REC-${i + 1}`,
          Severity: 'INFO',
          Item: rec,
          Protocol: 'All',
          Details: 'Remediation Step',
          Remediation: rec
        }))
      ];
      downloadCSV('securemailscope_audit_report.csv', csvData, [
        { header: 'Category', key: 'Category' },
        { header: 'ID', key: 'ID' },
        { header: 'Severity', key: 'Severity' },
        { header: 'Item', key: 'Item' },
        { header: 'Protocol', key: 'Protocol' },
        { header: 'Details', key: 'Details' },
        { header: 'Remediation', key: 'Remediation' }
      ]);
      setDownloadSuccess('CSV report downloaded successfully.');
    } else if (type === 'PDF' || type === 'HTML') {
      downloadReportDoc('securemailscope_audit_report.html', reportData);
      setDownloadSuccess('Assessment document downloaded successfully. You can also print/save as PDF.');
    }

    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-5">
      {/* Export Toolbar */}
      <div className="p-4 rounded-[22px] bg-white border border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
            Cryptographic Security Audit Report
          </h2>
          <p className="text-xs text-[#5F6368]">
            Export formal security assessment for audits and compliance reviews.
          </p>
        </div>

        {/* Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="brand"
            size="sm"
            icon={FileDown}
            onClick={() => handleExport('PDF')}
            className="rounded-full"
          >
            Export Report (PDF/HTML)
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileJson}
            onClick={() => handleExport('JSON')}
            className="rounded-full"
          >
            Export JSON
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={() => handleExport('CSV')}
            className="rounded-full"
          >
            Export CSV
          </Button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-full border border-[#EAE6DF] bg-white text-[#5F6368] hover:text-[#111111] hover:bg-[#FAF9F7] transition-colors cursor-pointer shadow-2xs"
            title="Print Report"
          >
            <Printer size={15} />
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Realistic Enterprise Report Preview Document in reference styling */}
      <div className="bg-white border border-[#EFECE6] rounded-[24px] shadow-sm max-w-4xl mx-auto overflow-hidden">
        {/* Document Top Bar */}
        <div className="bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#18181B] text-white px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-b-[#7C3AED]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-white flex items-center justify-center shadow-md">
              <Shield size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight font-sans text-white">
                SecureMailScope
              </h1>
              <p className="text-xs text-[#ECEAFD] font-medium">
                Cryptographic Security Assessment
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs font-mono text-slate-300">
            <div>Ref: <strong className="text-white font-bold">SMS-AUDIT-2026-0929</strong></div>
            <div className="flex items-center sm:justify-end gap-1.5 mt-0.5 text-slate-400">
              <Calendar size={12} />
              <span>Date: 2026-09-29</span>
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-7 space-y-6 text-xs text-[#111111]">
          {/* Assessment Metadata Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-[20px] bg-[#FAF9F7] border border-[#EAE6DF]">
            <div>
              <span className="text-[10px] font-semibold text-[#80868B] uppercase font-mono block">
                Target Source
              </span>
              <span className="font-mono font-bold text-xs text-[#111111]">
                secure_email.pcap
              </span>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-[#80868B] uppercase font-mono block">
                Overall Risk Score
              </span>
              <div className="mt-0.5 flex items-center gap-2">
                <SecurityBadge level="MEDIUM RISK" size="xs" />
                <span className="font-mono text-xs font-bold text-[#B45309]">(72/100)</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-[#80868B] uppercase font-mono block">
                Evaluated Protocols
              </span>
              <span className="font-mono font-bold text-xs text-[#111111]">
                SMTP · IMAP · POP3
              </span>
            </div>
          </div>

          {/* Findings Summary Stats */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono border-b border-[#EAE6DF] pb-1.5">
              Findings Summary
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-[20px] bg-rose-50 border border-rose-200">
                <span className="text-xs font-semibold text-rose-700 uppercase block">High Severity</span>
                <span className="text-2xl font-bold text-rose-800 font-mono mt-0.5 block">1</span>
                <span className="text-[10px] text-[#5F6368]">3DES Cipher</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD]">
                <span className="text-xs font-semibold text-[#B45309] uppercase block">Medium Severity</span>
                <span className="text-2xl font-bold text-[#92400E] font-mono mt-0.5 block">2</span>
                <span className="text-[10px] text-[#5F6368]">TLS 1.0 & Cert Anomaly</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE]">
                <span className="text-xs font-semibold text-[#7C3AED] uppercase block">Low Severity</span>
                <span className="text-2xl font-bold text-[#6D28D9] font-mono mt-0.5 block">3</span>
                <span className="text-[10px] text-[#5F6368]">STARTTLS & DH-1024</span>
              </div>
            </div>
          </div>

          {/* Key Observations */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono border-b border-[#EAE6DF] pb-1.5">
              Key Observations
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3.5 rounded-[18px] bg-white border border-[#EAE6DF] shadow-2xs">
                <ShieldAlert size={16} className="text-rose-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#111111] block">Weak cipher detected</strong>
                  <span className="text-[#5F6368]">
                    Legacy 3DES block cipher (`TLS_RSA_WITH_3DES_EDE_CBC_SHA`) negotiated on external SMTP connector (SWEET32 CVE-2016-2183).
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-[18px] bg-white border border-[#EAE6DF] shadow-2xs">
                <AlertTriangle size={16} className="text-[#B45309] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#111111] block">TLS 1.0 handshake observed</strong>
                  <span className="text-[#5F6368]">
                    Deprecated protocol handshake observed on 3 POP3 client connections on port 995 (RFC 8996).
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-[18px] bg-white border border-[#EAE6DF] shadow-2xs">
                <Info size={16} className="text-[#7C3AED] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#111111] block">Certificate validation issue</strong>
                  <span className="text-[#5F6368]">
                    POP3 endpoint certificate failed hostname Subject Alternative Name (SAN) validation.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono border-b border-[#EAE6DF] pb-1.5">
              Remediation Directives
            </h3>
            <div className="space-y-2">
              {[
                { num: '1', title: 'Disable obsolete TLS versions', text: 'Deprecate TLS 1.0 and TLS 1.1 across all inbound and outbound email daemons.' },
                { num: '2', title: 'Remove weak cipher suites', text: 'Explicitly remove 3DES, RC4, and static RSA key exchange algorithms from cipher suites.' },
                { num: '3', title: 'Enforce modern TLS configurations', text: 'Prioritize TLS 1.3 with AES-256-GCM, AES-128-GCM, and CHACHA20-POLY1305 with PFS.' },
                { num: '4', title: 'Ensure valid certificates', text: 'Automate certificate renewals and verify all mail-routing FQDNs match SAN entries.' }
              ].map((rec) => (
                <div key={rec.num} className="flex items-start gap-3 p-3 rounded-[18px] bg-[#FEF1E1]/60 border border-[#FCE6CD]">
                  <span className="w-5 h-5 rounded-full bg-[#111111] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono">
                    {rec.num}
                  </span>
                  <div>
                    <strong className="text-[#111111] block">{rec.title}</strong>
                    <span className="text-[#5F6368]">{rec.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="px-7 py-3.5 bg-[#FAF9F7] border-t border-[#EAE6DF] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#80868B] font-mono gap-1">
          <span>SecureMailScope Posture Engine v2.4</span>
          <span>NIST SP 800-52r2 · RFC 8461 Compliant</span>
        </div>
      </div>
    </div>
  );
}
