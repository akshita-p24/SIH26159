import React, { useState } from 'react';
import SecurityBadge from './SecurityBadge';
import { Search, Filter, ChevronRight, X, ShieldAlert, ArrowUpDown, ExternalLink, Terminal } from 'lucide-react';

export const INITIAL_FINDINGS = [
  {
    id: 'FND-001',
    severity: 'HIGH',
    finding: 'Weak cipher suite',
    protocol: 'SMTP',
    evidence: 'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
    status: 'Open',
    cve: 'CVE-2016-2183 (SWEET32)',
    packetOffset: '0x0048F2',
    impact: 'Triple-DES 64-bit block cipher allows birthday attacks leading to plaintext recovery over high-volume sessions.',
    remediation: 'Deprecate 3DES in postfix/sendmail ciphersuite. Enforce modern AEAD ciphers (e.g. ECDHE-ECDSA-AES256-GCM-SHA384).'
  },
  {
    id: 'FND-002',
    severity: 'MEDIUM',
    finding: 'TLS 1.0 detected',
    protocol: 'IMAP',
    evidence: 'TLSv1.0 handshake',
    status: 'Active',
    cve: 'RFC 8996 Deprecation',
    packetOffset: '0x001B09',
    impact: 'Deprecated transport layer protocol lacks modern mitigation against BEAST and POODLE downgrade attacks.',
    remediation: 'Configure dovecot/courier `ssl_min_protocol = TLSv1.2` or preferably TLSv1.3 exclusively.'
  },
  {
    id: 'FND-003',
    severity: 'MEDIUM',
    finding: 'Certificate issue',
    protocol: 'POP3',
    evidence: 'Certificate validation failure',
    status: 'Investigating',
    cve: 'CWE-295 (Improper Validation)',
    packetOffset: '0x0083C0',
    impact: 'Mail client handshake presented an expired intermediate CA or self-signed root anchor without SAN match.',
    remediation: 'Renew and deploy ACME automated certificate chain via Let\'s Encrypt or corporate PKI.'
  },
  {
    id: 'FND-004',
    severity: 'LOW',
    finding: 'STARTTLS misconfiguration',
    protocol: 'SMTP',
    evidence: 'STARTTLS negotiation inconsistency',
    status: 'In Review',
    cve: 'RFC 3207 Audit',
    packetOffset: '0x00C721',
    impact: 'Opportunistic STARTTLS command was advertised without mandatory enforcement, permitting potential STRIPTLS downgrade.',
    remediation: 'Enforce MTA-STS (RFC 8461) and DANE TLSA DNS records to mandate encrypted transmission.'
  },
  {
    id: 'FND-005',
    severity: 'LOW',
    finding: 'Weak key exchange',
    protocol: 'IMAP',
    evidence: 'Legacy DH parameters',
    status: 'Monitoring',
    cve: 'Logjam Vulnerability',
    packetOffset: '0x00E2B4',
    impact: 'Diffie-Hellman parameter group size is 1024-bit, falling short of current NIST 2048-bit minimum threshold.',
    remediation: 'Regenerate DH group parameters: `openssl dhparam -out dhparams.pem 2048` or switch to ECDHE curves (X25519).'
  }
];

