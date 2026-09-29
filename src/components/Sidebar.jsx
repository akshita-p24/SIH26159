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
  Settings
} from 'lucide-react';

const mainNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'PCAP Analysis', path: '/pcap', icon: FileSearch },
  { name: 'Protocols', path: '/protocols', icon: Network },
  { name: 'TLS Analysis', path: '/tls', icon: ShieldCheck },
  { name: 'Findings', path: '/findings', icon: AlertTriangle, badge: '5' },
];

const secondaryNavItems = [
  { name: 'AI Analysis', path: '/ai-analysis', icon: Brain },
  { name: 'Explainability', path: '/explainability', icon: ChartNoAxesCombined },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const renderNavGroup = (items) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-medium transition-all duration-150 ${
              isActive
                ? 'bg-[#111111] text-white font-semibold shadow-sm'
                : 'text-[#5F6368] hover:bg-black/[0.04] hover:text-[#111111]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={16}
                className={isActive ? 'text-white' : 'text-[#80868B] group-hover:text-[#111111]'}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{item.name}</span>
            </div>

            {item.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EAE8FE] text-[#7C3AED]'
                }`}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 h-full max-h-screen bg-[#FAF9F7] text-[#111111] flex flex-col justify-between border-r border-[#EAE6DF] transition-transform duration-200 ease-in-out overflow-hidden lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header (Fixed Top) */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[#EAE6DF]/60 flex-shrink-0 bg-[#FAF9F7]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6366F1] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Shield size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm tracking-tight text-[#111111] font-sans truncate">
              SecureMailScope
            </span>
            <span className="text-[10px] text-[#80868B] truncate font-mono">
              Security Posture
            </span>
          </div>
        </div>

        {/* Navigation Sections (Scrollable Area) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <div className="px-3.5 mb-2 text-[10px] font-semibold text-[#80868B] uppercase tracking-wider font-mono">
              Main
            </div>
            {renderNavGroup(mainNavItems)}
          </div>

          <div>
            <div className="px-3.5 mb-2 text-[10px] font-semibold text-[#80868B] uppercase tracking-wider font-mono">
              Intelligence
            </div>
            {renderNavGroup(secondaryNavItems)}
          </div>
        </nav>

        {/* Bottom Status Pill (Fixed Bottom) */}
        <div className="p-4 border-t border-[#EAE6DF]/60 flex-shrink-0 bg-[#FAF9F7]">
          <div className="p-3 rounded-2xl bg-white border border-[#EAE6DF] flex items-center justify-between shadow-xs">
            <span className="text-[11px] font-medium text-[#111111] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Engine Active
            </span>
            <span className="text-[10px] text-[#80868B] font-mono">TLS 1.3</span>
          </div>
        </div>
      </aside>
    </>
  );
}
