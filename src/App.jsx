import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import LiveTickerBar from './components/LiveTickerBar';
import LiveCommoditiesBar from './components/LiveCommoditiesBar';
import Hero from './components/Hero';
import RouteMap from './components/RouteMap';
import PolymathMatrix from './components/PolymathMatrix';
import LiveBroadcastHub from './components/LiveBroadcastHub';
import FinancialCrisisSection from './components/FinancialCrisisSection';
import Simulator from './components/Simulator';
import SimResults from './components/SimResults';
import AIAgentStudio from './components/AIAgentStudio';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import AIGeneratorModal from './components/AIGeneratorModal';
import DatabaseSchemaModal from './components/DatabaseSchemaModal';
import GTMStrategy from './components/GTMStrategy';
import VulnerabilitySection from './components/VulnerabilitySection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

import { calculateRouteMetrics } from './data/simulationData';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('hero');
  const [isAIMemoOpen, setIsAIMemoOpen] = useState(false);
  const [isDbSchemaOpen, setIsDbSchemaOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [simParams, setSimParams] = useState({
    durationDays: 90,
    targetMarket: 'india_west',
    volumeMbpd: 2.5,
    crudeGrade: 'arab_light',
    weights: {
      cost: 40,
      speed: 40,
      risk: 20
    }
  });

  const metrics = useMemo(() => {
    return calculateRouteMetrics(simParams);
  }, [simParams]);

  const handleResetParams = () => {
    setSimParams({
      durationDays: 90,
      targetMarket: 'india_west',
      volumeMbpd: 2.5,
      crudeGrade: 'arab_light',
      weights: {
        cost: 40,
        speed: 40,
        risk: 20
      }
    });
  };

  const handleStartSimulation = () => {
    setActiveTab('simulator');
    const simElem = document.getElementById('simulator');
    if (simElem) {
      simElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark 
        ? 'bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white' 
        : 'bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white'
    }`}>
      
      {/* Executive Fixed Header Navigation */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIMemo={() => setIsAIMemoOpen(true)}
      />

      {/* Live Energy & Commodity Price Telemetry Ticker Bar */}
      <LiveTickerBar />

      {/* Real-Time Ticking Commodities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <LiveCommoditiesBar theme={theme} />
      </div>

      <main>
        {/* Section 1: Command Center Executive Hero */}
        <Hero
          theme={theme}
          onStartSimulation={handleStartSimulation}
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />

        {/* Section 2: Interactive GIS Global Rerouting Map (Positioned at Starting of Page) */}
        <section id="map" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-[#090d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouteMap activeRoute="alt1" />
          </div>
        </section>

        {/* Section 3: Polymath 8-Dimension Intersection Matrix */}
        <PolymathMatrix
          theme={theme}
        />

        {/* Section 4: Crisis Live Broadcast Telemetry Hub (CNBC, Bloomberg, BBC) */}
        <LiveBroadcastHub
          theme={theme}
        />

        {/* Section 5: 2-Minute System Architecture Pitch Video */}
        <VideoSection
          onStartSimulation={handleStartSimulation}
          theme={theme}
        />

        {/* Section 6: Financial Crisis & Sovereign SPR Reserve Engine */}
        <FinancialCrisisSection
          theme={theme}
        />

        {/* Section 7: Core Product Interactive Multimodal Rerouting Simulator */}
        <section id="simulator" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-[#090d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono mb-3 ${
                isDark ? 'bg-slate-800/90 border border-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-800'
              }`}>
                <span>Interactive Live Product Simulator</span>
              </div>
              
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Multimodal Supply Rerouting Simulator
              </h2>
              <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Adjust disruption duration, crude volume dispatch, target market, and optimization priorities to observe real-time MILP route recalculations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5">
                <Simulator
                  simParams={simParams}
                  setSimParams={setSimParams}
                  onResetParams={handleResetParams}
                  theme={theme}
                />
              </div>

              <div className="lg:col-span-7">
                <SimResults
                  metrics={metrics}
                  onOpenAIMemo={() => setIsAIMemoOpen(true)}
                  theme={theme}
                />
              </div>

            </div>

          </div>
        </section>

        {/* Section 8: Live AI Agent Decision Studio */}
        <section id="agent-studio" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-[#090d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIAgentStudio simParams={simParams} metrics={metrics} theme={theme} />
          </div>
        </section>

        {/* Section 9: Systems & Architecture Layer (Polymath Engineering Breakdown) */}
        <ArchitectureDiagram
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
          onOpenDbSchema={() => setIsDbSchemaOpen(true)}
          theme={theme}
        />

        {/* Section 10: Business Model & Go-To-Market (GTM) Strategy */}
        <GTMStrategy
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />

        {/* Section 11: Critical Self-Awareness & Limits (Vulnerability Analysis) */}
        <VulnerabilitySection
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />
      </main>

      {/* Section 12: Submission Metadata & Footer */}
      <Footer />

      {/* Interactive AI CPO Executive Memo Synthesizer Modal */}
      <AIGeneratorModal
        isOpen={isAIMemoOpen}
        onClose={() => setIsAIMemoOpen(false)}
        simParams={simParams}
        metrics={metrics}
      />

      {/* Database Relational Schema DDL Modal */}
      <DatabaseSchemaModal
        isOpen={isDbSchemaOpen}
        onClose={() => setIsDbSchemaOpen(false)}
        theme={theme}
      />

    </div>
  );
}
