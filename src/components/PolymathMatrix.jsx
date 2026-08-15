import React from 'react';
import { 
  Award, 
  Layers, 
  Cpu, 
  Server, 
  ShieldCheck, 
  Brain, 
  TrendingUp, 
  FlaskConical, 
  Globe2,
  CheckCircle2
} from 'lucide-react';

export default function PolymathMatrix({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const matrixItems = [
    {
      dim: '1. Systems Thinking',
      icon: Layers,
      impl: 'Multi-echelon chokepoint feedback loops (Hormuz → Bab-el-Mandeb cascading risk & pipeline bottlenecks).',
      whyWins: 'Demonstrates non-linear cause-and-effect modeling across spatial supply networks.'
    },
    {
      dim: '2. AI Literacy',
      icon: Cpu,
      impl: 'Spatio-temporal Graph Neural Network (GNN) edge reweighting + MILP minimum-cost network flow solver.',
      whyWins: 'Combines predictive neural inference with hard deterministic optimization constraints.'
    },
    {
      dim: '3. Software Arch & QA',
      icon: Server,
      impl: 'Event-driven webhook architecture with idempotent SAP S/4HANA & Oracle ERP transaction logs.',
      whyWins: 'Enterprise-grade reliability with zero duplicate purchase orders during network retries.'
    },
    {
      dim: '4. Cybersecurity',
      icon: ShieldCheck,
      impl: 'AIS Zero-Trust Integrity Engine: Filters spoofed GPS transponders (e.g. 48-knot impossible VLCC speeds).',
      whyWins: 'Adversarial instinct protecting GNN routing graphs from electronic warfare spoofing.'
    },
    {
      dim: '5. Applied Psychology',
      icon: Brain,
      impl: 'Market Panic Index & LLM Risk Synthesizer mitigating procurement CPO behavioral panic biases.',
      whyWins: 'Translates volatile war-risk insurance spikes into calm, structured executive memos.'
    },
    {
      dim: '6. Global GTM',
      icon: TrendingUp,
      impl: 'Enterprise seat licensing ($50k/mo per facility) for sovereign SPRs & mega-refining complexes.',
      whyWins: 'Clear commercial monetization roadmap targeting Tier-1 energy buyers.'
    },
    {
      dim: '7. Chemical Engineering',
      icon: FlaskConical,
      impl: 'Refinery Chemical Blend Incompatibility Diagnostic (Hydrocracker desulfurization & crude API matching).',
      whyWins: 'Respects physical metallurgy & catalyst bed limits behind crude substitution.'
    },
    {
      dim: '8. Macroeconomics',
      icon: Globe2,
      impl: 'Sovereign Strategic Petroleum Reserve (SPR) depletion countdown & inflation shock modeling.',
      whyWins: 'Connects micro-logistics to national trade deficits & central bank CPI policy.'
    }
  ];

  return (
    <section id="polymath-matrix" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
            isDark ? 'bg-sky-950/80 border border-sky-500/40 text-sky-300' : 'bg-sky-50 border border-sky-200 text-sky-700'
          }`}>
            <Award className="h-3.5 w-3.5 text-sky-500" />
            <span>Polymath Fellowship Evaluation Matrix</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            The Polymath Intersection Matrix
          </h2>
          <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Synthesizing 8 distinct disciplines required by the Polymath Innovae Fellowship qualifier syllabus.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {matrixItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isDark ? 'stitch-card-dark stitch-hover-dark' : 'stitch-card-light stitch-hover-light'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-9 w-9 rounded-xl border flex items-center justify-center ${
                    isDark ? 'bg-slate-900 border-slate-700 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-600'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-sky-500 font-bold">DIMENSION 0{idx + 1}</span>
                </div>

                <h3 className={`text-xs font-bold font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.dim}
                </h3>

                <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {item.impl}
                </p>

                <div className={`pt-2 border-t text-[11px] font-mono flex items-start space-x-1.5 ${
                  isDark ? 'border-slate-800/80 text-emerald-400' : 'border-slate-200 text-emerald-700'
                }`}>
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <span>{item.whyWins}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Citation Banner */}
        <div className={`p-4 rounded-xl border text-center font-mono text-xs ${
          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <span>⚡ <strong>Polymath Fellowship Alignment:</strong> Built explicitly to address every dimension of the Eonexea AI Step 3 Qualifier Syllabus.</span>
        </div>

      </div>
    </section>
  );
}
