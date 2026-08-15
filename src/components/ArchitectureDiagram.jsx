import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  GitMerge, 
  Workflow, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Layers, 
  ShieldCheck, 
  Zap,
  Activity,
  Code2
} from 'lucide-react';
import { ARCHITECTURE_NODES } from '../data/simulationData';

export default function ArchitectureDiagram({ onOpenAIMemo }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="architecture" className="py-16 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>Polymath Systems Engineering & AI Pipeline</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Autonomous AI Route & Risk Pipeline
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Combining spatio-temporal Graph Neural Networks (GNN), Mixed Integer Linear Programming (MILP), and LLM Risk Synthesizers into automated SAP/Oracle enterprise webhooks.
          </p>
        </div>

        {/* Interactive Step Node Flow (Horizontal Chain) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {ARCHITECTURE_NODES.map((node, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={node.step}
                onClick={() => setActiveStep(idx)}
                className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all relative ${
                  isActive 
                    ? 'border-cyan-500/60 bg-slate-900 shadow-xl shadow-cyan-950/30' 
                    : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                {/* Arrow Connector on desktop */}
                {idx < ARCHITECTURE_NODES.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="h-6 w-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-cyan-400" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-400'
                  }`}>
                    STEP {node.step}
                  </span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />}
                </div>

                <h3 className="text-sm font-bold text-white font-sans">{node.title}</h3>
                <p className="text-[11px] text-cyan-400 font-mono mt-1">{node.tech}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{node.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                  {ARCHITECTURE_NODES[activeStep].step}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {ARCHITECTURE_NODES[activeStep].title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {ARCHITECTURE_NODES[activeStep].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {ARCHITECTURE_NODES[activeStep].desc}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono px-3 py-1 rounded-lg">
                  Performance Metric: {ARCHITECTURE_NODES[activeStep].metrics}
                </span>
                <span className="bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-mono px-3 py-1 rounded-lg">
                  Tech: {ARCHITECTURE_NODES[activeStep].tech}
                </span>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-80 glass-card rounded-xl p-4 border border-cyan-500/30 bg-slate-950/80 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400">
                <Zap className="h-4 w-4" />
                <span>TRY LIVE RISK SYNTHESIZER</span>
              </div>
              <p className="text-xs text-slate-300">
                Test our LLM Risk Synthesizer by generating a simulated Chief Procurement Officer executive brief in real-time.
              </p>
              <button
                onClick={onOpenAIMemo}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>Launch AI Memo Generator</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
