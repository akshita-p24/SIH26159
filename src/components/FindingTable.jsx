import React, { useState } from 'react';
import SecurityBadge from './SecurityBadge';
import { Search, Filter, ChevronRight, X, ShieldAlert, Terminal } from 'lucide-react';

export const INITIAL_FINDINGS = [
  {
    id: 'FND-001',
    severity: 'HIGH',
    finding: 'Weak cipher suite (3DES)',
    protocol: 'SMTP',
    evidence: 'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
    status: 'Open',
    cve: 'CVE-2016-2183 (SWEET32)',
    packetOffset: '0x0048F2',
    impact: 'Triple-DES 64-bit block cipher allows birthday attacks leading to plaintext recovery over high-volume sessions.',
    remediation: 'Deprecate 3DES in postfix/sendmail configuration. Enforce modern AEAD ciphers (e.g. ECDHE-AES256-GCM-SHA384).'
  },
  {
    id: 'FND-002',
    severity: 'MEDIUM',
    finding: 'TLS 1.0 handshake',
    protocol: 'IMAP',
    evidence: 'TLSv1.0 handshake observed',
    status: 'Active',
    cve: 'RFC 8996 Deprecation',
    packetOffset: '0x001B09',
    impact: 'Deprecated transport layer protocol lacks modern mitigation against BEAST and POODLE downgrade attacks.',
    remediation: 'Configure mail daemon with `ssl_min_protocol = TLSv1.2` or TLS 1.3 exclusively.'
  },
  {
    id: 'FND-003',
    severity: 'MEDIUM',
    finding: 'Certificate SAN mismatch',
    protocol: 'POP3',
    evidence: 'Hostname Subject Alternative Name mismatch',
    status: 'Investigating',
    cve: 'CWE-295 (Improper Validation)',
    packetOffset: '0x0083C0',
    impact: 'Mail endpoint certificate failed hostname Subject Alternative Name (SAN) validation.',
    remediation: 'Deploy automated ACME certificate with proper SAN extensions matching all mail-routing FQDNs.'
  },
  {
    id: 'FND-004',
    severity: 'LOW',
    finding: 'Opportunistic STARTTLS',
    protocol: 'SMTP',
    evidence: 'STARTTLS advertised without strict policy',
    status: 'In Review',
    cve: 'RFC 3207 Audit',
    packetOffset: '0x00C721',
    impact: 'Opportunistic STARTTLS command advertised without mandatory enforcement, permitting potential STRIPTLS downgrade.',
    remediation: 'Enforce MTA-STS (RFC 8461) and DANE TLSA DNS records to mandate encrypted transport.'
  },
  {
    id: 'FND-005',
    severity: 'LOW',
    finding: '1024-bit DH parameters',
    protocol: 'IMAP',
    evidence: 'Legacy Diffie-Hellman group size',
    status: 'Monitoring',
    cve: 'Logjam Weak DH',
    packetOffset: '0x00E2B4',
    impact: 'Diffie-Hellman parameter group size is 1024-bit, falling short of NIST 2048-bit minimum threshold.',
    remediation: 'Regenerate DH group parameters with 2048-bit primes or switch to ECDHE curves (X25519).'
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
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#80868B]" size={14} />
            <input
              type="text"
              placeholder="Search findings, evidence, protocol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#EAE6DF] rounded-full focus:outline-none focus:border-[#7C3AED] text-[#111111] placeholder-[#9AA0A6] shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#5F6368] flex items-center gap-1 font-medium">
              <Filter size={13} /> Severity:
            </span>
            <div className="flex gap-1">
              {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSeverityFilter(lvl)}
                  className={`text-xs px-3 py-1 rounded-full transition-all font-medium cursor-pointer ${
                    severityFilter === lvl
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-white border border-[#EAE6DF] text-[#5F6368] hover:bg-[#FAF9F7]'
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
      <div className="enterprise-card overflow-hidden bg-white rounded-[22px] border border-[#EFECE6] shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF9F7] border-b border-[#EAE6DF] text-[#5F6368] uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-28">Severity</th>
                <th className="py-3.5 px-4">Finding</th>
                <th className="py-3.5 px-4 w-24">Protocol</th>
                <th className="py-3.5 px-4">Cryptographic Evidence</th>
                <th className="py-3.5 px-4 w-28">Status</th>
                <th className="py-3.5 px-4 text-right w-16">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]/60">
              {displayedFindings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-[#80868B]">
                    No findings match the current criteria.
                  </td>
                </tr>
              ) : (
                displayedFindings.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedFinding(item)}
                    className="hover:bg-[#FAF9F7]/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <SecurityBadge level={item.severity} />
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#111111]">
                      <div className="flex items-center gap-1.5">
                        <span>{item.finding}</span>
                        <span className="text-[10px] text-[#80868B] font-mono">
                          [{item.id}]
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#111111]">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9F7] border border-[#EAE6DF] font-mono text-[11px]">
                        {item.protocol}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#5F6368] text-[11px] font-medium truncate max-w-[260px]">
                      {item.evidence}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF9F7] text-[#111111] border border-[#EAE6DF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <ChevronRight
                        size={15}
                        className="text-[#80868B] group-hover:text-[#7C3AED] inline transition-transform group-hover:translate-x-0.5"
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
          <div className="bg-white rounded-[24px] border border-[#EAE6DF] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert size={18} className="text-[#FEF1E1]" />
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    {selectedFinding.finding}
                  </h3>
                  <p className="text-xs text-[#80868B] font-mono">
                    {selectedFinding.id} • {selectedFinding.protocol}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFinding(null)}
                className="text-[#80868B] hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF]">
                  <span className="text-[#80868B] block text-[10px] uppercase font-semibold">Severity</span>
                  <div className="mt-1">
                    <SecurityBadge level={selectedFinding.severity} />
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF]">
                  <span className="text-[#80868B] block text-[10px] uppercase font-semibold">Protocol</span>
                  <span className="font-mono font-bold text-sm text-[#111111]">{selectedFinding.protocol}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF]">
                  <span className="text-[#80868B] block text-[10px] uppercase font-semibold">Offset</span>
                  <span className="font-mono text-xs text-[#111111] font-semibold">{selectedFinding.packetOffset}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF]">
                  <span className="text-[#80868B] block text-[10px] uppercase font-semibold">Status</span>
                  <span className="font-semibold text-xs text-[#111111]">{selectedFinding.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[#5F6368] font-semibold block mb-1.5 flex items-center gap-1.5">
                  <Terminal size={14} className="text-[#7C3AED]" />
                  Cryptographic Evidence:
                </span>
                <div className="p-3.5 bg-[#18181B] text-[#FEF1E1] font-mono text-xs rounded-2xl select-all">
                  {selectedFinding.evidence}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#5F6368] font-semibold block">Security Impact:</span>
                <p className="text-[#111111] leading-relaxed bg-[#FAF9F7] p-3 rounded-2xl border border-[#EAE6DF]">
                  {selectedFinding.impact}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[#5F6368] font-semibold block">Remediation Directive:</span>
                <p className="text-[#111111] font-medium leading-relaxed bg-[#FEF1E1]/70 p-3 rounded-2xl border border-[#FCE6CD]">
                  {selectedFinding.remediation}
                </p>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-[#FAF9F7] border-t border-[#EAE6DF] flex items-center justify-between">
              <span className="text-[11px] text-[#80868B] font-mono">
                {selectedFinding.cve}
              </span>
              <button
                onClick={() => setSelectedFinding(null)}
                className="px-5 py-1.5 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-black cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
