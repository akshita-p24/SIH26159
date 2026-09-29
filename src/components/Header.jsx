import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, UploadCloud, Menu, CheckCircle2, ShieldAlert, AlertTriangle, Info, X } from 'lucide-react';
import Button from './Button';

export default function Header({ onMenuClick, title, subtitle }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'high',
      title: 'Weak 3DES Cipher Flagged',
      desc: 'Observed TLS_RSA_WITH_3DES_EDE_CBC_SHA on SMTP port 587.',
      time: '5m ago',
      read: false
    },
    {
      id: 2,
      type: 'medium',
      title: 'TLS 1.0 Negotiation',
      desc: 'Deprecated handshake detected on POP3 port 995.',
      time: '18m ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'POP3 Certificate SAN Mismatch',
      desc: 'Hostname Subject Alternative Name validation failed.',
      time: '1h ago',
      read: false
    }
  ]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const handleDismissNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
  };

  return (
    <header className="h-16 bg-transparent px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-[#EAE6DF]/60 relative z-30">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-[#111111] hover:bg-black/5 border border-[#EAE6DF]"
          aria-label="Open navigation sidebar"
        >
          <Menu size={18} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight font-sans">
            {title || 'Security Overview'}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#80868B] font-normal hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Search, Upload CTA, Notification & Profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar with ⌘ F badge */}
        <div className="relative hidden md:flex items-center w-56 lg:w-72 bg-white border border-[#EAE6DF] rounded-full px-3.5 py-1.5 shadow-2xs">
          <Search size={14} className="text-[#80868B] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search or type a command"
            className="w-full text-xs bg-transparent focus:outline-none text-[#111111] placeholder-[#9AA0A6]"
          />
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#80868B] bg-[#FAF9F7] border border-[#EAE6DF] rounded-md">
            ⌘ F
          </kbd>
        </div>

        {/* Quick PCAP Upload CTA */}
        <Button
          variant="brand"
          size="sm"
          icon={UploadCloud}
          onClick={() => navigate('/pcap')}
          className="hidden sm:inline-flex rounded-full"
        >
          New Analysis
        </Button>

        {/* Interactive Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) setUnreadCount(0);
            }}
            className="relative p-2 rounded-full text-[#5F6368] hover:text-[#111111] hover:bg-black/5 bg-white border border-[#EAE6DF] transition-colors cursor-pointer shadow-2xs"
            title="Security Notifications"
            aria-label="Security Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E07A5F] border-2 border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#EAE6DF] rounded-[22px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 bg-[#FAF9F7] border-b border-[#EAE6DF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#111111] font-sans">Security Alerts</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ECEAFD] text-[#7C3AED] font-bold font-mono">
                    {notifications.length} Total
                  </span>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-medium text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#EAE6DF]/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#80868B]">
                    <CheckCircle2 size={24} className="mx-auto text-emerald-500 mb-2" />
                    No active notifications. All systems secure.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 hover:bg-[#FAF9F7] transition-colors flex items-start justify-between gap-3 ${
                        !n.read ? 'bg-[#FAF9F7]/40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-full mt-0.5 flex-shrink-0 ${
                          n.type === 'high'
                            ? 'bg-rose-100 text-rose-600'
                            : n.type === 'medium'
                            ? 'bg-[#FEF1E1] text-[#B45309]'
                            : 'bg-[#ECEAFD] text-[#7C3AED]'
                        }`}>
                          {n.type === 'high' ? (
                            <ShieldAlert size={14} />
                          ) : n.type === 'medium' ? (
                            <AlertTriangle size={14} />
                          ) : (
                            <Info size={14} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs text-[#111111]">{n.title}</span>
                          </div>
                          <p className="text-[11px] text-[#5F6368] mt-0.5 leading-snug">
                            {n.desc}
                          </p>
                          <span className="text-[10px] text-[#9AA0A6] font-mono mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDismissNotification(n.id)}
                        className="text-[#9AA0A6] hover:text-[#111111] p-1 rounded-full hover:bg-black/5 cursor-pointer"
                        title="Dismiss"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 bg-[#FAF9F7] border-t border-[#EAE6DF] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/findings');
                  }}
                  className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer"
                >
                  View All Cryptographic Findings →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-white">
            AV
          </div>
        </div>
      </div>
    </header>
  );
}
