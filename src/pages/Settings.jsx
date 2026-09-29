import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { Check } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState('NIST-800-52');
  const [minTLS, setMinTLS] = useState('TLS1.2');
  const [aiSensitivity, setAiSensitivity] = useState('STANDARD');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#111111] tracking-tight font-sans">
            Security Engine Settings
          </h2>
          <p className="text-xs text-[#5F6368]">
            Configure compliance baseline standards and detection thresholds
          </p>
        </div>

        <Button
          variant="brand"
          size="sm"
          onClick={handleSave}
          icon={Check}
          className="rounded-full"
        >
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs animate-in fade-in duration-150">
          Posture engine rules updated successfully.
        </div>
      )}

      {/* Compliance Baseline */}
      <ChartCard
        title="Compliance & Cryptographic Standard"
        subtitle="Standard used for cipher suite pass/fail criteria"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'NIST-800-52', title: 'NIST SP 800-52r2', desc: 'Federal guidance for government and enterprise TLS' },
              { id: 'PCI-DSS', title: 'PCI-DSS 4.0 Strict', desc: 'Payment card standard requiring complete TLS 1.0/1.1 deprecation' },
              { id: 'RFC-8996', title: 'IETF RFC 8996', desc: 'Standard Internet Best Current Practice' },
            ].map((std) => (
              <div
                key={std.id}
                onClick={() => setProfile(std.id)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all ${
                  profile === std.id
                    ? 'border-[#7C3AED] bg-[#ECEAFD] shadow-xs'
                    : 'border-[#EAE6DF] hover:bg-[#FAF9F7]'
                }`}
              >
                <div className="font-bold text-[#111111] mb-1 font-sans">{std.title}</div>
                <div className="text-[11px] text-[#5F6368] leading-relaxed">{std.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE6DF]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-[#111111] block">Minimum Allowed TLS Version</span>
              <span className="text-[11px] text-[#5F6368]">Connections below this threshold trigger a HIGH finding.</span>
            </div>
            <select
              value={minTLS}
              onChange={(e) => setMinTLS(e.target.value)}
              className="bg-[#FAF9F7] border border-[#EAE6DF] rounded-full px-4 py-1.5 font-mono text-xs text-[#111111] focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="TLS1.3">TLS 1.3 (Strict)</option>
              <option value="TLS1.2">TLS 1.2 (Standard Enterprise)</option>
              <option value="TLS1.0">TLS 1.0 (Permit Obsolete)</option>
            </select>
          </div>
        </div>
      </ChartCard>

      {/* AI Machine Learning Tuning */}
      <ChartCard
        title="AI Classifier Sensitivity"
        subtitle="Inference threshold for anomalous handshake detection"
      >
        <div className="space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[20px] bg-[#FAF9F7] border border-[#EAE6DF]">
            <div>
              <span className="font-bold text-[#111111] block font-sans">Sensitivity Level</span>
              <span className="text-[11px] text-[#5F6368]">Balance recall vs false-positive rates for cipher heuristics.</span>
            </div>

            <div className="flex gap-1.5">
              {['CONSERVATIVE', 'STANDARD', 'AGGRESSIVE'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setAiSensitivity(lvl)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    aiSensitivity === lvl
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-white border border-[#EAE6DF] text-[#5F6368] hover:bg-[#FAF9F7]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-[20px] bg-white border border-[#EAE6DF] space-y-1">
            <span className="font-semibold text-[#111111] block">Payload Privacy Guarantee</span>
            <p className="text-[11px] text-[#5F6368] leading-relaxed">
              Email payload contents (headers, body, attachments) are discarded in memory. Only cryptographic handshake parameters are processed.
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
