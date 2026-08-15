import React from 'react';
import { 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Workflow, 
  TrendingUp, 
  FlaskConical, 
  Globe2, 
  Brain,
  CheckCircle2,
  Award
} from 'lucide-react';

export default function PolymathMatrix({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const dimensions = [
    {
      domain: 'Systems Thinking',
      icon: Workflow,
      tagColor: 'bg-blue-950 text-blue-300 border-blue-800/60',
      implementation: 'Multi-echelon chokepoint feedback loops modeling Hormuz → Bab-el-Mandeb cascading risk.',
      evidence: 'Simulates 21.0M bpd supply shock and alternative pipeline bottlenecks (ADCOP & Petroline).'
    },
    {
      domain: 'AI Literacy',
      icon: Cpu,
      tagColor: 'bg-indigo-950 text-indigo-300 border-indigo-800/60',
      implementation: 'Spatio-temporal Graph Neural Networks (GNN) + Mixed-Integer Linear Programming (MILP).',
      evidence: 'Recalculates min-cost network flow across sea lanes, pipelines, and rail in <150ms.'
    },
    {
      domain: 'Software Architecture & QA',
      icon: Layers,
      tagColor: 'bg-slate-800 text-slate-200 border-slate-700',
      implementation: 'Event-driven webhooks with idempotent SAP S/4HANA & Oracle ERP transaction logging.',
      evidence: 'Modular React 19 architecture with strict type boundaries and automated telemetry retries.'
    },
    {
      domain: 'Cybersecurity',
      icon: ShieldCheck,
      tagColor: 'bg-rose-950 text-rose-300 border-rose-800/60',
      implementation: 'AIS Zero-Trust Integrity Engine filtering spoofed maritime GPS transponder signals.',
      evidence: 'Detects 48-knot impossible VLCC vessel speeds and discards corrupted telemetry nodes.'
    },
    {
      domain: 'Applied Psychology',
      icon: Brain,
      tagColor: 'bg-amber-950 text-amber-300 border-amber-800/60',
      implementation: 'Market panic index & CPO behavioral bias mitigation interface design.',
      evidence: 'Replaces panic selling with structured decision trees and automated procurement briefs.'
    },
    {
      domain: 'Global Go-To-Market (GTM)',
      icon: TrendingUp,
      tagColor: 'bg-emerald-950 text-emerald-300 border-emerald-800/60',
      implementation: 'Enterprise seat licensing model ($50k/mo per facility) targeting SPRs & mega-refiners.',
      evidence: 'Clear ICP segmentation (Aramco, Reliance Jamnagar, Sinopec) with calculated ROI metrics.'
    },
    {
      domain: 'Chemical Engineering',
      icon: FlaskConical,
      tagColor: 'bg-violet-950 text-violet-300 border-violet-800/60',
      implementation: 'Crude API gravity & sulfur blend incompatibility diagnostic badge (+3.2% penalty).',
      evidence: 'Calculates hydrocracker desulfurization costs and net margin impact (-$1.40/bbl).'
    },
    {
      domain: 'Macroeconomics',
      icon: Globe2,
      tagColor: 'bg-sky-950 text-sky-300 border-sky-800/60',
      implementation: 'Sovereign Strategic Petroleum Reserve (SPR) depletion countdown & CPI inflation shock.',
      evidence: 'Real-time countdown table for US, China, India, JP/KR, and EU emergency reserves.'
    }
  ];

  return (
    <section id="polymath-matrix" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-[#090d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono mb-3 ${
            isDark ? 'bg-slate-800/90 border border-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-800'
          }`}>
            <Award className="h-3.5 w-3.5 text-blue-400" />
            <span>Polymath Fellowship 8-Dimension Synthesis Matrix</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Polymath Intersection Matrix
          </h2>
          <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Concrete implementation map connecting HORMIZ-ALT AI across all 8 evaluation criteria defined in the Eonexea Fellowship qualifier syllabus.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dimensions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl p-5 border transition-all duration-200 ${
                  isDark 
                    ? 'stitch-card-dark hover:border-slate-700' 
                    : 'stitch-card-light hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${item.tagColor}`}>
                    {item.domain}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <p className={`text-xs font-semibold leading-snug font-sans ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {item.implementation}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-start space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className={`text-[11px] font-mono leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.evidence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
