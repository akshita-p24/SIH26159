import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard';
import {
  UploadCloud,
  CircleCheck,
  FileCode,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ArrowRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

export default function PCAPAnalysis() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState({
    name: 'secure_email.pcap',
    size: '4.82 MB',
    uploadedAt: 'Today at 15:24',
    checksum: 'sha256:8b4e72a801f9...39d1',
    status: 'Ready'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);
  const [progress, setProgress] = useState(100);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setProgress(15);

    setTimeout(() => setProgress(45), 600);
    setTimeout(() => setProgress(80), 1300);
    setTimeout(() => {
      setProgress(100);
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 2100);
  };

  return (
    <div className="space-y-6">
      {/* Upload & Capture Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Dropzone */}
        <div className="lg:col-span-7">
          <ChartCard
            title="PCAP Capture Ingestion"
            subtitle="Support for .pcap, .pcapng, and .cap format email traffic traces"
          >
            <div className="border-2 border-dashed border-[#E5DFD8] hover:border-[#DD6E2D]/60 rounded-[10px] p-8 flex flex-col items-center justify-center text-center bg-[#F5F3F1]/40 transition-colors group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white border border-[#E5DFD8] flex items-center justify-center text-[#0B192C] shadow-xs group-hover:scale-105 group-hover:border-[#DD6E2D] transition-all">
                <UploadCloud size={28} className="group-hover:text-[#DD6E2D] transition-colors" />
              </div>

              <div className="mt-4 space-y-1">
                <h4 className="text-sm font-bold text-[#17151A] tracking-tight">
                  Drop your PCAP file here
                </h4>
                <p className="text-xs text-[#77727A]">
                  or browse from your computer to inspect cryptographic handshakes
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Button variant="outline" size="sm">
                  Browse File
                </Button>
                <span className="text-[11px] text-[#77727A] font-mono">
                  Max file size: 250 MB
                </span>
              </div>
            </div>

            {/* Currently Staged Capture File */}
            <div className="mt-4 p-4 rounded-lg bg-white border border-[#E5DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#0B192C] text-[#EDDEC2]">
                  <FileCode size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#17151A] font-mono">
                      {selectedFile.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold font-mono">
                      {selectedFile.size}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#77727A] font-mono mt-0.5">
                    Checksum: {selectedFile.checksum}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Parsing Handshakes... {progress}%
                    </span>
                  ) : (
                    'Analyze PCAP'
                  )}
                </Button>
              </div>
            </div>

            {/* Active Progress Bar if parsing */}
            {isAnalyzing && (
              <div className="mt-3">
                <div className="w-full bg-[#E5DFD8] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#DD6E2D] h-2 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#77727A] font-mono mt-1">
                  <span>Reconstructing TCP Streams & TLS ClientHellos</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Capture Metadata & Protocol Filters */}
        <div className="lg:col-span-5 space-y-4">
          <ChartCard
            title="Analysis Configuration"
            subtitle="Parser and cryptographic heuristic filters"
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-[#F5F3F1] border border-[#E5DFD8]">
                <span className="text-[#242126] font-medium">Deep Packet Inspection (DPI)</span>
                <span className="font-mono text-[#166534] font-semibold">Enabled (Layer 7)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#F5F3F1] border border-[#E5DFD8]">
                <span className="text-[#242126] font-medium">Cipher Rating Standard</span>
                <span className="font-mono text-[#0B192C] font-semibold">NIST SP 800-52r2</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#F5F3F1] border border-[#E5DFD8]">
                <span className="text-[#242126] font-medium">Certificate Chain Validation</span>
                <span className="font-mono text-[#0B192C] font-semibold">Strict CRL / OCSP</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#F5F3F1] border border-[#E5DFD8]">
                <span className="text-[#242126] font-medium">Target Mail Protocols</span>
                <span className="font-mono text-[#17151A] font-semibold">SMTP:25/587, IMAP:993, POP3:995</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-[#EDDEC2]/50 border border-[#d8c3a1] text-xs text-[#844c12]">
              <span className="font-bold block mb-1">Cryptographic Engine Status:</span>
              Dissecting ClientHello, ServerHello, and Certificate messages without decrypting payload data. Zero user-content inspection guaranteed.
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisDone && (
        <div className="space-y-4">
          {/* Success Banner */}
          <div className="p-4 rounded-[10px] bg-white border border-[#E5DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#166534] flex items-center justify-center">
                <CircleCheck size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17151A] flex items-center gap-2">
                  <span>Analysis completed successfully</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5F3F1] text-[#77727A] font-mono border border-[#E5DFD8]">
                    ID: PCAP-20260929-01
                  </span>
                </h3>
                <p className="text-xs text-[#77727A]">
                  PCAP parsing completed in 2.41 seconds. 5 cryptographic vulnerabilities flagged for review.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/findings')}
              >
                Inspect Findings
              </Button>
              <Button
                variant="brand"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/tls')}
              >
                View TLS Profile
              </Button>
            </div>
          </div>

          {/* Results KPI Metric Cards */}
          <div>
            <h3 className="text-sm font-bold text-[#17151A] mb-3 tracking-tight font-sans">
              Analysis Results Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard
                title="Packets Analyzed"
                value="1,284"
                subtitle="Ethernet / IP frames"
                badgeText="100% Parsed"
              />
              <StatCard
                title="TLS Connections"
                value="46"
                subtitle="Handshakes captured"
                badgeText="43 Encrypted"
              />
              <StatCard
                title="SMTP Connections"
                value="21"
                subtitle="Ports 25, 465, 587"
                badgeText="Secure"
              />
              <StatCard
                title="IMAP Connections"
                value="17"
                subtitle="Port 993 SSL/TLS"
                badgeText="Warning"
                badgeType="warning"
              />
              <StatCard
                title="POP3 Connections"
                value="8"
                subtitle="Port 995 POP3S"
                badgeText="Critical"
                badgeType="danger"
              />
              <StatCard
                title="Processing Time"
                value="2.41 sec"
                subtitle="Engine execution"
                badgeText="Optimized"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
