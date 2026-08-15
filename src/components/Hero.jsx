import React from 'react';
import { 
  ShieldAlert, 
  Layers, 
  TrendingUp, 
  Anchor, 
  ArrowRight, 
  Play, 
  Zap, 
  Activity, 
  Globe, 
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Hero({ onStartSimulation, onOpenAIMemo }) {
  return (
    <section id="hero" className="relative py-12 lg:py-20 overflow-hidden border-b border-slate-800/60 bg-slate-950">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Fellowship Badge & Lockout Status */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-500/10">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span>Polymath Innovae Fellowship 2026 • Problem Statement #3</span>
          </div>

          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-500/50 px-3 py-1.5 rounded-full text-xs font-mono text-red-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>Chokepoint Lockout Active: 100% Channel Blockade</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            HORMIZ-ALT <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-mono text-slate-300 tracking-wide">
            Global Energy Logistics & Strategic Rerouting Engine
          </p>

          <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Real-time geopolitical disruption mitigation, multimodal pipeline-rail-sea rerouting heuristics, and predictive oil inventory hedging for sovereign SPRs, Tier-1 refineries, and commodity trading desks.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartSimulation}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <Activity className="h-4 w-4" />
              <span>Launch Multimodal Simulator</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>

            <a
              href="#video"
              className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all hover:border-slate-600"
            >
              <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
              <span>Watch 2-Min Pitch Video</span>
            </a>

            <button
              onClick={onOpenAIMemo}
              className="flex items-center space-x-2 bg-slate-900/60 hover:bg-slate-900 text-cyan-300 border border-cyan-500/40 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
            >
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>AI Risk Synthesizer</span>
            </button>
          </div>
        </div>

        {/* Live Operational Metric Cards Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Chokepoint Flow at Risk</span>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">21.0 M</div>
            <div className="text-[11px] text-amber-300/90 mt-1 flex items-center">
              <span>Barrels/Day (~21% of global crude)</span>
            </div>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Evaluated Bypasses</span>
              <Layers className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">3 Routes</div>
            <div className="text-[11px] text-cyan-300/90 mt-1 flex items-center">
              <span>Petroline + Habshan + INSTC Rail</span>
            </div>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Mitigated War Premium</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">$14.20</div>
            <div className="text-[11px] text-emerald-300/90 mt-1 flex items-center">
              <span>Saved / bbl vs Spot Freight Panic</span>
            </div>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">MILP Solver Optimality</span>
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.4%</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center">
              <span>Network Flow Convergence Rate</span>
            </div>
          </div>
        </div>

        {/* Command Center Chokepoint Visual Radar Banner */}
        <div className="mt-8 glass-card rounded-2xl p-6 border border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Radar Map Graphic simulation */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="relative h-16 w-16 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-40"></div>
                <Globe className="h-8 w-8 text-cyan-400" />
                <div className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white font-mono">CRITICAL CHOKEPOINT MONITOR</span>
                  <span className="bg-red-950 border border-red-500/40 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">STATUS: CRITICAL</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Strait of Hormuz (26°34'N 56°15'E) • Width: 21 nautical miles • Vessels in transit queue: 142 VLCCs
                </p>
              </div>
            </div>

            {/* Right Quick Telemetry Counters */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 w-full lg:w-auto justify-start lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
              <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">VLCC DAY RATE</span>
                <span className="text-amber-400 font-bold">$218,500/day (+142%)</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">BRENT FUTURES</span>
                <span className="text-emerald-400 font-bold">$94.80/bbl (+18.4%)</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">PETROLINE THROUGHPUT</span>
                <span className="text-cyan-400 font-bold">4.85 M bpd (97%)</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
