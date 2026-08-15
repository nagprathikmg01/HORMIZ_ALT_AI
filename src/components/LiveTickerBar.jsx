import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, AlertCircle, Wifi } from 'lucide-react';
import { fetchLiveMarketData } from '../services/liveMarketApi';

export default function LiveTickerBar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchLiveMarketData();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-slate-900/90 border-y border-slate-800 text-xs font-mono text-slate-300 py-2 px-4 overflow-x-auto whitespace-nowrap">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">LIVE ENERGY MARKET API:</span>
        </div>

        {/* Ticker items */}
        <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-0.5">
          {Object.entries(data.markets).map(([key, item]) => (
            <div key={key} className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-slate-400">{item.name}:</span>
              <span className="text-white font-bold">${item.price.toLocaleString()}</span>
              <span className="text-emerald-400 text-[10px] font-semibold">{item.pct}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-[10px] text-slate-400 flex items-center space-x-1">
            <Wifi className="h-3 w-3 text-cyan-400" />
            <span>Synced: {data.timestamp}</span>
          </span>

          <button
            onClick={loadData}
            disabled={loading}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Refresh Live API Feed"
          >
            <RefreshCw className={`h-3 w-3 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
}
