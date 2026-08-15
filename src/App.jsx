import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import LiveTickerBar from './components/LiveTickerBar';
import Hero from './components/Hero';
import NewsBroadcastSection from './components/NewsBroadcastSection';
import FinancialCrisisSection from './components/FinancialCrisisSection';
import Simulator from './components/Simulator';
import SimResults from './components/SimResults';
import RouteMap from './components/RouteMap';
import AIAgentStudio from './components/AIAgentStudio';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import AIGeneratorModal from './components/AIGeneratorModal';
import GTMStrategy from './components/GTMStrategy';
import VulnerabilitySection from './components/VulnerabilitySection';
import Footer from './components/Footer';

import { calculateRouteMetrics } from './data/simulationData';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [activeTab, setActiveTab] = useState('hero');
  const [isAIMemoOpen, setIsAIMemoOpen] = useState(false);

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
        ? 'bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white'
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

      <main>
        {/* Section 1: Command Center Executive Hero */}
        <Hero
          theme={theme}
          onStartSimulation={handleStartSimulation}
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />

        {/* Section 2: BBC & Global News Video Broadcast Hub */}
        <NewsBroadcastSection
          theme={theme}
        />

        {/* Section 3: Financial Crisis & Sovereign SPR Reserve Engine */}
        <FinancialCrisisSection
          theme={theme}
        />

        {/* Section 4: Core Product Interactive Multimodal Rerouting Simulator */}
        <section id="simulator" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono mb-3 ${
                isDark ? 'bg-sky-950/80 border border-sky-500/40 text-sky-300' : 'bg-sky-50 border border-sky-200 text-sky-700'
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
                />
              </div>

              <div className="lg:col-span-7">
                <SimResults
                  metrics={metrics}
                  onOpenAIMemo={() => setIsAIMemoOpen(true)}
                />
              </div>

            </div>

          </div>
        </section>

        {/* Section 5: Interactive GIS Route Map Section */}
        <section id="map" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouteMap activeRoute="alt1" />
          </div>
        </section>

        {/* Section 6: Live AI Agent Decision Studio */}
        <section id="agent-studio" className={`py-16 border-b transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIAgentStudio simParams={simParams} metrics={metrics} />
          </div>
        </section>

        {/* Section 7: Systems & Architecture Layer (Polymath Engineering Breakdown) */}
        <ArchitectureDiagram
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />

        {/* Section 8: Business Model & Go-To-Market (GTM) Strategy */}
        <GTMStrategy
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />

        {/* Section 9: Critical Self-Awareness & Limits (Vulnerability Analysis) */}
        <VulnerabilitySection
          onOpenAIMemo={() => setIsAIMemoOpen(true)}
        />
      </main>

      {/* Section 10: Submission Metadata & Footer */}
      <Footer />

      {/* Interactive AI CPO Executive Memo Synthesizer Modal */}
      <AIGeneratorModal
        isOpen={isAIMemoOpen}
        onClose={() => setIsAIMemoOpen(false)}
        simParams={simParams}
        metrics={metrics}
      />

    </div>
  );
}
