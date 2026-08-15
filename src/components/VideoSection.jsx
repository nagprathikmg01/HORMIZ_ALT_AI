import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  PictureInPicture, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle2, 
  Zap, 
  Layers, 
  ChevronRight,
  MonitorPlay,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function VideoSection({ onStartSimulation, theme = 'dark' }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showScript, setShowScript] = useState(false);

  const isDark = theme === 'dark';

  const chapters = [
    {
      time: 0,
      label: '0:00',
      title: 'Business Situation & 21M bpd Chokepoint Risk',
      desc: 'The crisis: Strait of Hormuz 21M bpd single point of failure, decision paralysis, and freight shocks.'
    },
    {
      time: 35,
      label: '0:35',
      title: 'Multimodal Graph Solver (Petroline & ADCOP Pipelines)',
      desc: 'Evaluating Saudi Petroline, UAE Habshan ADCOP, and INSTC Caspian multimodal rail corridors.'
    },
    {
      time: 70,
      label: '1:10',
      title: 'AIS Cyber-Defense & ERP Procurement Directives',
      desc: 'AIS Zero-Trust spoofing filters, LLM Risk Synthesizer, and automated SAP/Oracle ERP webhooks.'
    },
    {
      time: 105,
      label: '1:45',
      title: 'Business Model & Unsolvable Physical Bottlenecks',
      desc: 'Enterprise tier ($50k/mo), sovereign SPR defense, and 6.5M bpd physical pipeline ceilings.'
    }
  ];

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

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  useEffect(() => {
    if (currentTime >= 105) setActiveChapter(3);
    else if (currentTime >= 70) setActiveChapter(2);
    else if (currentTime >= 35) setActiveChapter(1);
    else setActiveChapter(0);
  }, [currentTime]);

  const seekToChapter = (timeSeconds, index) => {
    setCurrentTime(timeSeconds);
    setActiveChapter(index);
    if (videoRef.current) {
      videoRef.current.currentTime = timeSeconds;
    }
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="video" className={`py-16 border-b transition-colors relative ${
      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
              isDark ? 'bg-sky-950/80 border border-sky-500/40 text-sky-300' : 'bg-sky-50 border border-sky-200 text-sky-700'
            }`}>
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              <span>Watch 2-Min System Architecture Pitch (With Timestamps)</span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
              2-Minute System Architecture Pitch
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Walkthrough of our multimodal graph solver, AIS Zero-Trust spoofing defense, SAP/Oracle ERP dispatches, and enterprise SaaS roll-out strategy.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowScript(!showScript)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
            >
              <FileText className="h-4 w-4 text-sky-500" />
              <span>{showScript ? 'Hide Script' : 'View Verbatim Pitch Script'}</span>
            </button>
          </div>
        </div>

        {/* Main Video & Timestamps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Video Player Card (8 Columns) */}
          <div className={`lg:col-span-8 rounded-2xl border overflow-hidden shadow-xl ${
            isDark ? 'stitch-card-dark' : 'stitch-card-light'
          }`}>
            
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/hormuz-pitch.mp4"
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                <span className="bg-slate-950/90 border border-slate-800 text-sky-400 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                  <span>CHAPTER {activeChapter + 1}/4</span>
                </span>
                <span className="bg-slate-950/90 border border-slate-800 text-slate-300 text-[11px] font-mono px-2.5 py-1 rounded-md hidden sm:inline">
                  {chapters[activeChapter].title}
                </span>
              </div>

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute z-20 h-20 w-20 rounded-full bg-sky-600 text-white flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-all"
                >
                  <Play className="h-8 w-8 fill-white" />
                </button>
              )}

              <div className="absolute inset-x-8 top-1/3 bottom-20 pointer-events-none flex flex-col justify-center items-center text-center z-10">
                <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl max-w-md">
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-1">SYSTEM ARCHITECTURE PITCH</span>
                  <p className="text-sm text-white font-bold">{chapters[activeChapter].title}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{chapters[activeChapter].desc}</p>
                </div>
              </div>

            </div>

            {/* Video Controls Bar */}
            <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 text-xs font-mono">
              <div className="mb-3 relative cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max={duration || 120}
                  value={currentTime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCurrentTime(val);
                    if (videoRef.current) videoRef.current.currentTime = val;
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button onClick={togglePlay} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-sky-400" />}
                  </button>
                  <button onClick={toggleMute} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                    {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-sky-400" />}
                  </button>
                  <span className="text-slate-400">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {[1.0, 1.25, 1.5, 2.0].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono ${playbackSpeed === s ? 'bg-sky-950 text-sky-400 border border-sky-500/40 font-bold' : 'text-slate-400'}`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Clickable Chapters & Timestamps (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-2xl p-5 border ${isDark ? 'stitch-card-dark' : 'stitch-card-light'}`}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-sky-500" />
                  <h3 className={`text-xs font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Clickable Pitch Chapters
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">2 Min Total</span>
              </div>

              <div className="space-y-2.5">
                {chapters.map((ch, idx) => {
                  const isCurrent = activeChapter === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => seekToChapter(ch.time, idx)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isCurrent
                          ? isDark ? 'bg-sky-950/60 border-sky-500/50 shadow-md' : 'bg-sky-50 border-sky-300 shadow-sm'
                          : isDark ? 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900' : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-sky-500' : 'text-slate-400'}`}>
                          [{ch.label}]
                        </span>
                        {isCurrent && (
                          <span className="bg-sky-950 text-sky-300 text-[10px] font-mono px-2 py-0.5 rounded border border-sky-500/40 font-bold">
                            CURRENT CHAPTER
                          </span>
                        )}
                      </div>

                      <h4 className={`text-xs font-bold mt-1.5 ${isCurrent ? 'text-white font-bold' : isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                        {ch.title}
                      </h4>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {ch.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Verbatim Pitch Script Drawer */}
        {showScript && (
          <div className={`mt-8 rounded-2xl p-6 border animate-fadeIn ${
            isDark ? 'stitch-card-dark' : 'stitch-card-light'
          }`}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-sky-500" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Verbatim 2-Minute Pitch Video Script
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Fellowship Qualifier Script</span>
            </div>

            <div className={`space-y-4 text-xs leading-relaxed font-sans max-h-80 overflow-y-auto pr-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <p>
                <strong className="text-sky-500 font-mono">[0:00 – 0:30] The Crisis & Problem Framing:</strong> "The Strait of Hormuz carries 21 million barrels of crude oil daily—a fifth of global supply. When this chokepoint is severed, the problem isn't just missing oil; it's decision paralysis across volatile freight rates, sovereign reserve depletion, and chemical blend mismatches. That’s why I built HORMIZ-ALT AI—an autonomous multimodal energy routing and strategic procurement engine."
              </p>
              <p>
                <strong className="text-sky-500 font-mono">[0:30 – 1:05] Live Product & Multi-Corridor Solver Demo:</strong> "Using our live GIS route engine, the platform ingests vessel telemetry and spot Platts pricing, then runs Mixed-Integer Linear Programming and Graph Neural Networks to optimize alternative throughput. It dynamically balances the Saudi East-West Petroline to Yanbu, the UAE ADCOP pipeline to Fujairah, and the INSTC Eurasian rail-bridge—computing real-time voyage transit deltas, freight surcharges, and derivative hedging requirements."
              </p>
              <p>
                <strong className="text-sky-500 font-mono">[1:05 – 1:35] Systems Architecture, Security & Enterprise Integration:</strong> "Behind the UI, HORMIZ-ALT operates as a 4-tier event-driven system. We implement an AIS Zero-Trust module to filter maritime GPS spoofing, translate war-risk insurance spikes into streamed executive procurement directives, and dispatch idempotent webhooks directly into SAP S/4HANA and Oracle ERP systems."
              </p>
              <p>
                <strong className="text-sky-500 font-mono">[1:35 – 2:00] Business Model & Critical Boundary Awareness:</strong> "We monetize via a $50,000 monthly enterprise tier for refinery operators and sovereign SPR managers. But true systems maturity requires naming limits: overland bypass pipelines can only absorb 6.5 million bpd of the 21 million bpd deficit, leaving a global net shortfall that requires physical demand rationing. HORMIZ-ALT doesn't pretend to invent non-existent capacity—it optimizes every single available barrel."
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
