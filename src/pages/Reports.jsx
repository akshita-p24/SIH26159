import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import {
  FileText,
  FileDown,
  FileJson,
  FileSpreadsheet,
  CheckCircle2,
  Shield,
  Printer,
  Calendar,
  User,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';

export default function Reports() {
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const reportData = {
    title: 'SecureMailScope Cryptographic Security Assessment',
    assessmentDate: '2026-09-29T15:39:44Z',
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
      'Weak cipher detected (TLS_RSA_WITH_3DES_EDE_CBC_SHA)',
      'TLS 1.0 connection detected (RFC 8996 violation on POP3)',
      'Certificate issue detected (Host validation mismatch on POP3 root)'
    ],
    recommendations: [
      'Disable obsolete TLS versions (TLS 1.0 & TLS 1.1)',
      'Remove weak cipher suites (Deprecate 3DES and RC4 entirely)',
      'Enforce modern TLS configurations (TLS 1.3 with AES-256-GCM / CHACHA20)',
      'Ensure valid and auto-renewed certificates with proper SAN extensions'
    ]
  };

  const handleExport = (type) => {
    if (type === 'JSON') {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'securemailscope_audit_report.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    setDownloadSuccess(`Generated ${type} report successfully.`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Export Toolbar */}
      <div className="p-4 rounded-[10px] bg-white border border-[#E5DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#17151A] tracking-tight font-sans">
            Formal Cryptographic Security Audit Report
          </h2>
          <p className="text-xs text-[#77727A]">
            Generated audit document for CISOs, SecOps teams, and compliance auditors (PCI-DSS, NIST SP800)
          </p>
        </div>

        {/* Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={FileDown}
            onClick={() => handleExport('PDF')}
          >
            Export PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileJson}
            onClick={() => handleExport('JSON')}
          >
            Export JSON
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={() => handleExport('CSV')}
          >
            Export CSV
          </Button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-[8px] border border-[#E5DFD8] text-[#77727A] hover:text-[#17151A] hover:bg-[#F5F3F1] transition-colors"
            title="Print Report"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{downloadSuccess} Check your downloads folder.</span>
        </div>
      )}

      {/* Realistic Enterprise Report Preview Document */}
      <div className="bg-white border border-[#E5DFD8] rounded-[10px] shadow-sm max-w-4xl mx-auto overflow-hidden">
        {/* Document Top Bar */}
        <div className="bg-[#32004B] text-white px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-4 border-b-[#DD6E2D]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#DD6E2D] text-white flex items-center justify-center shadow-md">
              <Shield size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight font-sans text-white">
                SecureMailScope
              </h1>
              <p className="text-xs text-[#EDDEC2] font-medium tracking-wide">
                Cryptographic Security Assessment
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 font-mono text-[#EDDEC2]/90">
            <div>Document Ref: <strong className="text-white">SMS-AUDIT-2026-0929</strong></div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Calendar size={12} />
              <span>Assessment Date: 2026-09-29</span>
            </div>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8 space-y-8 text-xs text-[#242126]">
          {/* Assessment Metadata Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
            <div>
              <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono block">
                PCAP Target
              </span>
              <span className="font-mono font-bold text-sm text-[#17151A]">
                secure_email.pcap
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono block">
                Overall Risk Assessment
              </span>
              <div className="mt-1 flex items-center gap-2">
                <SecurityBadge level="MEDIUM RISK" />
                <span className="font-mono text-xs font-bold text-[#844c12]">(72/100)</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono block">
                Evaluated Protocols
              </span>
              <span className="font-mono font-bold text-sm text-[#32004B]">
                SMTP · IMAP · POP3
              </span>
            </div>
          </div>

          {/* Findings Summary Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#17151A] uppercase tracking-wider font-mono border-b border-[#E5DFD8] pb-1.5">
              Findings Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-[#DD6E2D]/10 border border-[#DD6E2D]/30">
                <span className="text-xs font-bold text-[#DD6E2D] uppercase block">High Severity</span>
                <span className="text-3xl font-extrabold text-[#DD6E2D] font-mono mt-1 block">1</span>
                <span className="text-[10px] text-[#77727A]">3DES Cipher</span>
              </div>

              <div className="p-4 rounded-lg bg-[#EDDEC2] border border-[#d8c3a1]">
                <span className="text-xs font-bold text-[#844c12] uppercase block">Medium Severity</span>
                <span className="text-3xl font-extrabold text-[#844c12] font-mono mt-1 block">2</span>
                <span className="text-[10px] text-[#77727A]">TLS 1.0 & Cert Anomaly</span>
              </div>

              <div className="p-4 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                <span className="text-xs font-bold text-[#77727A] uppercase block">Low Severity</span>
                <span className="text-3xl font-extrabold text-[#242126] font-mono mt-1 block">3</span>
                <span className="text-[10px] text-[#77727A]">STARTTLS & DH-1024</span>
              </div>
            </div>
          </div>

          {/* Key Observations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#17151A] uppercase tracking-wider font-mono border-b border-[#E5DFD8] pb-1.5">
              Key Observations
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E5DFD8]">
                <ShieldAlert size={16} className="text-[#DD6E2D] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#17151A] block">Weak cipher detected</strong>
                  <span className="text-[#77727A]">
                    Legacy 64-bit Triple-DES block cipher (`TLS_RSA_WITH_3DES_EDE_CBC_SHA`) negotiated on external SMTP connector, exposing sessions to CVE-2016-2183 SWEET32.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E5DFD8]">
                <AlertTriangle size={16} className="text-[#844c12] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#17151A] block">TLS 1.0 connection detected</strong>
                  <span className="text-[#77727A]">
                    Insecure protocol handshake observed across 3 POP3 client connections on port 995, violating IETF RFC 8996 deprecation standards.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E5DFD8]">
                <Info size={16} className="text-[#844c12] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#17151A] block">Certificate issue detected</strong>
                  <span className="text-[#77727A]">
                    POP3 endpoint certificate failed hostname Subject Alternative Name (SAN) validation, exposing users to potential MITM impersonation.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#17151A] uppercase tracking-wider font-mono border-b border-[#E5DFD8] pb-1.5">
              Strategic Remediation Directives
            </h3>
            <div className="space-y-2">
              {[
                { num: '1', title: 'Disable obsolete TLS versions', text: 'Deprecate TLS 1.0 and TLS 1.1 across all inbound and outbound email daemons (Postfix, Sendmail, Dovecot).' },
                { num: '2', title: 'Remove weak cipher suites', text: 'Explicitly remove 3DES, RC4, and static RSA key exchange algorithms from SSL cipher list configurations.' },
                { num: '3', title: 'Enforce modern TLS configurations', text: 'Prioritize TLS 1.3 with AES-256-GCM, AES-128-GCM, and CHACHA20-POLY1305. Mandate Perfect Forward Secrecy via ECDHE (curve X25519).' },
                { num: '4', title: 'Ensure valid and auto-renewed certificates', text: 'Automate ACME certificate renewals with full intermediate chain bundling and verify all mail-routing FQDNs match SAN entries.' }
              ].map((rec) => (
                <div key={rec.num} className="flex items-start gap-3 p-3 rounded-lg bg-[#EDDEC2]/40 border border-[#EDDEC2]">
                  <span className="w-5 h-5 rounded-full bg-[#32004B] text-[#EDDEC2] font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono">
                    {rec.num}
                  </span>
                  <div>
                    <strong className="text-[#17151A] block">{rec.title}</strong>
                    <span className="text-[#242126]">{rec.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="px-8 py-4 bg-[#F5F3F1] border-t border-[#E5DFD8] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77727A] font-mono gap-2">
          <span>SecureMailScope SaaS Posture Engine v2.4</span>
          <span>Complies with NIST SP 800-52 Rev 2 & RFC 8461</span>
        </div>
      </div>
    </div>
  );
}
