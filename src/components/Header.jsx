import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, UploadCloud, Menu, User, Shield, CheckCircle2 } from 'lucide-react';
import Button from './Button';

export default function Header({ onMenuClick, title, subtitle }) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-[#E5DFD8] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-[#242126] hover:bg-[#F5F3F1] border border-[#E5DFD8]"
          aria-label="Open navigation sidebar"
        >
          <Menu size={18} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#17151A] tracking-tight font-sans flex items-center gap-2">
            <span>{title || 'Security Overview'}</span>
          </h1>
          {subtitle && (
            <p className="text-xs text-[#77727A] font-normal hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Search, Status, Upload CTA, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-56 lg:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77727A]" />
          <input
            type="text"
            placeholder="Search ciphers, packets, CVEs..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F3F1] border border-[#E5DFD8] rounded-[8px] focus:outline-none focus:border-[#DD6E2D] focus:bg-white text-[#17151A] placeholder-[#77727A]"
          />
        </div>

        {/* Live Cryptographic Engine Status */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5F3F1] border border-[#E5DFD8] text-[11px] font-mono text-[#242126]">
          <CheckCircle2 size={13} className="text-[#166534]" />
          <span>Engine: Active (pcap-engine-v4)</span>
        </div>

        {/* Quick PCAP Upload Button */}
        <Button
          variant="primary"
          size="sm"
          icon={UploadCloud}
          onClick={() => navigate('/pcap')}
          className="hidden sm:inline-flex"
        >
          Analyze PCAP
        </Button>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-[8px] text-[#77727A] hover:text-[#17151A] hover:bg-[#F5F3F1] border border-[#E5DFD8] transition-colors"
          title="Security Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DD6E2D]" />
        </button>

        {/* User Identity Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#E5DFD8]">
          <div className="w-8 h-8 rounded-full bg-[#0B192C] text-[#EDDEC2] flex items-center justify-center font-bold text-xs border border-[#0B192C]/20">
            AV
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-[#17151A] leading-tight">
              Dr. A. Vance
            </div>
            <div className="text-[10px] text-[#77727A] font-mono">
              SecOps Cryptographer
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
