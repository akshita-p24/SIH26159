import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ChartCard from '../components/ChartCard';
import { downloadCSV } from '../utils/exportUtils';
import {
  UploadCloud,
  CircleCheck,
  FileCode,
  ArrowRight,
  Loader2,
  FileSpreadsheet,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

export default function PCAPAnalysis() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  const [exportNotice, setExportNotice] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const formattedSize = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.max(1, (file.size / 1024).toFixed(0))} KB`;

    // Generate deterministic/clean hash from file name and size
    const mockHash = `sha256:${Array.from(file.name + file.size).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0).toString(16).padEnd(12, 'a')}...${Math.floor(1000 + Math.random() * 9000)}`;

    setSelectedFile({
      name: file.name,
      size: formattedSize,
      uploadedAt: 'Just now',
      checksum: mockHash,
      status: 'Ready'
    });

    setAnalysisDone(false);
    setExportNotice(`File "${file.name}" loaded successfully. Ready for analysis.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setProgress(15);

    setTimeout(() => setProgress(45), 500);
    setTimeout(() => setProgress(80), 1000);
    setTimeout(() => {
      setProgress(100);
      setIsAnalyzing(false);
      setAnalysisDone(true);
      setExportNotice('Cryptographic analysis completed for ' + selectedFile.name);
      setTimeout(() => setExportNotice(null), 3000);
    }, 1600);
  };

  const handleExportTraceSummary = () => {
    const traceRows = [
      { StreamID: 'STR-01', Protocol: 'SMTP', Port: 587, Handshake: 'TLS 1.3', Cipher: 'AES-256-GCM', Status: 'SECURE' },
      { StreamID: 'STR-02', Protocol: 'SMTP', Port: 25, Handshake: 'TLS 1.3', Cipher: 'AES-256-GCM', Status: 'SECURE' },
      { StreamID: 'STR-03', Protocol: 'IMAP', Port: 993, Handshake: 'TLS 1.2', Cipher: 'AES-128-GCM', Status: 'WARNING' },
      { StreamID: 'STR-04', Protocol: 'POP3', Port: 995, Handshake: 'TLS 1.0', Cipher: '3DES-EDE-CBC', Status: 'CRITICAL' },
      { StreamID: 'STR-05', Protocol: 'SMTP', Port: 587, Handshake: 'TLS 1.3', Cipher: 'CHACHA20-POLY1305', Status: 'SECURE' }
    ];
    downloadCSV(`${selectedFile.name.replace(/\.[^/.]+$/, "")}_trace_summary.csv`, traceRows, [
      { header: 'Stream ID', key: 'StreamID' },
      { header: 'Protocol', key: 'Protocol' },
      { header: 'Port', key: 'Port' },
      { header: 'Handshake TLS', key: 'Handshake' },
      { header: 'Cipher Suite', key: 'Cipher' },
      { header: 'Status', key: 'Status' }
    ]);
    setExportNotice('PCAP stream summary exported to CSV.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Hidden File Input for browsing */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pcap,.pcapng,.cap,application/vnd.tcpdump.pcap,application/octet-stream"
        className="hidden"
      />

      {/* Upload & Capture Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Upload Dropzone */}
        <div className="lg:col-span-7">
          <ChartCard
            title="PCAP Capture Ingestion"
            subtitle="Supports .pcap, .pcapng, and .cap email capture traces"
          >
            <div
              onClick={handleBrowseClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-[22px] p-7 flex flex-col items-center justify-center text-center transition-all group cursor-pointer ${
                isDragging
                  ? 'border-[#7C3AED] bg-[#ECEAFD]/80 scale-[1.01]'
                  : 'border-[#EAE6DF] hover:border-[#7C3AED]/60 bg-[#FAF9F7]/70'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#EAE6DF] flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-105 group-hover:border-[#7C3AED] transition-all">
                <UploadCloud size={24} className="group-hover:text-[#7C3AED] transition-colors" />
              </div>

              <div className="mt-3 space-y-0.5">
                <h4 className="text-sm font-bold text-[#111111] tracking-tight">
                  {isDragging ? 'Drop your capture file here' : 'Drop your PCAP file here'}
                </h4>
                <p className="text-xs text-[#5F6368]">
                  or click browse to select a capture trace from your system
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="inline-flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full border border-[#EAE6DF] bg-white hover:bg-[#FAF9F7] text-[#111111] font-medium shadow-2xs transition-colors cursor-pointer"
                >
                  <FolderOpen size={14} className="text-[#7C3AED]" />
                  <span>Browse File</span>
                </button>
                <span className="text-[11px] text-[#80868B] font-mono">
                  Max: 250 MB
                </span>
              </div>
            </div>

            {/* Currently Staged Capture File */}
            <div className="mt-4 p-3.5 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#111111] text-white shadow-xs">
                  <FileCode size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#111111] font-mono">
                      {selectedFile.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-[#7C3AED] border border-[#DDD6FE] font-semibold font-mono">
                      {selectedFile.size}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6D5BA8] font-mono mt-0.5">
                    SHA256: {selectedFile.checksum}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="brand"
                  size="md"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto rounded-full"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={15} className="animate-spin" />
                      Parsing Handshakes... {progress}%
                    </span>
                  ) : (
                    'Analyze PCAP'
                  )}
                </Button>
              </div>
            </div>

            {isAnalyzing && (
              <div className="mt-3">
                <div className="w-full bg-[#EAE6DF] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#7C3AED] h-2 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#5F6368] font-mono mt-1">
                  <span>Reconstructing TLS handshakes</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Capture Configuration & Parser Options */}
        <div className="lg:col-span-5 space-y-4">
          <ChartCard
            title="Analysis Parameters"
            subtitle="Cryptographic inspection filters"
          >
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#E3F6EC] border border-[#C8EFE0]">
                <span className="text-[#3D7A5C] font-medium">Deep Packet Inspection</span>
                <span className="font-mono text-[#15803D] font-bold">Enabled (L7)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#DDEBFF] border border-[#CDE1FE]">
                <span className="text-[#4B6B94] font-medium">Cipher Rating Standard</span>
                <span className="font-mono text-[#1E40AF] font-bold">NIST SP 800-52r2</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FEF1E1] border border-[#FCE6CD]">
                <span className="text-[#8C6D52] font-medium">Target Mail Ports</span>
                <span className="font-mono text-[#B45309] font-bold">25, 587, 993, 995</span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF9F7] border border-[#EAE6DF] text-xs text-[#5F6368]">
              <strong className="block text-[#111111] mb-0.5">Privacy Assurance:</strong>
              Inspects unencrypted handshake metadata (ClientHello, ServerHello, Certificates) with zero access to email payloads.
            </div>
          </ChartCard>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 size={16} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisDone && (
        <div className="space-y-4">
          {/* Success Banner */}
          <div className="p-4 rounded-[22px] bg-[#E3F6EC] border border-[#C8EFE0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center border border-[#C8EFE0] shadow-xs">
                <CircleCheck size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111111] flex items-center gap-2">
                  <span>Analysis Completed</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#15803D] font-mono border border-[#C8EFE0] font-semibold">
                    2.41s
                  </span>
                </h3>
                <p className="text-xs text-[#3D7A5C]">
                  46 streams parsed. 5 cryptographic findings flagged for remediation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                icon={FileSpreadsheet}
                onClick={handleExportTraceSummary}
                className="rounded-full bg-white"
              >
                Export Trace CSV
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/findings')}
                className="rounded-full bg-white"
              >
                View Findings
              </Button>
              <Button
                variant="brand"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/tls')}
                className="rounded-full"
              >
                TLS Profile
              </Button>
            </div>
          </div>

          {/* Results KPI Metric Cards */}
          <div>
            <h3 className="text-sm font-bold text-[#111111] mb-3 tracking-tight font-sans">
              Stream Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3.5 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-[#8C6D52] block">Packets</span>
                <span className="text-xl font-bold text-[#111111] block mt-0.5">1,284</span>
                <span className="text-[10px] text-[#8C6D52]">100% Parsed</span>
              </div>

              <div className="p-3.5 rounded-[20px] bg-[#DDEBFF] border border-[#CDE1FE] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-[#4B6B94] block">TLS Sessions</span>
                <span className="text-xl font-bold text-[#111111] block mt-0.5">46</span>
                <span className="text-[10px] text-[#4B6B94]">43 Encrypted</span>
              </div>

              <div className="p-3.5 rounded-[20px] bg-[#E3F6EC] border border-[#C8EFE0] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-[#3D7A5C] block">SMTP</span>
                <span className="text-xl font-bold text-[#111111] block mt-0.5">21</span>
                <span className="text-[10px] text-[#15803D] font-semibold">Secure</span>
              </div>

              <div className="p-3.5 rounded-[20px] bg-[#FEF1E1] border border-[#FCE6CD] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-[#8C6D52] block">IMAP</span>
                <span className="text-xl font-bold text-[#111111] block mt-0.5">17</span>
                <span className="text-[10px] text-[#B45309] font-semibold">Warning</span>
              </div>

              <div className="p-3.5 rounded-[20px] bg-rose-50 border border-rose-200 shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-rose-700 block">POP3</span>
                <span className="text-xl font-bold text-rose-800 block mt-0.5">8</span>
                <span className="text-[10px] text-rose-700 font-semibold">Critical</span>
              </div>

              <div className="p-3.5 rounded-[20px] bg-[#ECEAFD] border border-[#DDD6FE] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-[#6D5BA8] block">Exec Time</span>
                <span className="text-xl font-bold text-[#111111] block mt-0.5">2.41s</span>
                <span className="text-[10px] text-[#7C3AED]">Fast Parser</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
