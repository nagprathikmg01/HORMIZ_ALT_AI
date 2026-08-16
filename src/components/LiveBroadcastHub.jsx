import React, { useState, useRef, useEffect } from 'react';
import { Tv, Radio, Play, Pause, ShieldAlert, Volume2, VolumeX, ExternalLink, Signal, RefreshCw, AlertCircle } from 'lucide-react';
import Hls from 'hls.js';

const LIVE_NEWS_CHANNELS = [
  {
    id: 'cnbc_bloomberg',
    name: 'Bloomberg / CNBC Live Financial Broadcast',
    badge: '24/7 LIVE FINANCIAL DESK',
    freq: '12.450 GHz • Ku-Band',
    // Genuine 24/7 Live News HLS Stream
    hlsUrl: 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8',
    youtubeUrl: 'https://www.youtube.com/watch?v=2b9tzSubfgY',
    embedYoutubeUrl: 'https://www.youtube.com/embed/2b9tzSubfgY?autoplay=1&mute=0&rel=0',
    ticker: 'Brent crude at $94.80/bbl • VLCC charter rates at $218k/day • Saudi East-West Petroline operating at 94% capacity'
  },
  {
    id: 'skynews_france24',
    name: 'France 24 / Sky News Live 24/7',
    badge: '24/7 INTERNATIONAL NEWS DESK',
    freq: '11.820 GHz • C-Band',
    // Genuine 24/7 Live International News Stream
    hlsUrl: 'https://static.france24.com/live/F24_EN_LO_HLS/live_tv.m3u8',
    youtubeUrl: 'https://www.youtube.com/watch?v=dp8PhLsUcFE',
    embedYoutubeUrl: 'https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=1&mute=0&rel=0',
    ticker: 'IEA releases 60M barrels emergency SPR reserve • Hormuz chokepoint shutdown Day 4 • Fujairah buoy loaded 3 VLCCs'
  },
  {
    id: 'bbc_dw',
    name: 'BBC World News / DW Live Podcast Stream',
    badge: 'GEOPOLITICAL PODCAST TELECAST',
    freq: '14.100 GHz • X-Band',
    hlsUrl: 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8',
    youtubeUrl: 'https://www.youtube.com/watch?v=jL8uDJJBjHs',
    embedYoutubeUrl: 'https://www.youtube.com/embed/jL8uDJJBjHs?autoplay=1&mute=0&rel=0',
    ticker: 'Naval mine clearance near Oman Gulf corridor • Marine war-risk surcharge active at $420k • INSTC Rail: 22 trains queued'
  }
];

export default function LiveBroadcastHub({ theme = 'dark' }) {
  const [activeChannel, setActiveChannel] = useState(LIVE_NEWS_CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Sound enabled for live news audio!
  const [playerMode, setPlayerMode] = useState('youtube'); // Default to Direct YouTube Live Stream Broadcast!
  const [hlsError, setHlsError] = useState(false);
  const videoRef = useRef(null);

  const isDark = theme === 'dark';

  // Attach genuine HLS 24/7 Live Stream when in HLS mode
  useEffect(() => {
    if (playerMode !== 'hls') return;

    let hls;
    const video = videoRef.current;
    if (!video) return;

    setHlsError(false);

    if (Hls.isSupported() && activeChannel.hlsUrl) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(activeChannel.hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, () => {
        setHlsError(true);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = activeChannel.hlsUrl;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) hls.destroy();
    };
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

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleChannelSelect = (ch) => {
    setActiveChannel(ch);
    setIsPlaying(true);
    setHlsError(false);
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
                    Crisis Broadcast Telemetry Hub (24/7 Live News Channel)
                  </h3>
                  <span className="rounded-md bg-rose-950/80 px-2.5 py-0.5 text-xs font-mono font-semibold text-rose-300 border border-rose-800/50 flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                    <span>24/7 LIVE PODCAST & NEWS TELECAST</span>
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Direct 24/7 Live News Channel Broadcast (CNBC, Bloomberg, France 24, BBC)
                </p>
              </div>
            </div>

            {/* Mode & Channel Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              
              <button
                onClick={() => setPlayerMode(playerMode === 'youtube' ? 'hls' : 'youtube')}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all border ${
                  playerMode === 'youtube' 
                    ? 'bg-blue-950/90 text-blue-300 border-blue-800 font-bold' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
                title="Toggle between Direct YouTube Live Stream and HLS Live Satellite Feed"
              >
                {playerMode === 'youtube' ? 'Mode: Direct YouTube Live' : 'Mode: 24/7 HLS Satellite Stream'}
              </button>

              {LIVE_NEWS_CHANNELS.map((ch) => (
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
                  <span>{ch.name.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Broadcast Video Player */}
          <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
            
            {playerMode === 'youtube' ? (
              <iframe
                src={activeChannel.embedYoutubeUrl}
                title={activeChannel.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            )}

            {/* Top Satellite Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 pointer-events-none">
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
              <span>Watch Live on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Bottom Control & Lower-Third Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/90">
              
              <div className="flex items-center space-x-3">
                {playerMode === 'hls' && (
                  <>
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isMuted ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-800 border-blue-500/50 text-blue-400 font-bold'
                      }`}
                      title={isMuted ? 'Click to Unmute Sound' : 'Mute Sound'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-blue-400 animate-pulse" />}
                    </button>
                  </>
                )}

                <div>
                  <h4 className="text-xs font-bold text-white font-mono">{activeChannel.name}</h4>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                    <span>STATUS: 24/7 LIVE INTERNATIONAL NEWS STREAM</span>
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
