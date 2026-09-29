import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { Settings as SettingsIcon, Sliders, Shield, Bell, Key, Database, Check } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#17151A] tracking-tight">
            Security Engine Settings
          </h2>
          <p className="text-xs text-[#77727A]">
            Configure compliance baseline profiles, cipher blacklists, and ML detection thresholds
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          icon={Check}
        >
          {saved ? 'Saved Changes' : 'Save Configurations'}
        </Button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs animate-in fade-in duration-150">
          Cryptographic security posture rules updated successfully across all worker nodes.
        </div>
      )}

      {/* Compliance Baseline */}
      <ChartCard
        title="Compliance & Cryptographic Standard"
        subtitle="Specify which regulatory standard dictates cipher suite pass/fail criteria"
      >
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'NIST-800-52', title: 'NIST SP 800-52r2', desc: 'Federal guidance for government and defense TLS deployments' },
              { id: 'PCI-DSS', title: 'PCI-DSS 4.0 Strict', desc: 'Payment card compliance requiring complete deprecation of TLS 1.0/1.1' },
              { id: 'RFC-8996', title: 'IETF BCP 195 / RFC 8996', desc: 'Standard Internet Best Current Practice baseline' },
            ].map((std) => (
              <div
                key={std.id}
                onClick={() => setProfile(std.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  profile === std.id
                    ? 'border-[#DD6E2D] bg-[#EDDEC2]/30 shadow-xs'
                    : 'border-[#E5DFD8] hover:bg-[#F5F3F1]'
                }`}
              >
                <div className="font-bold text-[#17151A] mb-1">{std.title}</div>
                <div className="text-[11px] text-[#77727A] leading-relaxed">{std.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-[#17151A] block">Minimum Allowed TLS Version</span>
              <span className="text-[11px] text-[#77727A]">Sessions below this threshold will automatically trigger a HIGH severity finding.</span>
            </div>
            <select
              value={minTLS}
              onChange={(e) => setMinTLS(e.target.value)}
              className="bg-[#F5F3F1] border border-[#E5DFD8] rounded-[6px] px-3 py-1.5 font-mono text-xs text-[#17151A] focus:outline-none focus:border-[#DD6E2D]"
            >
              <option value="TLS1.3">TLS 1.3 (Strict Modern)</option>
              <option value="TLS1.2">TLS 1.2 (Standard Enterprise)</option>
              <option value="TLS1.0">TLS 1.0 (Permit Obsolete - Not Recommended)</option>
            </select>
          </div>
        </div>
      </ChartCard>

      {/* AI Machine Learning Tuning */}
      <ChartCard
        title="AI Classifier Sensitivity & SHAP Attribution"
        subtitle="Tune gradient boosted tree classification threshold for anomalous handshakes"
      >
        <div className="space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
            <div>
              <span className="font-bold text-[#17151A] block">Inference Sensitivity</span>
              <span className="text-[11px] text-[#77727A]">Control false-positive vs recall trade-off for weak cipher heuristics.</span>
            </div>

            <div className="flex gap-1.5">
              {['CONSERVATIVE', 'STANDARD', 'AGGRESSIVE'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setAiSensitivity(lvl)}
                  className={`px-3 py-1 rounded-[6px] text-xs font-mono font-medium transition-colors ${
                    aiSensitivity === lvl
                      ? 'bg-[#32004B] text-white'
                      : 'bg-white border border-[#E5DFD8] text-[#77727A] hover:bg-[#F5F3F1]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-[#E5DFD8] space-y-2">
            <span className="font-semibold text-[#17151A] block">Handshake Telemetry Privacy Guarantee</span>
            <p className="text-[11px] text-[#77727A] leading-relaxed">
              SecureMailScope operates strictly at the cryptographic transport layer. Payload bytes (RFC 5322 headers, body, attachments) are discarded in volatile memory prior to feature vector synthesis. No customer email contents are ever written to disk or transmitted to AI models.
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
