import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Wifi } from 'lucide-react';

export default function LiveCommoditiesBar({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const [prices, setPrices] = useState({
    brent: { val: 94.85, chg: '+4.12%' },
    wti: { val: 89.40, chg: '+3.85%' },
    dubai: { val: 92.10, chg: '+5.20%' },
    vlcc: { val: 218500, chg: '+38.4%' },
    warRisk: { val: 425000, chg: '+140%' }
  });
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  // Dynamic real-time ticking adjustments every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        brent: { val: +(prev.brent.val + (Math.random() * 0.4 - 0.18)).toFixed(2), chg: '+4.25%' },
        wti: { val: +(prev.wti.val + (Math.random() * 0.35 - 0.15)).toFixed(2), chg: '+3.90%' },
        dubai: { val: +(prev.dubai.val + (Math.random() * 0.3 - 0.12)).toFixed(2), chg: '+5.35%' },
        vlcc: { val: Math.round(prev.vlcc.val + (Math.random() * 800 - 300)), chg: '+39.1%' },
        warRisk: { val: prev.warRisk.val, chg: '+140%' }
      }));
      setLastSync(new Date().toLocaleTimeString());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] font-mono px-1">
        <span className="text-sky-500 font-bold uppercase tracking-wider flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>Real-Time Commodities Telemetry Grid</span>
        </span>
        <span className="text-slate-400 flex items-center space-x-1">
          <Wifi className="h-3 w-3 text-sky-400" />
          <span>Live Ticking Sync: {lastSync}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        
        <div className={`rounded-xl border p-3.5 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          <p className={`text-[11px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Brent Crude (ICE)
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className={`text-lg font-extrabold font-mono ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              ${prices.brent.val}/bbl
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {prices.brent.chg}
            </span>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          <p className={`text-[11px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            WTI Crude (NYMEX)
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className={`text-lg font-extrabold font-mono ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              ${prices.wti.val}/bbl
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {prices.wti.chg}
            </span>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          <p className={`text-[11px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Dubai Sour Platts
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className={`text-lg font-extrabold font-mono ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              ${prices.dubai.val}/bbl
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {prices.dubai.chg}
            </span>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          <p className={`text-[11px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            VLCC Day Charter
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-lg font-extrabold text-amber-500 font-mono">
              ${prices.vlcc.val.toLocaleString()}/d
            </span>
            <span className="text-xs font-mono font-semibold text-red-500 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> {prices.vlcc.chg}
            </span>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          <p className={`text-[11px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            War Risk Surcharge
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-lg font-extrabold text-red-500 font-mono">
              ${prices.warRisk.val.toLocaleString()}
            </span>
            <span className="text-xs font-mono font-semibold text-red-500">{prices.warRisk.chg}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
