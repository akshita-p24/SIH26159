import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { downloadCSV } from '../utils/exportUtils';
import {
  ChartNoAxesCombined,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export default function Explainability() {
  const [exportNotice, setExportNotice] = useState(null);

  const shapFeatures = [
    {
      feature: 'Weak Cipher Suite',
      value: '+0.31',
      score: 0.31,
      max: 0.40,
      description: 'Presence of 3DES-EDE-CBC in POP3 & SMTP handshakes',
      primary: true
    },
    {
      feature: 'TLS Version',
      value: '+0.24',
      score: 0.24,
      max: 0.40,
      description: 'Negotiation of legacy TLSv1.0 on port 995',
      primary: false
    },
    {
      feature: 'Certificate Validity',
      value: '+0.15',
      score: 0.15,
      max: 0.40,
      description: 'Lack of Subject Alternative Name (SAN) match on secondary mail server',
      primary: false
    },
    {
      feature: 'STARTTLS Configuration',
      value: '+0.10',
      score: 0.10,
      max: 0.40,
      description: 'Opportunistic negotiation without strict DANE or MTA-STS policy',
      primary: false
    },
    {
      feature: 'Key Exchange',
      value: '+0.04',
      score: 0.04,
      max: 0.40,
      description: '1024-bit Diffie-Hellman prime group detected during IMAP handshake',
      primary: false
    }
  ];

  const handleExportSHAP = () => {
    downloadCSV('shap_feature_importance.csv', shapFeatures, [
      { header: 'Feature', key: 'feature' },
      { header: 'SHAP Value', key: 'value' },
      { header: 'Relative Score', key: 'score' },
      { header: 'Impact Description', key: 'description' }
    ]);
    setExportNotice('SHAP attribution values exported to CSV.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* SHAP Mathematical Context Banner */}
      <div className="p-4 sm:p-5 rounded-[22px] bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#18181B] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-white mt-0.5 flex-shrink-0 shadow-md">
            <ChartNoAxesCombined size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white font-sans">
                SHAP Feature Attribution
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/15 text-[#ECEAFD] font-mono border border-white/10">
                Explainable AI
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Calculates marginal contribution of each cryptographic attribute toward the final <strong>MEDIUM RISK</strong> score.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-300 bg-white/10 px-4 py-2 rounded-full border border-white/10 shadow-xs">
          <span>Base Value: <strong>0.18</strong></span>
          <span>→</span>
          <span>Risk Output: <strong className="text-[#ECEAFD] font-bold">0.72</strong></span>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Explanation Summary Panel */}
      <div className="p-5 rounded-[22px] bg-white border border-[#EFECE6] space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE6DF]/60 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
              Score Classification Driver
            </h3>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Weak cipher configuration was the primary factor driving the risk score, followed by TLS 1.0 version.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FEF1E1] px-3.5 py-1.5 rounded-full border border-[#FCE6CD] self-start sm:self-auto">
            <span className="text-[11px] text-[#8C6D52] font-semibold uppercase">
              Top Driver:
            </span>
            <span className="text-xs font-bold text-[#B45309] font-mono">
              Weak Cipher Suite
            </span>
          </div>
        </div>

        {/* Narrative Feature Decomposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#FEF1E1] border border-[#FCE6CD]">
            <strong className="block text-[#111111] mb-1 font-mono uppercase text-[11px]">
              1. Cipher Vulnerability (+0.31)
            </strong>
            <p className="text-[#8C6D52] leading-relaxed">
              36.9% of total risk is attributed to obsolete 3DES cipher suites susceptible to SWEET32 attacks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ECEAFD] border border-[#DDD6FE]">
            <strong className="block text-[#111111] mb-1 font-mono uppercase text-[11px]">
              2. Protocol Version (+0.24)
            </strong>
            <p className="text-[#6D5BA8] leading-relaxed">
              TLS 1.0 handshake on port 995 shifted the confidence boundary into the MEDIUM RISK class.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#DDEBFF] border border-[#CDE1FE]">
            <strong className="block text-[#111111] mb-1 font-mono uppercase text-[11px]">
              3. Cumulative Factors (+0.29)
            </strong>
            <p className="text-[#4B6B94] leading-relaxed">
              Cert SAN anomaly (+0.15), STARTTLS exposure (+0.10), and 1024-bit DH (+0.04) aggregate risk.
            </p>
          </div>
        </div>
      </div>

      {/* SHAP Feature-Importance Visualization */}
      <ChartCard
        title="Feature Contribution Plot"
        subtitle="Magnitude of feature contribution toward positive risk prediction"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={handleExportSHAP}
            className="rounded-full"
          >
            Export SHAP (CSV)
          </Button>
        }
      >
        <div className="space-y-4 py-2">
          {shapFeatures.map((item, index) => {
            const widthPct = (item.score / item.max) * 100;

            return (
              <div key={item.feature} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#80868B] w-4 font-bold">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-[#111111] tracking-tight font-sans">
                      {item.feature}
                    </span>
                    {item.primary && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold font-mono">
                        TOP DRIVER
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[#5F6368] hidden md:inline truncate max-w-sm">
                      {item.description}
                    </span>
                    <span className="font-mono font-bold text-xs text-[#111111] bg-[#FAF9F7] px-2.5 py-0.5 rounded-full border border-[#EAE6DF]">
                      {item.value} SHAP
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#FAF9F7] rounded-full h-3 overflow-hidden border border-[#EAE6DF] flex">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${
                      item.primary
                        ? 'bg-[#E07A5F]'
                        : item.score > 0.15
                        ? 'bg-[#7C3AED]'
                        : 'bg-[#94A3B8]'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 pt-3 border-t border-[#EAE6DF]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5F6368]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
              <span className="text-[#111111] font-medium">Dominant (&gt; +0.30)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              <span className="text-[#111111] font-medium">Substantial (+0.15 - +0.30)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
              <span className="text-[#111111] font-medium">Minor (&lt; +0.15)</span>
            </span>
          </div>

          <span className="font-mono text-[11px] text-[#80868B]">
            Baseline: 0.18 • Risk Threshold: 0.50
          </span>
        </div>
      </ChartCard>
    </div>
  );
}
