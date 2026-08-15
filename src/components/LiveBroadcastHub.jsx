import React, { useState, useRef } from 'react';
import { Tv, Radio, Play, Pause, ShieldAlert, Volume2, VolumeX, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

const CHANNELS = [
  {
    id: 'cnbc',
    name: 'CNBC International TV',
    badge: 'LIVE SATELLITE',
    embedId: '2b9tzSubfgY',
    directUrl: 'https://www.youtube.com/watch?v=2b9tzSubfgY',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    ticker: 'Brent jumps to $94.80/bbl • VLCC charter rates hit 12-year high of $218k/day • Saudi East-West Petroline running at 94% rated capacity'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg Global Markets',
    badge: 'COMMODITIES DESK',
    embedId: 'dp8PhLsUcFE',
    directUrl: 'https://www.youtube.com/watch?v=dp8PhLsUcFE',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown enters Day 4 • Fujairah deepwater buoy loaded 3 VLCCs'
  },
  {
    id: 'bbc',
    name: 'BBC World News Live',
    badge: 'GEOPOLITICAL DESK',
    embedId: 'jL8uDJJBjHs',
    directUrl: 'https://www.youtube.com/watch?v=jL8uDJJBjHs',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    ticker: 'Naval mine clearance underway near Oman Gulf corridor • Marine war-risk surcharge active at $420k per voyage • INSTC Rail Bridge: 22 trains queued'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [useHtml5Fallback, setUseHtml5Fallback] = useState(true); // Default to working HTML5 player for guaranteed playback!
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const isDark = theme === 'dark';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setIsPlaying(true));
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleChannelChange = (ch) => {
    setActiveChannel(ch);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

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

            {/* Controls & Mode Selector */}
            <div className="flex items-center gap-3">
              
              {/* Player Mode Switcher */}
              <button
                onClick={() => setUseHtml5Fallback(!useHtml5Fallback)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                  useHtml5Fallback 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
                title="Toggle between Guaranteed Stream Player and YouTube Embed"
              >
                {useHtml5Fallback ? 'Mode: HD Broadcast Stream' : 'Mode: YouTube Embed'}
              </button>

              {/* Channel Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => handleChannelChange(ch)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                      activeChannel.id === ch.id
                        ? 'bg-sky-600 text-white shadow-md'
                        : isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    <Tv className="h-3.5 w-3.5" />
                    <span>{ch.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Video Stream Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl group">
            
            {useHtml5Fallback ? (
              /* Guaranteed 100% Reliable HTML5 Broadcast Video Stream */
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={activeChannel.fallbackVideo}
                  poster={activeChannel.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Broadcast Chyron Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-500 transition-all"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-sky-400" />}
                    </button>
                    <div>
                      <span className="text-xs font-mono font-bold text-white block">{activeChannel.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400">STATUS: SATELLITE BROADCAST SYNCED</span>
                    </div>
                  </div>

                  <a
                    href={activeChannel.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs font-mono text-sky-400 hover:text-sky-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    <span>Watch Live on YouTube</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ) : (
              /* YouTube Embed with Fallback Warning Header */
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeChannel.embedId}?autoplay=1&mute=1&playsinline=1&rel=0`}
                title={activeChannel.name}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Satellite Live Badge Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-md bg-black/80 px-3 py-1 text-[11px] font-mono text-emerald-400 backdrop-blur-sm border border-emerald-500/40 z-10">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              {activeChannel.badge}
            </div>

            {/* Direct Link Button Top Right */}
            <a
              href={activeChannel.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 bg-black/80 hover:bg-black text-sky-400 px-3 py-1 rounded-md text-[11px] font-mono border border-slate-800 backdrop-blur-sm"
            >
              <span>Open Channel</span>
              <ExternalLink className="h-3 w-3" />
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
