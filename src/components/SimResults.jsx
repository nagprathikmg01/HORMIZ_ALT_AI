import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  FileCheck, 
  Zap, 
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';

export default function SimResults({ metrics, onOpenAIMemo }) {
  const [activeView, setActiveView] = useState('cards'); // 'cards' | 'charts' | 'table'

  const chartData = metrics.routes.map(r => ({
    name: r.id === 'alt1' ? 'Alt 1: Petroline' : r.id === 'alt2' ? 'Alt 2: Fujairah' : 'Alt 3: INSTC Rail',
    transitDays: r.transitDays,
    freightPremium: r.freightPremium,
    totalCostBbl: r.totalCostBbl,
    capacityUsage: r.capacityUtilization,
    optimality: r.optimalityScore,
    risk: r.riskIndex
  }));

  const radarData = [
    { subject: 'Optimality Score', Alt1: metrics.routes[0].optimalityScore, Alt2: metrics.routes[1].optimalityScore, Alt3: metrics.routes[2].optimalityScore },
    { subject: 'Capacity Buffer', Alt1: 100 - metrics.routes[0].capacityUtilization, Alt2: Math.max(0, 100 - metrics.routes[1].capacityUtilization), Alt3: Math.max(0, 100 - metrics.routes[2].capacityUtilization) },
    { subject: 'Speed (Inv Delay)', Alt1: Math.max(10, 100 - metrics.routes[0].transitDays * 3), Alt2: Math.max(10, 100 - metrics.routes[1].transitDays * 3), Alt3: Math.max(10, 100 - metrics.routes[2].transitDays * 3) },
    { subject: 'Security Score', Alt1: 100 - metrics.routes[0].riskIndex, Alt2: 100 - metrics.routes[1].riskIndex, Alt3: 100 - metrics.routes[2].riskIndex },
    { subject: 'Cost Efficiency', Alt1: Math.max(10, 100 - metrics.routes[0].totalCostBbl * 4), Alt2: Math.max(10, 100 - metrics.routes[1].totalCostBbl * 4), Alt3: Math.max(10, 100 - metrics.routes[2].totalCostBbl * 4) }
  ];

  return (
    <div className="space-y-6">
      
      {/* Financial Impact Banner */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 shadow-xl shadow-cyan-950/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              ESTIMATED FINANCIAL EXPOSURE & MITIGATION
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                ${(metrics.netSavingsM / 1000).toFixed(2)}B
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center">
                <TrendingDown className="h-4 w-4 mr-0.5" />
                Net Hedging & Cost Savings
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Unmitigated market panic exposure: <span className="text-red-400 font-mono font-bold">${metrics.unmitigatedLossM}M</span> over {metrics.totalVolumeBarrels / 1000000}M bbl dispatch.
            </p>
          </div>

          <button
            onClick={onOpenAIMemo}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            <FileCheck className="h-4 w-4" />
            <span>Generate CPO Executive Memo</span>
          </button>
        </div>
      </div>

      {/* Results Navigation Tabs (Cards vs Recharts vs Dynamic Table) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeView === 'cards'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Alternative Route Cards
          </button>

          <button
            onClick={() => setActiveView('charts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeView === 'charts'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recharts Cost & Radar
          </button>

          <button
            onClick={() => setActiveView('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeView === 'table'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metrics Table
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-mono hidden sm:block">
          MILP Solver Output • {metrics.destination.name}
        </span>
      </div>

      {/* VIEW 1: Alternative Route Cards */}
      {activeView === 'cards' && (
        <div className="space-y-4">
          {metrics.routes.map((route, idx) => {
            const isBest = idx === 0;
            return (
              <div
                key={route.id}
                className={`glass-card rounded-2xl p-5 border transition-all relative overflow-hidden ${
                  isBest 
                    ? 'border-cyan-500/60 bg-slate-900/90 shadow-xl shadow-cyan-950/20' 
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                {/* Top Badge & Optimality Score */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-900 border border-slate-700 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      ALT {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">{route.name}</h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      route.statusColor === 'emerald'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : route.statusColor === 'cyan'
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                        : route.statusColor === 'crimson'
                        ? 'bg-red-950 text-red-300 border-red-500/40'
                        : 'bg-amber-950 text-amber-300 border-amber-500/40'
                    }`}>
                      {route.status}
                    </span>

                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      Score: {route.optimalityScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4">{route.tagline}</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 mb-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">TOTAL TRANSIT</span>
                    <span className="text-white font-bold text-sm">{route.transitDays} Days</span>
                    <span className="text-amber-400 text-[10px] block">{route.transitDelta}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">FREIGHT PREMIUM</span>
                    <span className="text-emerald-400 font-bold text-sm">+${route.freightPremium}/bbl</span>
                    <span className="text-slate-400 text-[10px] block">${route.totalCostBbl} total</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">CAPACITY USAGE</span>
                    <span className="text-cyan-400 font-bold text-sm">{route.capacityUtilization}%</span>
                    <span className="text-slate-400 text-[10px] block">of {route.capacityMbpd}M bpd limit</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">GEOPOLITICAL RISK</span>
                    <span className={`font-bold text-sm ${route.riskIndex > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {route.riskIndex}/100 Risk
                    </span>
                    <span className="text-slate-400 text-[10px] block">{route.co2Tonnes} T CO2/Mbbl</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Pipeline & Terminal Throughput Utilization</span>
                    <span className="text-cyan-400 font-bold">{route.capacityUtilization}% Saturation</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        route.capacityUtilization > 90 ? 'bg-amber-400' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                      }`} 
                      style={{ width: `${Math.min(100, route.capacityUtilization)}%` }} 
                    />
                  </div>
                </div>

                {/* Route Highlights Bullets */}
                <div className="space-y-1 text-xs text-slate-300">
                  {route.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Dynamic Recharts Visualizations */}
      {activeView === 'charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bar Chart: Transit Days & Freight Cost Premium */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>Freight Premium ($/bbl) vs Transit Days</span>
            </h4>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="freightPremium" name="Freight Premium ($/bbl)" fill="#06b6d4" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : index === 1 ? '#10b981' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart: Multi-Criteria Comparison */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Multi-Criteria Tradeoff Radar</span>
            </h4>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={80} data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                  <Radar name="Alt 1 (Petroline)" dataKey="Alt1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                  <Radar name="Alt 2 (Fujairah)" dataKey="Alt2" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                  <Radar name="Alt 3 (INSTC Rail)" dataKey="Alt3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: Dynamic Metrics Table */}
      {activeView === 'table' && (
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Route Corridor</th>
                  <th className="px-4 py-3">Transit Days</th>
                  <th className="px-4 py-3">Freight Premium</th>
                  <th className="px-4 py-3">Total $/bbl</th>
                  <th className="px-4 py-3">Throughput Saturation</th>
                  <th className="px-4 py-3">Risk Index</th>
                  <th className="px-4 py-3">CO2 Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {metrics.routes.map((r, i) => (
                  <tr key={r.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white font-sans flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{r.name}</span>
                    </td>
                    <td className="px-4 py-3">{r.transitDays} Days ({r.transitDelta})</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">+${r.freightPremium}/bbl</td>
                    <td className="px-4 py-3 font-bold">${r.totalCostBbl}</td>
                    <td className="px-4 py-3">{r.capacityUtilization}% ({r.capacityMbpd}M bpd)</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${r.riskIndex < 30 ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                        {r.riskIndex}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{r.co2Tonnes} T/Mbbl</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strategic Hedging Recommendation Card */}
      <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-950/10">
        <div className="flex items-start space-x-3">
          <Zap className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
              AI Hedging & Commodity Futures Action
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              <strong>Recommendation:</strong> Executive locks in <strong>Long Brent Q4 Futures @ $84.50/bbl</strong> (ICE) while executing spot charter hedges on Yanbu offloading VLCCs to neutralize spot shipping spikes.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
