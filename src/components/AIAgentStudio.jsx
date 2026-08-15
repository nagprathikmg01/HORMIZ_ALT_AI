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
  Activity
} from 'lucide-react';

export default function AIAgentStudio({ simParams, metrics }) {
  const [selectedPersona, setSelectedPersona] = useState('spr_manager');
  const [agentLogs, setAgentLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

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
      `[${timestamp()}] [TELEMETRY_INGEST] Ingesting AIS vessel transponders for 1,420 tankers in Indian Ocean & Gulf of Oman...`,
      `[${timestamp()}] [CHOKEPOINT_ALERT] Strait of Hormuz (26°34'N 56°15'E) 100% naval lockout confirmed. 21.0M bpd flow blocked.`,
      `[${timestamp()}] [SPATIO_GNN] Evaluating spatio-temporal Graph Neural Network nodes. Node weights updated for 48,000 global maritime edges.`,
      `[${timestamp()}] [MILP_SOLVER] Launching Mixed Integer Linear Programming solver. Objective: Min Cost subject to Pipe Ceilings (Petroline 5.0M bpd, Habshan 1.5M bpd).`,
      `[${timestamp()}] [MILP_CONVERGED] Solver converged in 14.2ms. Optimality Score: 99.4%. Primary corridor: ${metrics.routes[0].name}.`,
      `[${timestamp()}] [RISK_SYNTHESIZER] LLM Risk Synthesizer translating war-risk insurance premiums into CPO Memo...`,
      `[${timestamp()}] [ERP_WEBHOOK] Dispatching automated SAP S/4HANA PO-8849-CRUDE to Yanbu terminal offloading manager...`,
      `[${timestamp()}] [HEDGING_EXECUTION] Pre-chartered 12 VLCCs for Cape of Good Hope bypass rotation. Futures order filled: LONG Brent Q4 @ $84.50/bbl.`,
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
      }, (idx + 1) * 350);
    });
  };

  useEffect(() => {
    runAgentTrace();
  }, [selectedPersona, simParams]);

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
            <Bot className="h-5 w-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              AI Decision Agent Studio
            </h3>
            <p className="text-xs text-slate-400">
              Live Spatio-Temporal Reasoning Logs & Persona Execution Trace
            </p>
          </div>
        </div>

        <button
          onClick={runAgentTrace}
          disabled={isRunning}
          className="flex items-center space-x-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          <span>Re-Run AI Agent Reasoning</span>
        </button>
      </div>

      {/* Persona Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {personas.map((p) => {
          const isSelected = selectedPersona === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/60 shadow-md shadow-cyan-950/30'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  p.badgeColor === 'cyan' ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40' :
                  p.badgeColor === 'emerald' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                  'bg-amber-950 text-amber-300 border-amber-500/40'
                }`}>
                  {p.badge}
                </span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>

              <h4 className="text-xs font-bold text-white mt-1.5">{p.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Live Agent Terminal Execution Log Output */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-h-72 overflow-y-auto shadow-inner">
        <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900 text-[11px]">
          <span className="flex items-center space-x-1">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI AGENT EXECUTION TRACE LOG</span>
          </span>
          <span>STATUS: {isRunning ? 'EXECUTING REASONING LOOP...' : 'IDLE / REASONING CONVERGED'}</span>
        </div>

        <div className="space-y-1.5">
          {agentLogs.map((log, idx) => (
            <div key={idx} className="flex items-start space-x-2 leading-relaxed">
              <span className="text-cyan-400 font-bold flex-shrink-0">&gt;</span>
              <span className={idx === agentLogs.length - 1 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
