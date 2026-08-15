import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  BarChart2, 
  Building2, 
  Globe, 
  Clock, 
  ChevronRight,
  PieChart
} from 'lucide-react';
import { SOVEREIGN_SPR_RESERVES } from '../services/geopoliticalApi';

export default function FinancialCrisisSection({ theme = 'dark' }) {
  const [oilPriceShock, setOilPriceShock] = useState(115); // $115/bbl panic spike
  const [disruptionMonths, setDisruptionMonths] = useState(3); // 3 months

  const isDark = theme === 'dark';

  // Calculate macroeconomic impact
  const priceDeltaPerBbl = Math.max(0, oilPriceShock - 78); // $78 baseline
  const dailyGlobalImportCostDeltaM = Math.round((21.0 * priceDeltaPerBbl)); // 21M bpd flow shock
  const totalFinancialLossB = +((dailyGlobalImportCostDeltaM * disruptionMonths * 30) / 1000).toFixed(2);
  const inflationImpactPct = +(priceDeltaPerBbl * 0.08).toFixed(1);

  return (
    <section id="financial-crisis" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
            isDark ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300' : 'bg-amber-50 border border-amber-200 text-amber-700'
          }`}>
            <DollarSign className="h-3.5 w-3.5 text-amber-500" />
            <span>Macroeconomic & Financial Crisis Analytics</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Financial Crisis & Sovereign Reserve (SPR) Engine
          </h2>
          <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Modeling global crude price shocks, national strategic petroleum reserve (SPR) emergency depletion countdowns, and inflation spikes.
          </p>
        </div>

        {/* Top Interactive Shock Controls */}
        <div className={`rounded-2xl p-6 border mb-8 ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Slider 1: Crude Oil Price Shock */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className={`uppercase font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Simulated Crude Price Panic Shock
                </span>
                <span className="text-amber-500 font-extrabold text-base">${oilPriceShock}/bbl</span>
              </div>
              
              <input
                type="range"
                min="80"
                max="150"
                step="1"
                value={oilPriceShock}
                onChange={(e) => setOilPriceShock(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>$80/bbl (Baseline)</span>
                <span>$150/bbl (Severe Hyper-Shock)</span>
              </div>
            </div>

            {/* Slider 2: Disruption Horizon */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className={`uppercase font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Lockout Horizon Duration
                </span>
                <span className="text-sky-500 font-extrabold text-base">{disruptionMonths} Months ({disruptionMonths * 30} Days)</span>
              </div>

              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={disruptionMonths}
                onChange={(e) => setDisruptionMonths(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>1 Month (30 Days)</span>
                <span>12 Months (1 Year)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Calculated Financial Shock Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className={`rounded-2xl p-5 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
            <span className="text-xs font-mono text-slate-400 uppercase">Global Energy Bill Shock</span>
            <div className="text-3xl font-extrabold text-red-500 font-mono mt-1">${totalFinancialLossB}B</div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Cumulative import cost surge over {disruptionMonths * 30} days at ${oilPriceShock}/bbl.
            </p>
          </div>

          <div className={`rounded-2xl p-5 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
            <span className="text-xs font-mono text-slate-400 uppercase">Macro Inflation Spike</span>
            <div className="text-3xl font-extrabold text-amber-500 font-mono mt-1">+{inflationImpactPct}%</div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Estimated CPI inflation surge triggered by crude & freight transport shock.
            </p>
          </div>

          <div className={`rounded-2xl p-5 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
            <span className="text-xs font-mono text-slate-400 uppercase">Daily Import Drain</span>
            <div className="text-3xl font-extrabold text-sky-500 font-mono mt-1">${dailyGlobalImportCostDeltaM}M</div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Additional trade deficit drain per day across importing refiners.
            </p>
          </div>

        </div>

        {/* Sovereign Strategic Petroleum Reserve (SPR) Depletion Table */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
          <div className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-sky-500" />
              <h3 className={`text-xs font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Sovereign Strategic Petroleum Reserve (SPR) Depletion Countdown
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">IEA 90-Day Standard</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className={`uppercase border-b ${
                isDark ? 'bg-slate-900/80 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                <tr>
                  <th className="px-4 py-3">Sovereign / Bloc</th>
                  <th className="px-4 py-3">Current SPR Inventory</th>
                  <th className="px-4 py-3">Reserve Days Remaining</th>
                  <th className="px-4 py-3">Max Emergency Drawdown</th>
                  <th className="px-4 py-3">Depletion Risk Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-200' : 'divide-slate-200 text-slate-800'}`}>
                {SOVEREIGN_SPR_RESERVES.map((res) => {
                  const isDepletedBeforeHorizon = res.daysRemaining < (disruptionMonths * 30);
                  return (
                    <tr key={res.code} className={isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-100/60'}>
                      <td className="px-4 py-3 font-semibold font-sans flex items-center space-x-2">
                        <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                          {res.code}
                        </span>
                        <span>{res.country}</span>
                      </td>
                      <td className="px-4 py-3 font-bold">{res.sprMbbl} Million bbl</td>
                      <td className="px-4 py-3">{res.daysRemaining} Days Reserve</td>
                      <td className="px-4 py-3">{res.maxDrawdownKbpd.toLocaleString()}k bpd</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isDepletedBeforeHorizon
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {isDepletedBeforeHorizon ? 'CRITICAL DEPLETION RISK' : 'SUSTAINED COVERAGE'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
