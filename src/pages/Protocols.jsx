import React, { useState } from 'react';
import ProtocolCard from '../components/ProtocolCard';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { downloadCSV } from '../utils/exportUtils';
import { Cpu, ArrowRight, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Protocols() {
  const navigate = useNavigate();
  const [exportNotice, setExportNotice] = useState(null);

  const protocolMatrix = [
    {
      Protocol: 'SMTP (Outbound/Relay)',
      TrafficShare: '45.6% (21/46)',
      TLSVersion: 'TLS 1.3',
      Ciphers: 'AES-256-GCM / CHACHA20',
      KeyExchange: 'X25519 (253 bit)',
      PFS: 'Guaranteed (ECDHE)',
      Risk: 'SECURE'
    },
    {
      Protocol: 'IMAP (Mailbox Sync)',
      TrafficShare: '37.0% (17/46)',
      TLSVersion: 'TLS 1.2',
      Ciphers: 'AES-128-GCM',
      KeyExchange: 'DH-1024 (Legacy)',
      PFS: 'Partial (Weak DH)',
      Risk: 'WARNING'
    },
    {
      Protocol: 'POP3 (Legacy Ingestion)',
      TrafficShare: '17.4% (8/46)',
      TLSVersion: 'TLS 1.0 (Deprecated)',
      Ciphers: '3DES-EDE-CBC (Non-AEAD)',
      KeyExchange: 'RSA Key Transport',
      PFS: 'None (Static RSA)',
      Risk: 'CRITICAL'
    }
  ];

  const handleExportMatrix = () => {
    downloadCSV('protocol_cryptographic_matrix.csv', protocolMatrix, [
      { header: 'Protocol', key: 'Protocol' },
      { header: 'Traffic Share', key: 'TrafficShare' },
      { header: 'Handshake TLS', key: 'TLSVersion' },
      { header: 'Ciphers', key: 'Ciphers' },
      { header: 'Key Exchange', key: 'KeyExchange' },
      { header: 'PFS (Forward Secrecy)', key: 'PFS' },
      { header: 'Risk Status', key: 'Risk' }
    ]);
    setExportNotice('Protocol posture matrix exported to CSV.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Three Protocol Cards */}
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
          description="Outbound Mail Transfer (RFC 5321)"
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
          description="Message Access (RFC 9051)"
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
          description="Legacy Mail Ingest (RFC 1939)"
        />
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Protocol Matrix & Technical Comparison */}
      <ChartCard
        title="Protocol Cryptographic Matrix"
        subtitle="Cross-protocol evaluation of TLS, cipher strength, and key exchanges"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={handleExportMatrix}
            className="rounded-full"
          >
            Export Matrix (CSV)
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF9F7] border-b border-[#EAE6DF] text-[#5F6368] uppercase font-semibold">
                <th className="py-3.5 px-4">Protocol</th>
                <th className="py-3.5 px-4">Traffic Share</th>
                <th className="py-3.5 px-4">Handshake TLS</th>
                <th className="py-3.5 px-4">AEAD Ciphers</th>
                <th className="py-3.5 px-4">Key Exchange</th>
                <th className="py-3.5 px-4">Forward Secrecy</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]/60">
              {protocolMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F7]/70">
                  <td className="py-3.5 px-4 font-semibold text-[#111111] flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      row.Risk === 'SECURE' ? 'bg-emerald-500' : row.Risk === 'WARNING' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    {row.Protocol}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5F6368]">{row.TrafficShare}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#111111]">{row.TLSVersion}</td>
                  <td className="py-3.5 px-4 font-mono text-[#5F6368]">{row.Ciphers}</td>
                  <td className={`py-3.5 px-4 font-mono ${row.Risk === 'CRITICAL' ? 'text-rose-600' : row.Risk === 'WARNING' ? 'text-[#B45309]' : 'text-[#5F6368]'}`}>
                    {row.KeyExchange}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#5F6368]">{row.PFS}</td>
                  <td className="py-3.5 px-4">
                    <SecurityBadge level={row.Risk} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Protocol Hardening Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-[#EFECE6] space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">
            Remediation Actions
          </h4>
          <ul className="space-y-2.5 text-xs text-[#5F6368]">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
              <span>
                <strong className="text-[#111111]">Isolate POP3 Service:</strong> Disable port 995 or restrict via allowlist while migrating mail clients to modern IMAP.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
              <span>
                <strong className="text-[#111111]">Mandate STARTTLS:</strong> Enforce MTA-STS policy `mode: enforce` on SMTP port 25.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
              <span>
                <strong className="text-[#111111]">Upgrade IMAP DH:</strong> Replace 1024-bit DH primes with 2048-bit groups or ECDHE (X25519).
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-[22px] bg-[#ECEAFD] border border-[#DDD6FE] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 text-[#111111]">
              <Cpu size={18} className="text-[#7C3AED]" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                AI Cross-Protocol Summary
              </h4>
            </div>
            <p className="text-xs text-[#5F6368] mt-2.5 leading-relaxed">
              Transport posture is primarily compromised by legacy POP3 endpoints. While SMTP achieves standard TLS 1.3 posture, POP3 downgrade risks remain unmitigated.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DDD6FE]/60 flex justify-end">
            <Button
              variant="brand"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/ai-analysis')}
              className="rounded-full"
            >
              Analyze ML Models
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
