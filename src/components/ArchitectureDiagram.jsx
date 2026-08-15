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
  Code2,
  Table
} from 'lucide-react';
import { ARCHITECTURE_NODES } from '../data/simulationData';

export default function ArchitectureDiagram({ onOpenAIMemo, onOpenDbSchema, theme = 'dark' }) {
  const [activeStep, setActiveStep] = useState(0);
  const isDark = theme === 'dark';

  return (
    <section id="architecture" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
            isDark ? 'bg-sky-950/80 border border-sky-500/40 text-sky-300' : 'bg-sky-50 border border-sky-200 text-sky-700'
          }`}>
            <Cpu className="h-3.5 w-3.5 text-sky-500" />
            <span>Polymath Systems Engineering & AI Pipeline</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Autonomous AI Route & Risk Pipeline
          </h2>
          <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Combining spatio-temporal Graph Neural Networks (GNN), Mixed Integer Linear Programming (MILP), and LLM Risk Synthesizers into automated SAP/Oracle enterprise webhooks.
          </p>

          <div className="mt-4 flex items-center justify-center space-x-3">
            <button
              onClick={onOpenDbSchema}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm"
            >
              <Database className="h-4 w-4 text-sky-400" />
              <span>View Relational SQL DDL Schema</span>
            </button>
          </div>
        </div>

        {/* Interactive Step Node Flow (Horizontal Chain) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {ARCHITECTURE_NODES.map((node, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={node.step}
                onClick={() => setActiveStep(idx)}
                className={`rounded-2xl p-5 border cursor-pointer transition-all relative ${
                  isActive 
                    ? isDark ? 'border-sky-500/60 bg-slate-900 shadow-xl' : 'border-sky-300 bg-sky-50 shadow-md'
                    : isDark ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                {idx < ARCHITECTURE_NODES.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                      isDark ? 'bg-slate-900 border-slate-700 text-sky-400' : 'bg-white border-slate-300 text-sky-600'
                    }`}>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-sky-950 text-sky-300 border border-sky-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    STEP {node.step}
                  </span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />}
                </div>

                <h3 className={`text-sm font-bold font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>{node.title}</h3>
                <p className="text-[11px] text-sky-500 font-mono mt-1">{node.tech}</p>
                <p className={`text-xs mt-2 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{node.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Card */}
        <div className={`rounded-2xl p-6 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-extrabold text-sky-500 font-mono">
                  {ARCHITECTURE_NODES[activeStep].step}
                </span>
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {ARCHITECTURE_NODES[activeStep].title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {ARCHITECTURE_NODES[activeStep].subtitle}
                  </p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {ARCHITECTURE_NODES[activeStep].desc}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-sky-300' : 'bg-slate-100 border-slate-300 text-sky-700'
                }`}>
                  Performance: {ARCHITECTURE_NODES[activeStep].metrics}
                </span>
                <span className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-emerald-300' : 'bg-slate-100 border-slate-300 text-emerald-700'
                }`}>
                  Tech: {ARCHITECTURE_NODES[activeStep].tech}
                </span>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-80 rounded-xl p-4 border space-y-3 bg-slate-900 border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-400">
                <Zap className="h-4 w-4" />
                <span>TRY LIVE RISK SYNTHESIZER</span>
              </div>
              <p className="text-xs text-slate-300">
                Test our LLM Risk Synthesizer by generating a simulated Chief Procurement Officer executive brief in real-time.
              </p>
              
              <div className="space-y-2 pt-1">
                <button
                  onClick={onOpenAIMemo}
                  className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded-lg text-xs transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span>Launch AI Memo Generator</span>
                </button>

                <button
                  onClick={onOpenDbSchema}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-lg text-xs transition-all border border-slate-700"
                >
                  <Database className="h-4 w-4 text-sky-400" />
                  <span>View SQL Relational DDL</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
