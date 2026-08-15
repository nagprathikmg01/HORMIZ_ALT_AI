import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  FileText, 
  ShieldAlert, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function AIGeneratorModal({ isOpen, onClose, simParams, metrics }) {
  const [generating, setGenerating] = useState(false);
  const [memoText, setMemoText] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate synthetic streamed response when opened
  useEffect(() => {
    if (isOpen) {
      generateMemo();
    }
  }, [isOpen, simParams]);

  const generateMemo = () => {
    setGenerating(true);
    setMemoText('');

    const destName = metrics.destination.name;
    const bestRoute = metrics.routes[0];
    const altRoute = metrics.routes[1];

    const fullText = `CONFIDENTIAL EXECUTIVE MEMORANDUM
TO: Chief Procurement Officer & Global Logistics Taskforce
FROM: HORMIZ-ALT AI Strategic Rerouting Engine
DATE: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
SUBJECT: Strait of Hormuz 100% Lockout — Rerouting Directive & Commodity Hedging Protocol

1. EXECUTIVE SUMMARY & DISRUPTION ASSESSMENT
A 100% naval lockout of the Strait of Hormuz is active (21.0M bpd global crude at risk). 
For dispatch to ${destName} over a ${simParams.durationDays}-day horizon (${simParams.volumeMbpd}M bpd volume), traditional ocean transit via the Persian Gulf is suspended due to $400k+ war-risk insurance premiums and fleet refusal.

2. RECOMMENDED MULTIMODAL ROUTING DIRECTIVE
Primary Optimal Corridor: ${bestRoute.name} (${bestRoute.tagline})
- Transit Time: ${bestRoute.transitDays} Days (${bestRoute.transitDelta})
- Freight Cost Premium: +$${bestRoute.freightPremium}/bbl (Total Delivered: $${bestRoute.totalCostBbl}/bbl)
- Capacity Utilization: ${bestRoute.capacityUtilization}% of ${bestRoute.capacityMbpd}M bpd Petroline ceiling
- Optimality Index: ${bestRoute.optimalityScore}/100

Secondary Contingency: ${altRoute.name} (${altRoute.tagline})
- Utilization: ${altRoute.capacityUtilization}% Saturation (${altRoute.transitDays} Days transit)

3. AUTOMATED ENTERPRISE ERP & HEDGING ACTIONS
- SAP S/4HANA Webhook: Purchase Order #PO-8849-CRUDE initiated for 500,000 bbl/day Yanbu terminal offloading.
- Futures Market Action: Executed LONG Brent Q4 Futures (ICE) @ $84.50/bbl to hedge spot crude price spikes.
- Tanker Spot Hedges: Pre-chartered 12 VLCCs on Cape of Good Hope rotation to lock in day rates below $180,000/day.

4. CRITICAL PHYSICAL BOTTLENECKS
- Saudi Petroline 5.0M bpd pipe ceiling will reach 97% capacity saturation within 72 hours.
- Recommend immediate drawdown of Sovereign Strategic Petroleum Reserves (SPR) at 250,000 bpd to offset refinery crude API gravity mismatches.

STATUS: ACTION REQUIRED — APPROVED BY AI MILP SOLVER (99.4% OPTIMALITY)`;

    let current = '';
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullText.length) {
        current += fullText[idx];
        setMemoText(current);
        idx++;
      } else {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 8);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card rounded-2xl border border-slate-700 w-full max-w-3xl bg-slate-950 overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
              <Bot className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                LLM Risk Synthesizer • CPO Memo Generator
              </h3>
              <p className="text-[11px] text-slate-400">
                Translating MILP Network Flows into Executable Enterprise Directives
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body / Streamed Memo */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-200 bg-slate-950 leading-relaxed flex-1 space-y-4">
          
          {generating && (
            <div className="flex items-center space-x-2 text-cyan-400 text-xs mb-2">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>Synthesizing real-time war-risk telemetry and SAP webhook payloads...</span>
            </div>
          )}

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl whitespace-pre-wrap selection:bg-cyan-900 selection:text-white text-slate-200 shadow-inner font-mono text-[11.5px]">
            {memoText}
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={generateMemo}
              disabled={generating}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${generating ? 'animate-spin' : ''}`} />
              <span>Regenerate Memo</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-700 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Memo Text'}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              Done & Return
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
