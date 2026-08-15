import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Compass, 
  Activity, 
  FileText, 
  Cpu, 
  TrendingUp, 
  Download, 
  Zap,
  Menu,
  X,
  PlayCircle,
  Navigation,
  Bot,
  Sun,
  Moon,
  Tv,
  DollarSign,
  Award
} from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenAIMemo, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Compass },
    { id: 'map', label: 'GIS Route Map', icon: Navigation },
    { id: 'polymath-matrix', label: 'Polymath Matrix', icon: Award },
    { id: 'news', label: 'News Broadcast', icon: Tv },
    { id: 'financial-crisis', label: 'Financial Shock', icon: DollarSign },
    { id: 'simulator', label: 'Routing Engine', icon: Activity },
    { id: 'agent-studio', label: 'AI Agent Studio', icon: Bot },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
    { id: 'gtm', label: 'Business & GTM', icon: TrendingUp },
    { id: 'vulnerabilities', label: 'Limits', icon: ShieldAlert },
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${
      isDark 
        ? 'bg-[#090d16]/90 border-slate-800/80 text-slate-100' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Disruption Alert Bar */}
      <div className={`border-b px-4 py-1.5 text-xs transition-colors ${
        isDark ? 'bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border-rose-800/40 text-slate-200' : 'bg-red-50 border-red-200 text-red-900'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-rose-400 tracking-wide uppercase">Live Disruption Engine:</span>
            <span>Strait of Hormuz 100% Chokepoint Lockout Active (21M bpd risk)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`hidden sm:inline px-2 py-0.5 rounded text-[11px] font-mono border ${
              isDark ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
            }`}>
              ● Polymath 8-Dimension Matrix Verified
            </span>
            <span className="font-mono text-[11px] opacity-75">Polymath Fellowship 2026</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className={`h-9 w-9 rounded-xl p-0.5 shadow-sm border ${
              isDark ? 'bg-slate-900 border-blue-500/40 text-blue-400' : 'bg-blue-50 border-blue-300 text-blue-600'
            } flex items-center justify-center`}>
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight font-mono">HORMIZ-ALT</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  isDark ? 'bg-blue-950 border-blue-500/40 text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-700'
                }`}>AI</span>
              </div>
              <p className="text-[10px] opacity-60 tracking-wider uppercase font-sans hidden sm:block">Global Energy Logistics Engine</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? isDark ? 'bg-blue-950 text-blue-300 border border-blue-800 font-bold' : 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-400' : 'opacity-60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="flex items-center space-x-3">
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDark ? 'Switch to Clean Light Theme' : 'Switch to Executive Dark Theme'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={onOpenAIMemo}
              className="hidden sm:flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-2 rounded-lg text-xs transition-all shadow-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>AI CPO Memo</span>
            </button>

            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 pt-2 pb-4 space-y-2 ${
          isDark ? 'bg-[#090d16] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm hover:bg-slate-800/40"
              >
                <Icon className="h-4 w-4 text-blue-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