export default function FindingTable({ showFilters = true, initialLimit = null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedFinding, setSelectedFinding] = useState(null);

  const filteredFindings = INITIAL_FINDINGS.filter((item) => {
    const matchesSearch =
      item.finding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'ALL' || item.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const displayedFindings = initialLimit ? filteredFindings.slice(0, initialLimit) : filteredFindings;

  return (
    <div className="w-full">
      {/* Search and Filters Bar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77727A]" size={15} />
            <input
              type="text"
              placeholder="Search findings, evidence, protocol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5DFD8] rounded-[8px] focus:outline-none focus:border-[#DD6E2D] focus:ring-1 focus:ring-[#DD6E2D] text-[#17151A]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#77727A] flex items-center gap-1 font-medium">
              <Filter size={13} /> Severity:
            </span>
            <div className="flex gap-1">
              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSeverityFilter(lvl)}
                  className={`text-xs px-2.5 py-1 rounded-[6px] transition-colors font-medium ${
                    severityFilter === lvl
                      ? 'bg-[#0B192C] text-white'
                      : 'bg-white border border-[#E5DFD8] text-[#77727A] hover:bg-[#F5F3F1]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Vulnerability Table */}
      <div className="enterprise-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F3F1] border-b border-[#E5DFD8] text-[#77727A] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-28">Severity</th>
                <th className="py-3 px-4">Finding</th>
                <th className="py-3 px-4 w-24">Protocol</th>
                <th className="py-3 px-4">Cryptographic Evidence</th>
                <th className="py-3 px-4 w-28">Status</th>
                <th className="py-3 px-4 text-right w-16">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD8]">
              {displayedFindings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-[#77727A]">
                    No security findings match the active criteria.
                  </td>
                </tr>
              ) : (
                displayedFindings.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedFinding(item)}
                    className="hover:bg-[#F5F3F1]/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <SecurityBadge level={item.severity} />
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#17151A]">
                      <div className="flex items-center gap-1.5">
                        <span>{item.finding}</span>
                        <span className="text-[10px] text-[#77727A] font-mono">
                          [{item.id}]
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#242126]">
                      <span className="px-2 py-0.5 rounded bg-[#F5F3F1] border border-[#E5DFD8] font-mono">
                        {item.protocol}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#0B192C] text-[11px] font-medium truncate max-w-[260px]">
                      {item.evidence}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F5F3F1] text-[#242126] border border-[#E5DFD8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DD6E2D]" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <ChevronRight
                        size={15}
                        className="text-[#77727A] group-hover:text-[#DD6E2D] inline transition-transform group-hover:translate-x-0.5"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Evidence Drawer Modal */}
      {selectedFinding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#E5DFD8] shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert size={18} className="text-[#DD6E2D]" />
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Vulnerability Detail: {selectedFinding.finding}
                  </h3>
                  <p className="text-xs text-[#EDDEC2] font-mono">
                    ID: {selectedFinding.id} • Protocol: {selectedFinding.protocol}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFinding(null)}
                className="text-[#EDDEC2] hover:text-white p-1 rounded hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                  <span className="text-[#77727A] block text-[10px] uppercase font-bold">Severity</span>
                  <div className="mt-1">
                    <SecurityBadge level={selectedFinding.severity} />
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                  <span className="text-[#77727A] block text-[10px] uppercase font-bold">Protocol</span>
                  <span className="font-mono font-bold text-sm text-[#17151A]">{selectedFinding.protocol}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                  <span className="text-[#77727A] block text-[10px] uppercase font-bold">Packet Offset</span>
                  <span className="font-mono text-xs text-[#0B192C] font-semibold">{selectedFinding.packetOffset}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                  <span className="text-[#77727A] block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-semibold text-xs text-[#242126]">{selectedFinding.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[#77727A] font-semibold block mb-1.5 flex items-center gap-1.5">
                  <Terminal size={14} className="text-[#DD6E2D]" />
                  Captured Cryptographic Evidence:
                </span>
                <div className="p-3 bg-[#17151A] text-[#EDDEC2] font-mono text-xs rounded-lg border border-[#242126] select-all">
                  {selectedFinding.evidence}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#77727A] font-semibold block">Security Impact & Exploitability:</span>
                <p className="text-[#242126] leading-relaxed bg-[#F5F3F1] p-3 rounded-lg border border-[#E5DFD8]">
                  {selectedFinding.impact}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[#77727A] font-semibold block">Prescribed Remediation Action:</span>
                <p className="text-[#17151A] font-medium leading-relaxed bg-[#EDDEC2]/40 p-3 rounded-lg border border-[#EDDEC2]">
                  {selectedFinding.remediation}
                </p>
              </div>
            </div>

            <div className="px-6 py-3 bg-[#F5F3F1] border-t border-[#E5DFD8] flex items-center justify-between">
              <span className="text-[11px] text-[#77727A] font-mono">
                Reference: {selectedFinding.cve}
              </span>
              <button
                onClick={() => setSelectedFinding(null)}
                className="px-4 py-1.5 rounded-[8px] bg-[#0B192C] text-white text-xs font-medium hover:bg-[#071324]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
