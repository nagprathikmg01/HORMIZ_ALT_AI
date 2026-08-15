import React, { useState } from 'react';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight,
  Calculator,
  Server
} from 'lucide-react';

export default function GTMStrategy({ onOpenAIMemo }) {
  const [refineryCapacityKbpd, setRefineryCapacityKbpd] = useState(250); // 250k bpd refinery

  // Calculate annual risk mitigation ROI
  const annualBarrels = refineryCapacityKbpd * 1000 * 365;
  const estimatedSavingsAnnualM = Math.round((annualBarrels * 4.50) / 1000000); // $4.50/bbl avg risk mitigation
  const subscriptionCostAnnualM = 0.6; // $50k/month = $600k/yr
  const netROI = Math.round((estimatedSavingsAnnualM / subscriptionCostAnnualM) * 100);

  const personas = [
    {
      title: 'Refinery Logistics Heads',
      org: 'Tier-1 Petroleum Refiners (500k+ bpd)',
      desc: 'Optimizes crude API blend inputs, secures Yanbu/Fujairah terminal offloading berths, and eliminates demurrages.',
      icon: Building2
    },
    {
      title: 'Sovereign SPR Managers',
      org: 'Ministry of Energy & Defense (IEA/OPEC+)',
      desc: 'Coordinates strategic petroleum reserve releases with multimodal overland pipeline capacity allocations.',
      icon: Users
    },
    {
      title: 'Commodity Trading Desks',
      org: 'Glencore, Trafigura, Vitol, & Hedge Funds',
      desc: 'Arbitrages spot tanker charter spikes against ICE Brent / Platts Dubai futures spreads ahead of panic breakouts.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="gtm" className="py-16 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-mono text-emerald-300 mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span>Commercial Viability & SaaS Monetization</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Enterprise Go-To-Market (GTM) Strategy
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Targeting $50k/month Enterprise SaaS subscriptions per refinery facility with automated SAP/Oracle ERP webhook integrations.
          </p>
        </div>

        {/* Ideal Customer Personas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {personas.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-cyan-400 font-mono mt-1">{p.org}</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive ROI Calculator & Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left ROI Calculator Card (6 Columns) */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-cyan-500/30 bg-slate-900/80">
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-800">
              <Calculator className="h-5 w-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                Interactive Enterprise ROI Calculator
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 uppercase">Your Refinery Operating Capacity</span>
                  <span className="text-cyan-400 font-bold">{refineryCapacityKbpd},000 Barrels/Day</span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={refineryCapacityKbpd}
                  onChange={(e) => setRefineryCapacityKbpd(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>50k bpd (Regional Refinery)</span>
                  <span>1.0M bpd (Mega Refinery Complex)</span>
                </div>
              </div>

              {/* Calculated Savings Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Est. Annual Disruption Exposure Avoided:</span>
                  <span className="text-emerald-400 font-bold">${estimatedSavingsAnnualM} Million / year</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">HORMIZ-ALT Enterprise SaaS Fee:</span>
                  <span className="text-slate-200 font-bold">$0.60 Million ($50k/month)</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                  <span className="text-cyan-400 font-bold">Estimated Enterprise Net ROI:</span>
                  <span className="text-cyan-400 font-extrabold">{netROI}% ROI</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Enterprise Pricing Tier Card (6 Columns) */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  MOST POPULAR FOR TIER-1 REFINERIES
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Enterprise Command Tier</h3>
                <p className="text-xs text-slate-400">Full API Webhooks to SAP S/4HANA & Oracle ERP</p>
              </div>

              <div className="text-right font-mono">
                <div className="text-2xl font-extrabold text-white">$50,000</div>
                <div className="text-[11px] text-slate-400">/ facility / month</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 mb-6">
              {[
                'Real-Time AIS Vessel & Satellite Chokepoint Telemetry Feeds',
                'Custom MILP Route Optimization Solver tuned to your refinery API blend',
                'Automated SAP S/4HANA & Oracle ERP Webhook Purchase Order Triggers',
                '24/7 Automated War-Risk Insurance Premium Shock Alerts',
                'Weekly Executive Commodity Futures Hedging Briefs'
              ].map((f, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenAIMemo}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Schedule Enterprise Deployment Call</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
