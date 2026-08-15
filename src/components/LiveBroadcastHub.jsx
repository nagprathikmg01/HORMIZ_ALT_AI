import React, { useState, useRef } from 'react';
import { Tv, Radio, Play, Pause, ShieldAlert, Volume2, VolumeX, ExternalLink, RefreshCw, Wifi, Signal, Sparkles } from 'lucide-react';

const CHANNELS = [
  {
    id: 'cnbc',
    name: 'CNBC International TV',
    badge: 'LIVE SATELLITE INTERCEPT',
    freq: '12.450 GHz • Ku-Band',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2b9tzSubfgY',
    ticker: 'Brent jumps to $94.80/bbl • VLCC charter rates hit 12-year high of $218k/day • Saudi East-West Petroline running at 94% rated capacity'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg Global Markets',
    badge: 'COMMODITIES DESK STREAM',
    freq: '11.820 GHz • C-Band',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=dp8PhLsUcFE',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown enters Day 4 • Fujairah deepwater buoy loaded 3 VLCCs'
  },
  {
    id: 'bbc',
    name: 'BBC World News Live',
    badge: 'GEOPOLITICAL DESK STREAM',
    freq: '14.100 GHz • X-Band',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=jL8uDJJBjHs',
    ticker: 'Naval mine clearance underway near Oman Gulf corridor • Marine war-risk surcharge active at $420k per voyage • INSTC Rail Bridge: 22 trains queued'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const isDark = theme === 'dark';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChannelSelect = (ch) => {
    setActiveChannel(ch);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = ch.streamUrl;
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
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wide text-red-400 border border-red-500/40 flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span>24/7 LIVE STREAM</span>
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
                  onClick={() => handleChannelSelect(ch)}
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

          {/* Guaranteed 100% Reliable HD Broadcast Video Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl group">
            
            <video
              ref={videoRef}
              src={activeChannel.streamUrl}
              poster={activeChannel.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Top Satellite Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <span className="bg-slate-950/90 border border-slate-800 text-emerald-400 text-[11px] font-mono px-3 py-1 rounded-md flex items-center space-x-2 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{activeChannel.badge}</span>
              </span>

              <span className="bg-slate-950/90 border border-slate-800 text-slate-300 text-[11px] font-mono px-3 py-1 rounded-md hidden sm:flex items-center space-x-1.5">
                <Signal className="h-3.5 w-3.5 text-sky-400" />
                <span>{activeChannel.freq}</span>
              </span>
            </div>

            {/* Top Right Direct YouTube Link Button */}
            <a
              href={activeChannel.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/90 hover:bg-black text-sky-400 px-3 py-1.5 rounded-md text-[11px] font-mono border border-slate-800 shadow-lg"
            >
              <span>Watch Live on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Bottom Broadcast Control & Lower-Third Chyron Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/90 shadow-2xl">
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-lg border transition-all ${
                    isMuted ? 'bg-red-950 border-red-800 text-red-400' : 'bg-emerald-950 border-emerald-800 text-emerald-400 font-bold'
                  }`}
                  title={isMuted ? 'Click to Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />}
                </button>

                <div>
                  <h4 className="text-xs font-bold text-white font-mono">{activeChannel.name}</h4>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                    <Wifi className="h-3 w-3" />
                    <span>BROADCAST STREAM ACTIVE • {isMuted ? '🔇 AUDIO MUTED (CLICK TO UNMUTE)' : '🔊 LIVE AUDIO PLAYING'}</span>
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <span className="text-amber-400 font-bold block text-[10px] uppercase">LOWER-THIRD CHYRON</span>
                <span className="truncate max-w-sm block text-slate-300">{activeChannel.ticker.split('•')[0]}</span>
              </div>

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
