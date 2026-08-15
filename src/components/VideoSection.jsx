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
  RotateCcw
} from 'lucide-react';

export default function VideoSection({ onStartSimulation }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const chapters = [
    {
      time: 0,
      label: '0:00',
      title: 'Problem Statement: Strait of Hormuz 21M bpd Chokepoint',
      desc: 'Why existing global supply chains collapse during naval blockades and asymmetric mine hazards.'
    },
    {
      time: 35,
      label: '0:35',
      title: 'Multimodal MILP Heuristics & Route Optimization',
      desc: 'Evaluating Saudi Petroline, UAE ADCOP Habshan, and INSTC Caspian rail corridors.'
    },
    {
      time: 70,
      label: '1:10',
      title: 'AI Risk Synthesizer & Enterprise ERP Integration',
      desc: 'Translating war-risk insurance premiums into automated SAP/Oracle purchase orders.'
    },
    {
      time: 105,
      label: '1:45',
      title: 'Monetization, Sovereign SPR Defense & GTM Strategy',
      desc: 'Enterprise tiering ($50k/mo) and strategic petroleum reserve inventory hedging.'
    }
  ];

  // Handle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // If media file not loaded, toggle simulated state
          setIsPlaying(true);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Simulated timer for fallback video state
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

  // Update active chapter based on time
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

  const togglePiP = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture().catch(() => {});
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="video" className="py-16 bg-slate-950 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 mb-3">
              <MonitorPlay className="h-3.5 w-3.5 text-cyan-400" />
              <span>Step 3 Top Submission Requirement</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              2-Minute Explanatory Pitch Video
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Walkthrough of our multimodal rerouting heuristics, predictive inventory allocation, and enterprise SaaS roll-out strategy for global energy supply chain defense.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
            >
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>{showTranscript ? 'Hide Transcript' : 'View Executive Transcript'}</span>
            </button>

            <a
              href="#video"
              onClick={(e) => {
                e.preventDefault();
                alert('Pitch Deck Executive Brief PDF download initiated.');
              }}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
            >
              <Download className="h-4 w-4 text-emerald-400" />
              <span>Download PDF Deck</span>
            </a>
          </div>
        </div>

        {/* Main Video & Chapters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Video Player Card (8 Columns) */}
          <div className="lg:col-span-8 glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl shadow-cyan-950/20 relative group">
            
            {/* Video Container */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              
              {/* Native HTML5 Video Element */}
              <video
                ref={videoRef}
                src="/hormuz-pitch.mp4"
                className="w-full h-full object-cover"
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                poster="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
              />

              {/* Animated Interactive Visual Overlay (When media is playing or as pitch canvas fallback) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

              {/* Pitch Canvas Simulation Overlay Details */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
                <span className="bg-slate-950/90 border border-slate-800 text-cyan-400 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>CHAPTER {activeChapter + 1}/4</span>
                </span>
                <span className="bg-slate-950/90 border border-slate-800 text-slate-300 text-[11px] font-mono px-2.5 py-1 rounded-md hidden sm:inline">
                  {chapters[activeChapter].title.split(':')[0]}
                </span>
              </div>

              {/* Center Play Overlay Button */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute z-20 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-2xl shadow-cyan-500/50 transform transition-all hover:scale-110"
                >
                  <div className="h-full w-full bg-slate-950/90 rounded-full flex items-center justify-center pl-1">
                    <Play className="h-8 w-8 text-cyan-400 fill-cyan-400" />
                  </div>
                </button>
              )}

              {/* Dynamic Video Graphic Canvas Preview overlay */}
              <div className="absolute inset-x-8 top-1/3 bottom-20 pointer-events-none flex flex-col justify-center items-center text-center z-10">
                <div className="glass-card px-4 py-3 rounded-xl border border-cyan-500/30 bg-slate-950/80 max-w-md">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">PITCH WALKTHROUGH DEMO</span>
                  <p className="text-sm text-white font-semibold">
                    {chapters[activeChapter].title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {chapters[activeChapter].desc}
                  </p>
                </div>
              </div>

            </div>

            {/* Custom Video Controls Bar */}
            <div className="bg-slate-950 border-t border-slate-800 px-4 py-3">
              
              {/* Scrubbing Progress Bar */}
              <div className="mb-3 relative group/progress cursor-pointer">
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 group-hover/progress:h-2.5 transition-all"
                />
                
                {/* Chapter Marker Dots on Timeline */}
                <div className="absolute top-0 inset-x-0 h-1.5 pointer-events-none flex justify-between px-1">
                  {chapters.map((ch, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 w-2 rounded-full -mt-0.25 ${activeChapter === idx ? 'bg-cyan-400 ring-2 ring-cyan-400/50' : 'bg-slate-600'}`}
                      style={{ left: `${(ch.time / duration) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Control Buttons & Indicators */}
              <div className="flex items-center justify-between gap-4 text-xs font-mono">
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 text-cyan-400" /> : <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />}
                  </button>

                  <button
                    onClick={() => seekToChapter(0, 0)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                    title="Restart Video"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
                  </button>

                  <span className="text-slate-400">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                  </span>
                </div>

                {/* Right Speed & Mode Controls */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {[1.0, 1.25, 1.5, 2.0].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono ${playbackSpeed === s ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={togglePiP}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hidden sm:block"
                    title="Picture in Picture"
                  >
                    <PictureInPicture className="h-4 w-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Chapters & Interactive Agenda Card (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="glass-card rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Video Agenda & Chapters</h3>
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
                          ? 'bg-cyan-950/60 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-400'}`}>
                          {ch.label}
                        </span>
                        {isCurrent && (
                          <span className="bg-cyan-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/40">
                            NOW PLAYING
                          </span>
                        )}
                      </div>

                      <h4 className={`text-xs font-semibold mt-1.5 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                        {ch.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {ch.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">Ready to test our live heuristics?</h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Run live scenarios for India West Coast, Ningbo, and Rotterdam refiners.
                  </p>
                  <button
                    onClick={onStartSimulation}
                    className="mt-3 flex items-center space-x-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <span>Jump to Live Simulator</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Collapsible Executive Transcript Card */}
        {showTranscript && (
          <div className="mt-8 glass-card rounded-2xl p-6 border border-slate-800 bg-slate-950/90 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Pitch Video Executive Transcript</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Verified Submission Transcript</span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans max-h-80 overflow-y-auto pr-2">
              <p>
                <strong className="text-cyan-400 font-mono">[0:00 - Problem Statement]:</strong> "Good day reviewers. Over 21 million barrels of crude oil pass through the Strait of Hormuz daily—accounting for 21% of global liquid petroleum. A single naval blockade or asymmetric mine hazard creates immediate supply shock, driving spot VLCC charter rates beyond $250,000 per day and triggering panics across sovereign strategic petroleum reserves..."
              </p>
              <p>
                <strong className="text-cyan-400 font-mono">[0:35 - Multimodal Heuristics]:</strong> "HORMIZ-ALT AI introduces a dynamic multi-commodity Mixed Integer Linear Programming (MILP) engine. Instead of relying on static ocean rerouting, our algorithm dynamically balances Saudi Petroline (5.0M bpd to Yanbu), UAE ADCOP Habshan pipeline (1.5M bpd to Fujairah), and INSTC Caspian containerized rail freight..."
              </p>
              <p>
                <strong className="text-cyan-400 font-mono">[1:10 - Enterprise Action]:</strong> "Beyond spatial optimization, our platform features an LLM Risk Synthesizer that ingests satellite telemetry, AIS vessel feeds, and S&P Platts war-risk insurance premiums, translating them into executable SAP and Oracle ERP purchase orders within 180 milliseconds..."
              </p>
              <p>
                <strong className="text-cyan-400 font-mono">[1:45 - Business & Monetization]:</strong> "We target Tier-1 refineries and sovereign SPR managers via an Enterprise SaaS model at $50,000 per month per facility. Thank you for evaluating HORMIZ-ALT AI."
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
