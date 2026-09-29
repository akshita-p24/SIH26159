import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  FileSearch,
  Network,
  ShieldCheck,
  AlertTriangle,
  Brain,
  ChartNoAxesCombined,
  FileText,
  Settings,
  ChevronRight,
  Lock,
  Layers
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'PCAP Analysis', path: '/pcap', icon: FileSearch },
  { name: 'Protocols', path: '/protocols', icon: Network },
  { name: 'TLS Analysis', path: '/tls', icon: ShieldCheck },
  { name: 'Findings', path: '/findings', icon: AlertTriangle, badge: '5' },
  { name: 'AI Analysis', path: '/ai-analysis', icon: Brain },
  { name: 'Explainability', path: '/explainability', icon: ChartNoAxesCombined },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B192C] text-white flex flex-col justify-between border-r border-[#0B192C]/80 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Area */}
        <div>
          <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-lg bg-[#DD6E2D] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <Shield size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white font-sans truncate">
                  SecureMailScope
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white/15 text-[#EDDEC2] uppercase tracking-wider font-mono">
                  SaaS
                </span>
              </div>
              <span className="text-[10px] text-[#EDDEC2]/80 truncate font-mono">
                Posture v2.4 Enterprise
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#EDDEC2]/60 uppercase tracking-widest font-mono">
              Core Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#EDDEC2] text-[#0B192C] font-semibold shadow-xs border-l-4 border-l-[#DD6E2D]'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={16}
                      className={isActive ? 'text-[#DD6E2D]' : 'text-white/70 group-hover:text-white'}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                          isActive
                            ? 'bg-[#DD6E2D] text-white'
                            : 'bg-white/20 text-[#EDDEC2]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight size={13} className="text-[#DD6E2D]" />
                    )}
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom System Status Widget */}
        <div className="p-4 border-t border-white/10 bg-black/15">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#EDDEC2] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                TLS Engine Ready
              </span>
              <span className="text-[10px] text-white/60 font-mono">NIST SP800</span>
            </div>
            <div className="text-[10px] text-white/70 leading-tight">
              Continuous cryptographic evaluation running for SMTP/IMAP/POP3.
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-white/50 px-1 font-mono">
            <span>Org: SecOps Alpha</span>
            <span>TLS 1.3 Strict</span>
          </div>
        </div>
      </aside>
    </>
  );
}
