import React, { useState } from 'react';
import ProtocolCard from '../components/ProtocolCard';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { Network, Shield, AlertTriangle, ShieldAlert, CheckCircle, ArrowRight, Layers, Lock, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Protocols() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('ALL');

  return (
    <div className="space-y-6">
      {/* Three Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ProtocolCard
          protocol="SMTP"
          status="SECURE"
          connections={21}
          tlsVersion="TLS 1.3"
          cipherSuite="AES-256-GCM"
          starttls="Enabled"
          certificate="Valid"
          aiRisk="Low"
          description="Simple Mail Transfer Protocol (RFC 5321)"
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
          description="Internet Message Access Protocol (RFC 9051)"
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
          description="Post Office Protocol Version 3 (RFC 1939)"
        />
      </div>

      {/* Protocol Matrix & Technical Comparison */}
      <ChartCard
        title="Protocol Cryptographic Posture Matrix"
        subtitle="Cross-protocol evaluation of key exchange, cipher strength and STARTTLS negotiation"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F3F1] border-b border-[#E5DFD8] text-[#77727A] uppercase font-semibold">
                <th className="py-3 px-4">Protocol</th>
                <th className="py-3 px-4">Traffic Share</th>
                <th className="py-3 px-4">Handshake TLS</th>
                <th className="py-3 px-4">AEAD Ciphers</th>
                <th className="py-3 px-4">Key Exchange</th>
                <th className="py-3 px-4">PFS (Forward Secrecy)</th>
                <th className="py-3 px-4">Risk Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD8]">
              <tr className="hover:bg-[#F5F3F1]/50">
                <td className="py-3.5 px-4 font-bold text-[#17151A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  SMTP (Outbound/Relay)
                </td>
                <td className="py-3.5 px-4 font-mono">45.6% (21/46)</td>
                <td className="py-3.5 px-4 font-mono font-semibold text-[#166534]">TLS 1.3</td>
                <td className="py-3.5 px-4 font-mono">AES-256-GCM / CHACHA20</td>
                <td className="py-3.5 px-4 font-mono">X25519 (253 bit)</td>
                <td className="py-3.5 px-4 font-semibold text-[#166534]">Guaranteed (ECDHE)</td>
                <td className="py-3.5 px-4">
                  <SecurityBadge level="SECURE" />
                </td>
              </tr>

              <tr className="hover:bg-[#F5F3F1]/50">
                <td className="py-3.5 px-4 font-bold text-[#17151A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DD6E2D]" />
                  IMAP (Mailbox Sync)
                </td>
                <td className="py-3.5 px-4 font-mono">37.0% (17/46)</td>
                <td className="py-3.5 px-4 font-mono font-semibold text-[#844c12]">TLS 1.2</td>
                <td className="py-3.5 px-4 font-mono">AES-128-GCM</td>
                <td className="py-3.5 px-4 font-mono text-[#DD6E2D]">DH-1024 (Legacy group)</td>
                <td className="py-3.5 px-4 font-semibold text-[#844c12]">Partial (Weak DH)</td>
                <td className="py-3.5 px-4">
                  <SecurityBadge level="WARNING" />
                </td>
              </tr>

              <tr className="hover:bg-[#F5F3F1]/50">
                <td className="py-3.5 px-4 font-bold text-[#17151A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]" />
                  POP3 (Legacy Ingestion)
                </td>
                <td className="py-3.5 px-4 font-mono">17.4% (8/46)</td>
                <td className="py-3.5 px-4 font-mono font-semibold text-[#DD6E2D]">TLS 1.0 (Deprecated)</td>
                <td className="py-3.5 px-4 font-mono text-[#DD6E2D]">3DES-EDE-CBC (Non-AEAD)</td>
                <td className="py-3.5 px-4 font-mono text-[#DD6E2D]">RSA Key Transport</td>
                <td className="py-3.5 px-4 font-semibold text-[#DD6E2D]">None (RSA static)</td>
                <td className="py-3.5 px-4">
                  <SecurityBadge level="CRITICAL" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Protocol Hardening Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-[10px] bg-white border border-[#E5DFD8] space-y-3">
          <h4 className="text-xs font-bold text-[#0B192C] uppercase tracking-wider font-mono">
            MTA Policy Enforcement Actions
          </h4>
          <ul className="space-y-2 text-xs text-[#242126]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD6E2D] mt-1.5 flex-shrink-0" />
              <span>
                <strong>Isolate POP3 Service:</strong> Disable port 995 completely or restrict via IP allowlist while migrating mail clients to modern IMAP/OAuth2.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD6E2D] mt-1.5 flex-shrink-0" />
              <span>
                <strong>Mandate STARTTLS RFC 8461:</strong> Enforce MTA-STS policy `mode: enforce` to prevent opportunistic downgrade attacks on port 25.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD6E2D] mt-1.5 flex-shrink-0" />
              <span>
                <strong>Upgrade IMAP DH Parameters:</strong> Migrate Dovecot key exchange configuration from standard 1024-bit primes to RFC 7919 predefined 2048/4096-bit groups.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-[10px] bg-[#EDDEC2] border border-[#d8c3a1] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#0B192C]">
              <Cpu size={18} />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                AI Cross-Protocol Synthesis
              </h4>
            </div>
            <p className="text-xs text-[#242126] mt-2 leading-relaxed">
              The overall email transport security posture is compromised primarily by legacy POP3 daemon endpoints sharing the same network egress. While SMTP achieves standard TLS 1.3 posture, an adversary with MITM capabilities can target POP3 cleartext credentials during downgrade.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8c3a1] flex justify-end">
            <Button
              variant="brand"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/ai-analysis')}
            >
              Analyze ML Classifiers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
