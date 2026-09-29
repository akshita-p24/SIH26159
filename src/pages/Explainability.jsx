import React from 'react';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import {
  ChartNoAxesCombined,
  Brain,
  HelpCircle,
  TrendingUp,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Explainability() {
  const shapFeatures = [
    {
      feature: 'Weak Cipher Suite',
      value: '+0.31',
      score: 0.31,
      max: 0.40,
      description: 'Presence of 3DES-EDE-CBC in POP3 & SMTP handshakes drove score towards risk threshold',
      primary: true
    },
    {
      feature: 'TLS Version',
      value: '+0.24',
      score: 0.24,
      max: 0.40,
      description: 'Negotiation of legacy TLSv1.0 on port 995 added +0.24 to the cumulative risk score',
      primary: false
    },
    {
      feature: 'Certificate Validity',
      value: '+0.15',
      score: 0.15,
      max: 0.40,
      description: 'Self-signed root or lack of Subject Alternative Name (SAN) match on secondary mail server',
      primary: false
    },
    {
      feature: 'STARTTLS Configuration',
      value: '+0.10',
      score: 0.10,
      max: 0.40,
      description: 'Opportunistic negotiation without strict DANE or MTA-STS policy enforcement',
      primary: false
    },
    {
      feature: 'Key Exchange',
      value: '+0.04',
      score: 0.04,
      max: 0.40,
      description: '1024-bit Diffie-Hellman prime group detected during IMAP STARTTLS handshake',
      primary: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* SHAP Mathematical Context Banner */}
      <div className="p-4 rounded-[10px] bg-[#32004B] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-[#DD6E2D] text-white mt-0.5">
            <ChartNoAxesCombined size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white font-sans">
                SHAP (SHapley Additive exPlanations) Attribution Engine
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#EDDEC2] font-mono">
                Game Theoretic Interpretability
              </span>
            </div>
            <p className="text-xs text-[#EDDEC2]/90 mt-1 max-w-2xl leading-relaxed">
              Calculates Shapley values to apportion the marginal contribution of each cryptographic handshake attribute toward the final <strong>MEDIUM RISK</strong> prediction.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-[#EDDEC2] bg-white/10 px-3 py-2 rounded-lg border border-white/15">
          <span>Base Value E[f(X)]: <strong>0.18</strong></span>
          <span>→</span>
          <span>Output f(X): <strong className="text-[#DD6E2D]">0.72 (Risk)</strong></span>
        </div>
      </div>

      {/* Explanation Panel: Why was this classified as MEDIUM RISK? */}
      <div className="p-5 rounded-[10px] bg-[#EDDEC2] border border-[#d8c3a1] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d8c3a1] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#32004B] tracking-tight font-sans">
              Why was this classified as MEDIUM RISK?
            </h3>
            <p className="text-xs text-[#242126] mt-0.5">
              "The model identified weak cipher configuration as the primary contributing feature, followed by the detected TLS version and certificate-related characteristics."
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#d8c3a1] self-start sm:self-auto">
            <span className="text-[11px] text-[#77727A] font-semibold uppercase">
              Primary contributing factor:
            </span>
            <span className="text-xs font-bold text-[#DD6E2D] font-mono">
              Weak Cipher Suite
            </span>
          </div>
        </div>

        {/* Narrative Feature Decomposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#242126]">
          <div className="p-3 rounded-lg bg-white/80 border border-[#d8c3a1]">
            <strong className="block text-[#32004B] mb-1 font-mono uppercase text-[11px]">
              1. Cipher Vulnerability Weight (+0.31)
            </strong>
            <p className="leading-relaxed">
              The algorithm allocated 36.9% of total risk strictly to obsolete 3DES cipher suites, which are susceptible to birthday plaintext recovery (SWEET32).
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white/80 border border-[#d8c3a1]">
            <strong className="block text-[#32004B] mb-1 font-mono uppercase text-[11px]">
              2. Protocol Version Weight (+0.24)
            </strong>
            <p className="leading-relaxed">
              Negotiation of TLS 1.0 without modern AEAD suites shifted the model's confidence boundary firmly into the MEDIUM RISK class.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white/80 border border-[#d8c3a1]">
            <strong className="block text-[#32004B] mb-1 font-mono uppercase text-[11px]">
              3. Cumulative Impact (+0.29)
            </strong>
            <p className="leading-relaxed">
              Cert anomalies (+0.15), STARTTLS downgrade exposure (+0.10), and 1024-bit DH (+0.04) aggregate to prevent a LOW RISK classification.
            </p>
          </div>
        </div>
      </div>

      {/* SHAP Feature-Importance Visualization (Horizontal Bars) */}
      <ChartCard
        title="SHAP Feature Importance Attribution Plot"
        subtitle="Magnitude of feature contribution toward positive risk prediction (higher positive values increase overall vulnerability score)"
        action={
          <span className="text-xs font-mono text-[#77727A]">
            SHAP Waterfall Metric • ∑ φ_i = +0.84
          </span>
        }
      >
        <div className="space-y-5 py-3">
          {shapFeatures.map((item, index) => {
            const widthPct = (item.score / item.max) * 100;

            return (
              <div key={item.feature} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#77727A] w-4 font-bold">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-[#17151A] tracking-tight">
                      {item.feature}
                    </span>
                    {item.primary && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#DD6E2D]/15 text-[#DD6E2D] font-bold font-mono">
                        TOP DRIVER
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[#77727A] hidden md:inline truncate max-w-sm">
                      {item.description}
                    </span>
                    <span className="font-mono font-bold text-xs text-[#DD6E2D] bg-[#DD6E2D]/10 px-2 py-0.5 rounded border border-[#DD6E2D]/20">
                      {item.value} SHAP
                    </span>
                  </div>
                </div>

                {/* Horizontal Feature Attribution Bar */}
                <div className="w-full bg-[#F5F3F1] rounded-full h-3.5 overflow-hidden border border-[#E5DFD8] flex">
                  <div
                    className={`h-3.5 rounded-full transition-all duration-700 ${
                      item.primary
                        ? 'bg-[#DD6E2D]'
                        : item.score > 0.15
                        ? 'bg-[#32004B]'
                        : 'bg-[#77727A]'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / Baseline Marker */}
        <div className="mt-6 pt-4 border-t border-[#E5DFD8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#77727A]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#DD6E2D]" />
              <strong className="text-[#17151A]">Dominant Factor (&gt; +0.30)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#32004B]" />
              <strong className="text-[#17151A]">Substantial Factor (+0.15 - +0.30)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#77727A]" />
              <strong className="text-[#17151A]">Minor Factor (&lt; +0.15)</strong>
            </span>
          </div>

          <span className="font-mono text-[11px]">
            Model Baseline: E[Y] = 0.18 | Target Cutoff = 0.50
          </span>
        </div>
      </ChartCard>
    </div>
  );
}
