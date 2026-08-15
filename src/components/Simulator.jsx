import React from 'react';
import { 
  Sliders, 
  Globe, 
  Anchor, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { DESTINATIONS, CRUDE_GRADES, DISRUPTION_SCENARIOS } from '../data/simulationData';

export default function Simulator({
  simParams,
  setSimParams,
  onResetParams
}) {
  const handleDurationChange = (val) => {
    setSimParams(prev => ({ ...prev, durationDays: parseInt(val, 10) }));
  };

  const handleVolumeChange = (val) => {
    setSimParams(prev => ({ ...prev, volumeMbpd: parseFloat(val) }));
  };

  const handleDestinationChange = (e) => {
    setSimParams(prev => ({ ...prev, targetMarket: e.target.value }));
  };

  const handleCrudeChange = (e) => {
    setSimParams(prev => ({ ...prev, crudeGrade: e.target.value }));
  };

  const handleWeightChange = (key, val) => {
    setSimParams(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [key]: parseInt(val, 10)
      }
    }));
  };

  const selectedDestObj = DESTINATIONS.find(d => d.id === simParams.targetMarket) || DESTINATIONS[0];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      
      {/* Simulator Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            Rerouting Control Matrix
          </h3>
        </div>

        <button
          onClick={onResetParams}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          title="Reset Defaults"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Input 1: Disruption Scenario Quick Buttons */}
      <div>
        <label className="text-xs font-mono uppercase text-slate-300 block mb-2 flex items-center justify-between">
          <span>1. Scenario & Disruption Duration</span>
          <span className="text-cyan-400 font-bold">{simParams.durationDays} Days Lockout</span>
        </label>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {[30, 90, 180].map((d) => (
            <button
              key={d}
              onClick={() => handleDurationChange(d)}
              className={`py-2 rounded-xl text-xs font-mono border transition-all ${
                simParams.durationDays === d
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60 font-bold shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>

        <input
          type="range"
          min="15"
          max="180"
          step="5"
          value={simParams.durationDays}
          onChange={(e) => handleDurationChange(e.target.value)}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Input 2: Target Market Destination Select */}
      <div>
        <label className="text-xs font-mono uppercase text-slate-300 block mb-2 flex items-center space-x-1">
          <Globe className="h-3.5 w-3.5 text-cyan-400" />
          <span>2. Target Market Refinery Hub</span>
        </label>
        
        <select
          value={simParams.targetMarket}
          onChange={handleDestinationChange}
          className="w-full bg-slate-900 border border-slate-700/80 text-white rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-cyan-500 transition-all"
        >
          {DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.subtext})
            </option>
          ))}
        </select>
        
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center space-x-1">
          <Info className="h-3 w-3 text-cyan-400 flex-shrink-0" />
          <span>{selectedDestObj.priority} • Base Transit: {selectedDestObj.baseDays} Days</span>
        </p>
      </div>

      {/* Input 3: Cargo Volume Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-300 uppercase flex items-center space-x-1">
            <Anchor className="h-3.5 w-3.5 text-emerald-400" />
            <span>3. Cargo Dispatch Volume</span>
          </span>
          <span className="text-emerald-400 font-bold">{simParams.volumeMbpd} Million bpd</span>
        </div>

        <input
          type="range"
          min="0.5"
          max="5.0"
          step="0.1"
          value={simParams.volumeMbpd}
          onChange={(e) => handleVolumeChange(e.target.value)}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>0.5M bpd (Small Tanker Fleet)</span>
          <span>5.0M bpd (Max Pipe Allocation)</span>
        </div>
      </div>

      {/* Input 4: Crude Oil Grade Select */}
      <div>
        <label className="text-xs font-mono uppercase text-slate-300 block mb-2">
          4. Crude Grade & Blend Quality
        </label>
        
        <select
          value={simParams.crudeGrade}
          onChange={handleCrudeChange}
          className="w-full bg-slate-900 border border-slate-700/80 text-white rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-cyan-500"
        >
          {CRUDE_GRADES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input 5: Optimization Weights Priority Slider Matrix */}
      <div className="pt-2 border-t border-slate-800/80">
        <label className="text-xs font-mono uppercase text-cyan-400 block mb-3 font-bold flex items-center space-x-1">
          <Zap className="h-3.5 w-3.5" />
          <span>5. MILP Optimization Priority Weights</span>
        </label>

        <div className="space-y-3 text-xs">
          
          {/* Weight 1: Cost Efficiency */}
          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span className="flex items-center space-x-1">
                <DollarSign className="h-3 w-3 text-emerald-400" />
                <span>Cost Efficiency</span>
              </span>
              <span className="text-emerald-400 font-bold">{simParams.weights.cost}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.cost}
              onChange={(e) => handleWeightChange('cost', e.target.value)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Weight 2: Delivery Speed */}
          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-cyan-400" />
                <span>Delivery Speed</span>
              </span>
              <span className="text-cyan-400 font-bold">{simParams.weights.speed}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.speed}
              onChange={(e) => handleWeightChange('speed', e.target.value)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Weight 3: Geopolitical Risk Index */}
          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="h-3 w-3 text-amber-400" />
                <span>Risk Avoidance</span>
              </span>
              <span className="text-amber-400 font-bold">{simParams.weights.risk}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.risk}
              onChange={(e) => handleWeightChange('risk', e.target.value)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
