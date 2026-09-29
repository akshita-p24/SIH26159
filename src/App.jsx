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
    subtitle: 'AI-Assisted Cryptographic Security Assessment'
  },
  '/pcap': {
    title: 'PCAP Analysis',
    subtitle: 'Analyze captured email traffic and identify cryptographic security weaknesses.'
  },
  '/protocols': {
    title: 'Protocol Analysis',
    subtitle: 'Cryptographic posture evaluation for SMTP, IMAP, and POP3 email channels'
  },
  '/tls': {
    title: 'TLS Security Analysis',
    subtitle: 'Version distribution, cipher classification, and opportunistic STARTTLS audit'
  },
  '/findings': {
    title: 'Security Findings',
    subtitle: 'Enterprise vulnerability matrix with packet evidence and remediation directives'
  },
  '/ai-analysis': {
    title: 'AI Security Analysis',
    subtitle: 'Machine-learning models used to classify cryptographic security posture.'
  },
  '/explainability': {
    title: 'AI Explainability',
    subtitle: 'Understand which security features influenced the model prediction.'
  },
  '/reports': {
    title: 'Security Assessment Report',
    subtitle: 'Auditor-ready compliance and cryptographic posture report preview'
  },
  '/settings': {
    title: 'System Settings',
    subtitle: 'Configure compliance baseline profiles and AI model sensitivities'
  }
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentMeta = routeMetadata[location.pathname] || {
    title: 'SecureMailScope',
    subtitle: 'AI-Assisted Cryptographic Security Posture Assessment'
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F3F1] font-sans antialiased text-[#17151A]">
      {/* SaaS Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main SaaS Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto">
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
  );
}
