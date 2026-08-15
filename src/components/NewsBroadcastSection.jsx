import React, { useState, useRef, useEffect } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Clock, 
  ShieldAlert, 
  Globe, 
  ChevronRight,
  Maximize,
  ExternalLink
} from 'lucide-react';
import { NEWS_BROADCAST_CHANNELS, LIVE_GEOPOLITICAL_INCIDENTS } from '../services/geopoliticalApi';

export default function NewsBroadcastSection({ theme = 'dark' }) {
  const [selectedChannel, setSelectedChannel] = useState(NEWS_BROADCAST_CHANNELS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
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

  const handleChannelSelect = (ch) => {
    setSelectedChannel(ch);
    setCurrentTime(0);
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
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
              isDark ? 'bg-red-950/80 border border-red-500/40 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              <span>Live Global News & Geopolitical Telemetry</span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
              BBC & Top Channels News Broadcast Hub
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Broadcasting global news coverage, maritime security incidents, and market impact reports from top global broadcasters.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
            }`}>
              Live Telemetry Feed: Active
            </span>
          </div>
        </div>

        {/* Breaking News Ticker Bar */}
        <div className={`mb-8 p-3 rounded-xl border font-mono text-xs flex items-center space-x-3 overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}>
          <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase flex-shrink-0">
            BREAKING NEWS
          </span>

          <div className="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar">
            <span className="text-red-400 font-bold mr-2">[BBC VERIFIED]:</span>
            <span>Naval Mine Clearance taskforce active in Strait narrows • Joint War Committee expands $420k war-risk insurance zones • Saudi Petroline Yanbu offloading operating at 97% capacity</span>
          </div>
        </div>

        {/* Main Video Broadcast Player & Incidents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Video Player Card (7 Columns) */}
          <div className={`lg:col-span-7 rounded-2xl border overflow-hidden ${
            isDark ? 'stitch-card-dark' : 'stitch-card-light'
          }`}>
            
            {/* Channel Selection Buttons */}
            <div className={`p-3 border-b flex space-x-2 overflow-x-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {NEWS_BROADCAST_CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleChannelSelect(ch)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 flex-shrink-0 ${
                    selectedChannel.id === ch.id
                      ? 'bg-sky-600 text-white font-bold shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>{ch.channel.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={selectedChannel.videoSrc}
                poster={selectedChannel.poster}
                className="w-full h-full object-cover"
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
              />

              {/* Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute z-20 h-16 w-16 rounded-full bg-sky-600 text-white flex items-center justify-center pl-1 shadow-xl hover:scale-105 transition-all"
                >
                  <Play className="h-7 w-7 fill-white" />
                </button>
              )}

              {/* Overlay Channel Logo Badge */}
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-slate-800 text-white px-3 py-1 rounded-md text-xs font-mono flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>{selectedChannel.channel}</span>
              </div>
            </div>

            {/* Video Caption & Info */}
            <div className="p-5">
              <h3 className={`text-base font-bold font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selectedChannel.program}
              </h3>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {selectedChannel.summary}
              </p>
            </div>

          </div>

          {/* Incident Telemetry Stream (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className={`rounded-2xl p-5 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <h3 className={`text-sm font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Verified War Incident Feed
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Live Ingestion</span>
              </div>

              <div className="space-y-3">
                {LIVE_GEOPOLITICAL_INCIDENTS.map((inc) => (
                  <div
                    key={inc.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDark 
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                        : 'bg-slate-50 border-slate-200 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-red-500 font-bold">{inc.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.threatLevel === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-500/40' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {inc.threatLevel}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {inc.headline}
                    </h4>
                    
                    <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {inc.desc}
                    </p>

                    <div className="mt-2 text-[10px] font-mono text-sky-500 flex items-center justify-between pt-1 border-t border-slate-800/40">
                      <span>Source: {inc.source}</span>
                      <span>Impact: {inc.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
