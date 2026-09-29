import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import PCAPAnalysis from './pages/PCAPAnalysis';
import Protocols from './pages/Protocols';
import TLSAnalysis from './pages/TLSAnalysis';
import Findings from './pages/Findings';
import AIAnalysis from './pages/AIAnalysis';
import Explainability from './pages/Explainability';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const routeMetadata = {
  '/': {
    title: 'Security Overview',
    subtitle: 'AI-Assisted Cryptographic Security Posture'
  },
  '/pcap': {
    title: 'PCAP Analysis',
    subtitle: 'Traffic trace ingestion and handshake parsing'
  },
  '/protocols': {
    title: 'Protocol Analysis',
    subtitle: 'SMTP, IMAP, and POP3 channel evaluation'
  },
  '/tls': {
    title: 'TLS Security Analysis',
    subtitle: 'Version distribution, ciphers, and STARTTLS audit'
  },
  '/findings': {
    title: 'Security Findings',
    subtitle: 'Identified vulnerabilities and remediation directives'
  },
  '/ai-analysis': {
    title: 'AI Analysis',
    subtitle: 'Machine-learning models for handshake evaluation'
  },
  '/explainability': {
    title: 'AI Explainability',
    subtitle: 'SHAP feature attribution and scoring factors'
  },
  '/reports': {
    title: 'Assessment Reports',
    subtitle: 'Formal compliance and posture audit report'
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Compliance standards and model parameters'
  }
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentMeta = routeMetadata[location.pathname] || {
    title: 'SecureMailScope',
    subtitle: 'AI Cryptographic Posture Engine'
  };

  return (
    <div className="min-h-screen w-screen bg-[#EAE8FE] flex items-center justify-center p-0 sm:p-3 lg:p-5 font-sans antialiased text-[#111111] overflow-hidden">
      {/* Reference Rounded App Shell */}
      <div className="app-canvas w-full max-w-[1560px] h-screen sm:h-[96vh] flex overflow-hidden border border-white/60">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FAF9F7]">
          {/* Top Header */}
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            title={currentMeta.title}
            subtitle={currentMeta.subtitle}
          />

          {/* Scrollable Viewport */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-[1400px] mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pcap" element={<PCAPAnalysis />} />
                <Route path="/protocols" element={<Protocols />} />
                <Route path="/tls" element={<TLSAnalysis />} />
                <Route path="/findings" element={<Findings />} />
                <Route path="/ai-analysis" element={<AIAnalysis />} />
                <Route path="/explainability" element={<Explainability />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
