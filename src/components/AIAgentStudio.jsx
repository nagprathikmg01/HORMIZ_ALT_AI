import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Terminal, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Cpu, 
  Zap, 
  ArrowRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function AIAgentStudio({ simParams, metrics, theme = 'dark' }) {
  const [selectedPersona, setSelectedPersona] = useState('spr_manager');
  const [aisShieldEnabled, setAisShieldEnabled] = useState(true);
  const [agentLogs, setAgentLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const isDark = theme === 'dark';

  const personas = [
    {
      id: 'spr_manager',
      name: 'Sovereign SPR Defense Manager',
      desc: 'Focuses on 90-day national emergency stock preservation & zero-risk bypasses.',
      badge: 'Strategic Reserve Strategy',
      badgeColor: 'cyan'
    },
    {
      id: 'refinery_head',
      name: 'Refinery Operations Chief',
      desc: 'Focuses on crude API blend compatibility & minimum terminal demurrages.',
      badge: 'Operational Refinery Strategy',
      badgeColor: 'emerald'
    },
    {
      id: 'trader',
      name: 'Commodity Arbitrage Trader',
      desc: 'Focuses on spot tanker charter pre-hedging & ICE Brent futures spreads.',
      badge: 'Financial Arbitrage Strategy',
      badgeColor: 'amber'
    }
  ];

  const runAgentTrace = () => {
    setIsRunning(true);
    setAgentLogs([]);

    const timestamp = () => new Date().toLocaleTimeString();

    const traceSteps = [
      `[${timestamp()}] [AGENT_INIT] Initializing HORMIZ-ALT AI Agent Instance... Persona: ${personas.find(p => p.id === selectedPersona).name}`,
      `[${timestamp()}] [TELEMETRY_INGEST] Ingesting AIS transponders for 1,420 vessels in Indian Ocean & Gulf of Oman...`,
      aisShieldEnabled 
        ? `[${timestamp()}] [CYBERSECURITY_SHIELD] AIS Zero-Trust Integrity Engine: ACTIVE. Scanning for GPS spoofing anomalies...`
        : `[${timestamp()}] [CYBERSECURITY_SHIELD] AIS Zero-Trust Shield OFF. Raw unverified transponders passing to solver.`,
      aisShieldEnabled 
        ? `[${timestamp()}] [SPOOF_FLAG] 🚨 Anomalous Transponder Flagged! VLCC "Ocean Titan" reporting 48.2 knots at 26°12'N 56°04'E. Discarded as GPS Spoofed.`
        : `[${timestamp()}] [WARN] Unverified vessel speeds ingested without spoofing verification.`,
      `[${timestamp()}] [CHOKEPOINT_ALERT] Strait of Hormuz (26°34'N 56°15'E) 100% naval lockout confirmed. 21.0M bpd flow blocked.`,
      `[${timestamp()}] [SPATIO_GNN] Evaluating spatio-temporal Graph Neural Network nodes. 48,000 global maritime edges updated.`,
      `[${timestamp()}] [MILP_SOLVER] Launching Mixed Integer Linear Programming solver. Objective: Min Cost subject to Pipe Ceilings (Petroline 5.0M bpd, Habshan 1.5M bpd).`,
      `[${timestamp()}] [MILP_CONVERGED] Solver converged in 14.2ms. Optimality Score: 99.4%. Primary corridor: ${metrics.routes[0].name}.`,
      `[${timestamp()}] [RISK_SYNTHESIZER] LLM Risk Synthesizer translating war-risk insurance premiums into CPO Memo...`,
      `[${timestamp()}] [ERP_WEBHOOK] Dispatching automated SAP S/4HANA PO-8849-CRUDE to Yanbu terminal offloading manager...`,
      `[${timestamp()}] [SUCCESS] Autonomous AI Logistics & Rerouting Directive fully executed.`
    ];

    let currentLogs = [];
    traceSteps.forEach((step, idx) => {
      setTimeout(() => {
        currentLogs.push(step);
        setAgentLogs([...currentLogs]);
        if (idx === traceSteps.length - 1) {
          setIsRunning(false);
        }
      }, (idx + 1) * 320);
    });
  };

  useEffect(() => {
    runAgentTrace();
  }, [selectedPersona, aisShieldEnabled, simParams]);

  return (
    <div className={`rounded-2xl p-6 border transition-colors ${
      isDark ? 'stitch-card-dark' : 'stitch-card-light'
    }`}>
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center">
            <Bot className="h-5 w-5 text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className={`text-base font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Decision Agent Studio
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Live Spatio-Temporal Reasoning Logs & Persona Execution Trace
            </p>
          </div>
        </div>

        {/* Security Shield Toggle & Refresh Button */}
        <div className="flex items-center space-x-3">
          
          {/* AIS Zero-Trust Toggle */}
          <button
            onClick={() => setAisShieldEnabled(!aisShieldEnabled)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
              aisShieldEnabled 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 shadow-sm' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {aisShieldEnabled ? <ShieldCheck className="h-4 w-4 text-emerald-400" /> : <ShieldAlert className="h-4 w-4 text-amber-400" />}
            <span>{aisShieldEnabled ? 'AIS Zero-Trust Shield: ON' : 'AIS Shield: OFF'}</span>
          </button>

          <button
            onClick={runAgentTrace}
            disabled={isRunning}
            className="flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Re-Run Trace</span>
          </button>

        </div>
      </div>

      {/* AIS Security Banner if Enabled */}
      {aisShieldEnabled && (
        <div className="mt-4 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 font-mono text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span><strong>Cybersecurity Shield Active:</strong> Filtering 3 anomalous/spoofed vessel transponders (Speed &gt; 40 knots).</span>
          </div>
          <span className="bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-[10px] px-2 py-0.5 rounded font-bold">
            ZERO-TRUST VERIFIED
          </span>
        </div>
      )}

      {/* Persona Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {personas.map((p) => {
          const isSelected = selectedPersona === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? isDark ? 'bg-slate-900 border-sky-500/60 shadow-md' : 'bg-sky-50 border-sky-300 shadow-sm'
                  : isDark ? 'bg-slate-950/60 border-slate-800 hover:bg-slate-900' : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  p.badgeColor === 'cyan' ? 'bg-sky-950 text-sky-300 border-sky-500/40' :
                  p.badgeColor === 'emerald' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                  'bg-amber-950 text-amber-300 border-amber-500/40'
                }`}>
                  {p.badge}
                </span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />}
              </div>

              <h4 className={`text-xs font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
              <p className={`text-[11px] mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Live Agent Terminal Execution Log Output */}
      <div className="mt-4 bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-h-72 overflow-y-auto shadow-inner">
        <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900 text-[11px]">
          <span className="flex items-center space-x-1">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span>AI AGENT EXECUTION TRACE LOG</span>
          </span>
          <span>STATUS: {isRunning ? 'EXECUTING REASONING LOOP...' : 'IDLE / CONVERGED'}</span>
        </div>

        <div className="space-y-1.5">
          {agentLogs.map((log, idx) => (
            <div key={idx} className="flex items-start space-x-2 leading-relaxed">
              <span className="text-sky-400 font-bold flex-shrink-0">&gt;</span>
              <span className={idx === agentLogs.length - 1 ? 'text-emerald-300 font-bold' : log.includes('SPOOF_FLAG') ? 'text-red-400 font-bold' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
