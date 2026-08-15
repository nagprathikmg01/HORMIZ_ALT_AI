import React, { useState } from 'react';
import { Tv, Radio, Play, ShieldAlert, Volume2, Globe, Sparkles } from 'lucide-react';

const CHANNELS = [
  {
    id: 'cnbc',
    name: 'CNBC International TV',
    badge: 'LIVE SATELLITE',
    embedId: '2b9tzSubfgY',
    fallbackUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4xKdmAXFh4ACyhpiQ_3qBw',
    ticker: 'Brent jumps to $94.80/bbl • VLCC charter rates hit 12-year high of $218k/day • Saudi East-West Petroline running at 94% rated capacity'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg Global Markets',
    badge: 'COMMODITIES DESK',
    embedId: 'dp8PhLsUcFE',
    fallbackUrl: 'https://www.youtube.com/embed/sA9k_v_v4n8',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown enters Day 4 • Fujairah deepwater buoy berth 3 loaded 3 VLCCs in 24 hours'
  },
  {
    id: 'bbc',
    name: 'BBC World News Live',
    badge: 'GEOPOLITICAL DESK',
    embedId: 'jL8uDJJBjHs',
    fallbackUrl: 'https://www.youtube.com/embed/V9x629Jb5s4',
    ticker: 'Naval mine clearance underway near Oman Gulf corridor • Marine war-risk surcharge active at $420k per voyage • INSTC Rail Bridge: 22 trains transit queued at Bandar Abbas'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const isDark = theme === 'dark';

  return (
    <section id="news" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`rounded-2xl border p-6 shadow-2xl backdrop-blur-md transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 animate-pulse">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-lg font-sans ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Crisis Broadcast Telemetry Hub
                  </h3>
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wide text-red-400 border border-red-500/40">
                    LIVE SATELLITE INTERCEPT
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  24/7 Global Financial & Geopolitical Disruption Streams (CNBC, Bloomberg, BBC)
                </p>
              </div>
            </div>

            {/* Channel Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                    activeChannel.id === ch.id
                      ? 'bg-sky-600 text-white shadow-md'
                      : isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Video Stream Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-inner">
            <iframe
              src={`https://www.youtube.com/embed/${activeChannel.embedId}?autoplay=1&mute=1&playsinline=1&rel=0`}
              title={activeChannel.name}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-md bg-black/80 px-3 py-1 text-[11px] font-mono text-emerald-400 backdrop-blur-sm border border-emerald-500/40 z-10">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              {activeChannel.badge}
            </div>
          </div>

          {/* Live Breaking News Intelligence Marquee Ticker */}
          <div className={`mt-4 flex items-center gap-3 rounded-xl px-4 py-2.5 border font-mono text-xs ${
            isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}>
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-500 flex-shrink-0">
              <ShieldAlert className="h-4 w-4" /> Intelligence Ticker:
            </span>
            <marquee className="text-xs font-mono tracking-tight flex-1">
              {activeChannel.ticker}
            </marquee>
          </div>

        </div>

      </div>
    </section>
  );
}
