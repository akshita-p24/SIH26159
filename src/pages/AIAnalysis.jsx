import React from 'react';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Cpu,
  ShieldCheck,
  ArrowRight,
  GitBranch,
  ArrowUpRight
} from 'lucide-react';

export default function AIAnalysis() {
  const navigate = useNavigate();

  const models = [
    {
      id: 'mdl-tls-01',
      name: 'TLS Version Classifier',
      architecture: 'Gradient Boosted Classifier (XGBoost)',
      featureSet: 'Extension vectors, ALPN flags, ClientHello tokens',
      status: 'Active',
      prediction: 'MODERN',
      confidence: 96.2,
      icon: Cpu,
      summary: 'Adherence to RFC 8446 TLS 1.3 across primary MTA transfer pathways.'
    },
    {
      id: 'mdl-ciph-02',
      name: 'Cipher Security Evaluator',
      architecture: 'Cryptographic Evaluator (Random Forest)',
      featureSet: 'Cipher ID entropy, block size, bitrates, MAC algorithms',
      status: 'Active',
      prediction: 'WEAK',
      confidence: 91.4,
      icon: Brain,
      summary: 'Identified legacy 64-bit 3DES block cipher with CBC padding weakness.'
    },
    {
      id: 'mdl-cert-03',
      name: 'Certificate Risk Detector',
      architecture: 'X.509 Heuristic Chain Network',
      featureSet: 'SAN validity, intermediate anchors, signature algorithms',
      status: 'Active',
      prediction: 'LOW RISK',
      confidence: 94.8,
      icon: ShieldCheck,
      summary: 'Root chains verified. One POP3 endpoint flagged for hostname SAN mismatch.'
    },
    {
      id: 'mdl-risk-04',
      name: 'Overall Posture Ensemble',
      architecture: 'Ensemble Meta-Learner (Stacking)',
      featureSet: 'Multi-layer aggregation of TLS, cipher, and cert vectors',
      status: 'Active',
      prediction: 'MEDIUM RISK',
      confidence: 89.7,
      icon: Brain,
      summary: 'Aggregated model classifies posture as moderate risk requiring cipher hardening.'
    }
  ];

  return (
    <div className="space-y-5">
      {/* AI Overview Banner */}
      <div className="p-4 sm:p-5 rounded-[22px] bg-[#ECEAFD] border border-[#DDD6FE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-[#7C3AED] text-white shadow-xs mt-0.5 flex-shrink-0">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
              Machine Learning Inference Pipeline
            </h3>
            <p className="text-xs text-[#5F6368] mt-0.5 max-w-2xl leading-relaxed">
              Supervised classifiers evaluate protocol downgrades, deprecated ciphers, and certificate anomalies from unencrypted handshake metadata.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/explainability')}
          className="rounded-full"
        >
          SHAP Explainability
        </Button>
      </div>

      {/* 4 Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <div
              key={model.id}
              className="enterprise-card bg-white p-5 rounded-[22px] flex flex-col justify-between space-y-4 shadow-2xs border border-[#EFECE6]"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3.5 border-b border-[#EAE6DF]/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center shadow-xs">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111] tracking-tight font-sans">
                        {model.name}
                      </h4>
                      <span className="text-[11px] text-[#80868B] font-mono">
                        {model.architecture}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#15803D] font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#E3F6EC] border border-[#C8EFE0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {model.status}
                  </span>
                </div>

                {/* Prediction & Confidence Block */}
                <div className="grid grid-cols-2 gap-3 my-3.5 p-3.5 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF]">
                  <div>
                    <span className="text-[10px] font-semibold text-[#80868B] uppercase font-mono block">
                      Classification
                    </span>
                    <div className="mt-1">
                      <SecurityBadge level={model.prediction} size="xs" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-semibold text-[#80868B] uppercase font-mono">
                        Confidence
                      </span>
                      <span className="text-xs font-bold text-[#111111] font-mono">
                        {model.confidence}%
                      </span>
                    </div>

                    <div className="w-full bg-[#EAE6DF] rounded-full h-2 mt-1.5 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          model.confidence > 92 ? 'bg-[#7C3AED]' : 'bg-[#E07A5F]'
                        }`}
                        style={{ width: `${model.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Feature Ingestion & Summary */}
                <div className="space-y-1.5 text-xs">
                  <p className="text-[#5F6368] leading-relaxed">
                    {model.summary}
                  </p>
                  <div className="pt-2 border-t border-[#EAE6DF]/60 flex items-center gap-1.5 text-[11px] text-[#80868B] font-mono truncate">
                    <GitBranch size={12} className="text-[#7C3AED]" />
                    <span className="truncate">Features: {model.featureSet}</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-3 border-t border-[#EAE6DF]/60 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#80868B]">
                  {model.id}
                </span>
                <button
                  onClick={() => navigate('/explainability')}
                  className="w-7 h-7 rounded-full bg-[#111111] text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  title="View Feature Attribution"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Validation Specs */}
      <ChartCard
        title="Model Pipeline Verification"
        subtitle="Cryptographic telemetry validation constraints"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-[#E3F6EC] border border-[#C8EFE0] space-y-1">
            <span className="font-bold text-[#111111] block">Zero Payload Exposure</span>
            <p className="text-[#3D7A5C] leading-relaxed">
              Only unencrypted handshake metadata is analyzed. Message body contents are never inspected.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#DDEBFF] border border-[#CDE1FE] space-y-1">
            <span className="font-bold text-[#111111] block">NIST 800-52r2 Standard</span>
            <p className="text-[#4B6B94] leading-relaxed">
              Ground-truth labels conform to federal guidelines for approved cryptographic ciphers and curves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF1E1] border border-[#FCE6CD] space-y-1">
            <span className="font-bold text-[#111111] block">SHAP Explainability</span>
            <p className="text-[#8C6D52] leading-relaxed">
              Every prediction produces Shapley additive values to clearly explain risk decisions.
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
