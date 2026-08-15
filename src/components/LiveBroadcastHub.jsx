import React, { useState } from 'react';
import { Tv, Radio, ShieldAlert, Volume2, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

const DIRECT_YOUTUBE_CHANNELS = [
  {
    id: 'cnbc',
    name: 'CNBC International Live',
    badge: 'LIVE SATELLITE BROADCAST',
    // Direct YouTube Live Stream Embed
    embedUrl: 'https://www.youtube.com/embed/2b9tzSubfgY?autoplay=1&mute=0&rel=0&enablejsapi=1',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=2b9tzSubfgY',
    ticker: 'Brent jumps to $94.80/bbl • VLCC charter rates hit 12-year high of $218k/day • Saudi East-West Petroline running at 94% rated capacity'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg Global Markets Live',
    badge: 'COMMODITIES DESK STREAM',
    embedUrl: 'https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=1&mute=0&rel=0&enablejsapi=1',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=dp8PhLsUcFE',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown enters Day 4 • Fujairah deepwater buoy loaded 3 VLCCs'
  },
  {
    id: 'bbc',
    name: 'BBC World News Live',
    badge: 'GEOPOLITICAL DESK STREAM',
    embedUrl: 'https://www.youtube.com/embed/jL8uDJJBjHs?autoplay=1&mute=0&rel=0&enablejsapi=1',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=jL8uDJJBjHs',
    ticker: 'Naval mine clearance underway near Oman Gulf corridor • Marine war-risk surcharge active at $420k per voyage • INSTC Rail Bridge: 22 trains queued'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(DIRECT_YOUTUBE_CHANNELS[0]);
  const [iframeError, setIframeError] = useState(false);

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
                    Crisis Broadcast Telemetry Hub (Direct YouTube Live)
                  </h3>
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wide text-red-400 border border-red-500/40 flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span>DIRECT YOUTUBE LIVE</span>
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Direct YouTube Live TV Broadcasting Stream (CNBC, Bloomberg, BBC World News)
                </p>
              </div>
            </div>

            {/* Channel Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {DIRECT_YOUTUBE_CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannel(ch);
                    setIframeError(false);
                  }}
                  className={`rounded-xl px-3.5 py-2 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                    activeChannel.id === ch.id
                      ? 'bg-sky-600 text-white shadow-md'
                      : isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct YouTube Live Video Stream Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl">
            
            <iframe
              key={activeChannel.id}
              src={activeChannel.embedUrl}
              title={activeChannel.name}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Live Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 pointer-events-none">
              <span className="bg-slate-950/90 border border-slate-800 text-emerald-400 text-[11px] font-mono px-3 py-1 rounded-md flex items-center space-x-2 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{activeChannel.badge}</span>
              </span>
            </div>

            {/* Top Right Direct YouTube Watch Button */}
            <a
              href={activeChannel.youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/90 hover:bg-black text-sky-400 px-3 py-1.5 rounded-md text-[11px] font-mono border border-slate-800 shadow-lg"
            >
              <span>Watch Live on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

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
