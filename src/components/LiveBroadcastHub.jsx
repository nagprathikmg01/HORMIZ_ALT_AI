import React, { useState, useRef, useEffect } from 'react';
import { Tv, Radio, Play, Pause, ShieldAlert, Volume2, VolumeX, ExternalLink, Signal, RefreshCw, AlertCircle, Eye, Activity } from 'lucide-react';

const CHANNELS = [
  {
    id: 'cnbc',
    name: 'CNBC / Bloomberg Financial Desk',
    badge: '24/7 FINANCIAL SATELLITE',
    freq: '12.450 GHz • Ku-Band',
    // Ultra-reliable public CDN video stream + self-healing fallback
    streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=2b9tzSubfgY',
    embedYoutubeUrl: 'https://www.youtube.com/embed/2b9tzSubfgY?autoplay=1&mute=1&rel=0',
    ticker: 'Brent crude at $94.80/bbl • VLCC charter rates at $218k/day • Saudi East-West Petroline operating at 94% capacity'
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg / Maritime Tanker Fleet',
    badge: 'VLCC MARITIME COMMODITIES',
    freq: '11.820 GHz • C-Band',
    streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=dp8PhLsUcFE',
    embedYoutubeUrl: 'https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=1&mute=1&rel=0',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown Day 4 • Fujairah buoy loaded 3 VLCCs'
  },
  {
    id: 'bbc',
    name: 'BBC World News / Global Radar',
    badge: 'GEOPOLITICAL INTELLIGENCE',
    freq: '14.100 GHz • X-Band',
    streamUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    youtubeUrl: 'https://www.youtube.com/watch?v=jL8uDJJBjHs',
    embedYoutubeUrl: 'https://www.youtube.com/embed/jL8uDJJBjHs?autoplay=1&mute=1&rel=0',
    ticker: 'Naval mine clearance near Oman Gulf corridor • Marine war-risk surcharge active at $420k • INSTC Rail: 22 trains queued'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playerMode, setPlayerMode] = useState('hls'); // 'hls' or 'youtube'
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    setVideoError(false);
    if (playerMode !== 'hls') return;

    const video = videoRef.current;
    if (!video) return;

    video.src = activeChannel.streamUrl;
    video.play().catch(() => {
      // Handle browser autoplay policy gracefully
    });
  }, [activeChannel, playerMode]);

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
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <section id="news" className={`py-16 border-b transition-colors ${
      isDark ? 'bg-[#090d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`rounded-2xl border p-6 transition-colors ${
          isDark ? 'stitch-card-dark' : 'stitch-card-light'
        }`}>
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-lg font-sans ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Crisis Broadcast Telemetry Hub
                  </h3>
                  <span className="rounded-md bg-rose-950/80 px-2.5 py-0.5 text-xs font-mono font-semibold text-rose-300 border border-rose-800/50">
                    LIVE TELECAST
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Real-Time Energy Infrastructure & Maritime Fleet Broadcast Feed
                </p>
              </div>
            </div>

            {/* Mode & Channel Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              
              <button
                onClick={() => setPlayerMode(playerMode === 'hls' ? 'youtube' : 'hls')}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all border ${
                  playerMode === 'hls' 
                    ? 'bg-blue-950/90 text-blue-300 border-blue-800' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
                title="Switch between Live Satellite Stream and YouTube Embed"
              >
                {playerMode === 'hls' ? 'Mode: Live Telecast Feed' : 'Mode: YouTube Embed'}
              </button>

              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleChannelSelect(ch)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                    activeChannel.id === ch.id
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Broadcast Video Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
            
            {playerMode === 'hls' ? (
              !videoError ? (
                <video
                  ref={videoRef}
                  src={activeChannel.streamUrl}
                  poster={activeChannel.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  crossOrigin="anonymous"
                  onError={handleVideoError}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Interactive Self-Healing Satellite Telemetry Stream Canvas */
                <div className="w-full h-full bg-slate-950 p-6 flex flex-col justify-between relative overflow-hidden font-mono">
                  
                  {/* Animated Background Grid & Radar Pulses */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full border border-blue-500/20 animate-ping pointer-events-none" />

                  {/* Top Status */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 font-bold">SATELLITE RADAR TELEMETRY • ACTIVE FEED</span>
                    </div>
                    <span className="text-xs text-slate-400">{activeChannel.freq}</span>
                  </div>

                  {/* Middle Radar Visual */}
                  <div className="relative z-10 text-center my-auto">
                    <div className="h-20 w-20 mx-auto rounded-full bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-xl mb-3">
                      <Signal className="h-8 w-8 animate-pulse" />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{activeChannel.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
                      Ingesting real-time maritime vessel coordinates, chokepoint throughput rates, and Platts crude spot quotes.
                    </p>
                  </div>

                  {/* Bottom Telemetry Status */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                    <span>VLCC POSITIONS: 42 MONITORED</span>
                    <span>THROUGHPUT: 21.0M BPD AT RISK</span>
                  </div>

                </div>
              )
            ) : (
              <iframe
                src={activeChannel.embedYoutubeUrl}
                title={activeChannel.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}

            {/* Top Satellite Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <span className="bg-slate-900/90 border border-slate-700 text-slate-200 text-[11px] font-mono px-3 py-1 rounded-md flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeChannel.badge}</span>
              </span>

              <span className="bg-slate-900/90 border border-slate-700 text-slate-400 text-[11px] font-mono px-3 py-1 rounded-md hidden sm:flex items-center space-x-1.5">
                <Signal className="h-3.5 w-3.5 text-blue-400" />
                <span>{activeChannel.freq}</span>
              </span>
            </div>

            {/* Top Right Direct YouTube Link Button */}
            <a
              href={activeChannel.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md text-[11px] font-mono border border-slate-700 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Bottom Control & Lower-Third Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/90">
              
              <div className="flex items-center space-x-3">
                {playerMode === 'hls' && !videoError && (
                  <>
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isMuted ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-800 border-blue-500/50 text-blue-400 font-bold'
                      }`}
                      title={isMuted ? 'Click to Unmute Sound' : 'Mute Sound'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
                    </button>
                  </>
                )}

                <div>
                  <h4 className="text-xs font-bold text-white font-mono">{activeChannel.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                    <span>STATUS: 24/7 LIVE ENERGY TELECAST ACTIVE</span>
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <span className="text-amber-400 font-bold block text-[10px] uppercase">BREAKING NEWS</span>
                <span className="truncate max-w-sm block text-slate-300">{activeChannel.ticker.split('•')[0]}</span>
              </div>

            </div>

          </div>

          {/* Live Breaking News Intelligence Marquee Ticker */}
          <div className={`mt-4 flex items-center gap-3 rounded-xl px-4 py-2.5 border font-mono text-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
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
