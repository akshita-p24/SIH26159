import React from 'react';
import ChartCard from '../components/ChartCard';
import SecurityBadge from '../components/SecurityBadge';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  GitBranch,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AIAnalysis() {
  const navigate = useNavigate();

  const models = [
    {
      id: 'mdl-tls-01',
      name: 'TLS Version Classifier',
      architecture: 'Gradient Boosted Handshake Classifier (XGBoost)',
      featureSet: 'Extension vectors, ALPN flags, ClientHello protocol tokens',
      status: 'Inference Active',
      prediction: 'MODERN',
      predictionType: 'SECURE',
      confidence: 96.2,
      icon: Cpu,
      summary: 'High probability of RFC 8446 modern TLS 1.3 adherence across primary MTA transfer pathways.'
    },
    {
      id: 'mdl-ciph-02',
      name: 'Cipher Security Classifier',
      architecture: 'Cryptographic Primitive Evaluator (Random Forest)',
      featureSet: 'Cipher ID entropy, block size, key-length bitrates, MAC algorithms',
      status: 'Inference Active',
      prediction: 'WEAK',
      predictionType: 'HIGH',
      confidence: 91.4,
      icon: Brain,
      summary: 'Detected legacy 64-bit DES/3DES block cipher components with CBC padding vulnerabilities.'
    },
    {
      id: 'mdl-cert-03',
      name: 'Certificate Risk Detector',
      architecture: 'X.509 Heuristic Chain Network',
      featureSet: 'SAN validity, intermediate authority anchors, signature algorithm RSA-2048+',
      status: 'Inference Active',
      prediction: 'LOW RISK',
      predictionType: 'LOW RISK',
      confidence: 94.8,
      icon: ShieldCheck,
      summary: 'Public root chains verified. One endpoint flagged for minor hostname SAN mismatch.'
    },
    {
      id: 'mdl-risk-04',
      name: 'Overall Security Risk Model',
      architecture: 'Ensemble Meta-Learner (Stacking Classifier)',
      featureSet: 'Multi-layer aggregation of TLS, cipher, cert, and STARTTLS state vectors',
      status: 'Inference Active',
      prediction: 'MEDIUM RISK',
      predictionType: 'MEDIUM RISK',
      confidence: 89.7,
      icon: Brain,
      summary: 'Aggregated threat model classifies posture as moderate risk requiring targeted cipher hardening.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Overview Banner */}
      <div className="p-4 rounded-[10px] bg-[#EDDEC2] border border-[#d8c3a1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-[#32004B] text-[#EDDEC2] mt-0.5">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#32004B] font-mono">
              Cryptographic Machine Learning Pipeline
            </h3>
            <p className="text-xs text-[#242126] mt-0.5 max-w-2xl leading-relaxed">
              Supervised classification pipelines trained on over 2.4 million enterprise TLS handshakes evaluate protocol downgrades, deprecated cipher suites, and certificate anomalies without accessing email contents.
            </p>
          </div>
        </div>

        <Button
          variant="brand"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/explainability')}
        >
          View SHAP Explainability
        </Button>
      </div>

      {/* 4 Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <div
              key={model.id}
              className="enterprise-card bg-white p-5 flex flex-col justify-between space-y-4 hover:shadow-xs transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-[#E5DFD8]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#32004B] text-[#EDDEC2]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#17151A] tracking-tight">
                        {model.name}
                      </h4>
                      <span className="text-[11px] text-[#77727A] font-mono">
                        {model.architecture}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-[#166534] font-medium font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {model.status}
                  </span>
                </div>

                {/* Prediction & Confidence Block */}
                <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8]">
                  <div>
                    <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono block">
                      Model Classification
                    </span>
                    <div className="mt-1">
                      <SecurityBadge level={model.prediction} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold text-[#77727A] uppercase font-mono">
                        Confidence
                      </span>
                      <span className="text-xs font-bold text-[#17151A] font-mono">
                        {model.confidence}%
                      </span>
                    </div>

                    <div className="w-full bg-[#E5DFD8] rounded-full h-2 mt-1.5 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          model.confidence > 92 ? 'bg-[#32004B]' : 'bg-[#DD6E2D]'
                        }`}
                        style={{ width: `${model.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Feature Ingestion & Summary */}
                <div className="space-y-2 text-xs">
                  <p className="text-[#242126] leading-relaxed">
                    {model.summary}
                  </p>
                  <div className="pt-2 border-t border-[#E5DFD8]/60 flex items-center gap-1.5 text-[11px] text-[#77727A] font-mono truncate">
                    <GitBranch size={12} />
                    <span className="truncate">Features: {model.featureSet}</span>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-3 border-t border-[#E5DFD8] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#77727A]">
                  Model ID: {model.id}
                </span>
                <button
                  onClick={() => navigate('/explainability')}
                  className="font-semibold text-[#32004B] hover:text-[#DD6E2D] flex items-center gap-1 transition-colors"
                >
                  <span>Feature Attribution</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Technical Validation Specs */}
      <ChartCard
        title="Inference & Training Pipeline Verification"
        subtitle="Cryptographic telemetry validation constraints"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8] space-y-1">
            <span className="font-bold text-[#17151A] block">Zero Payload Exposure</span>
            <p className="text-[#77727A]">
              Models parse exclusively unencrypted handshake metadata (ClientHello, ServerHello, Certificate chains). Message RFC 5322 payloads remain untouched.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8] space-y-1">
            <span className="font-bold text-[#17151A] block">FIPS 140-3 & NIST 800-52r2</span>
            <p className="text-[#77727A]">
              Classification ground-truth labels conform to federal standards for approved cryptographic ciphers, key exchanges, and elliptic curves.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#F5F3F1] border border-[#E5DFD8] space-y-1">
            <span className="font-bold text-[#17151A] block">SHAP Value Explainability</span>
            <p className="text-[#77727A]">
              Every risk score outputs local Shapley additive explanations so security analysts can audit why a specific session was flagged.
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
