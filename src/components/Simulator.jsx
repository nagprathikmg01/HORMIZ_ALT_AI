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
  Info,
  FlaskConical,
  AlertTriangle
} from 'lucide-react';
import { DESTINATIONS, CRUDE_GRADES, DISRUPTION_SCENARIOS } from '../data/simulationData';

export default function Simulator({
  simParams,
  setSimParams,
  onResetParams,
  theme = 'dark'
}) {
  const isDark = theme === 'dark';

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
  const selectedCrudeObj = CRUDE_GRADES.find(c => c.id === simParams.crudeGrade) || CRUDE_GRADES[0];

  return (
    <div className={`rounded-2xl p-6 border space-y-6 transition-colors ${
      isDark ? 'stitch-card-dark' : 'stitch-card-light'
    }`}>
      
      {/* Simulator Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-sky-500" />
          <h3 className={`text-base font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Rerouting Control Matrix
          </h3>
        </div>

        <button
          onClick={onResetParams}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-sky-500 transition-colors font-mono"
          title="Reset Defaults"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Input 1: Disruption Scenario Quick Buttons */}
      <div>
        <label className={`text-xs font-mono uppercase block mb-2 flex items-center justify-between ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span>1. Disruption Duration Horizon</span>
          <span className="text-sky-500 font-bold">{simParams.durationDays} Days Lockout</span>
        </label>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {[30, 90, 180].map((d) => (
            <button
              key={d}
              onClick={() => handleDurationChange(d)}
              className={`py-2 rounded-xl text-xs font-mono border transition-all ${
                simParams.durationDays === d
                  ? 'bg-sky-600 text-white border-sky-500 font-bold shadow-xs'
                  : isDark ? 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
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
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
      </div>

      {/* Input 2: Target Market Destination Select */}
      <div>
        <label className={`text-xs font-mono uppercase block mb-2 flex items-center space-x-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <Globe className="h-3.5 w-3.5 text-sky-500" />
          <span>2. Target Market Refinery Hub</span>
        </label>
        
        <select
          value={simParams.targetMarket}
          onChange={handleDestinationChange}
          className={`w-full border rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-sky-500 transition-all ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
          }`}
        >
          {DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.subtext})
            </option>
          ))}
        </select>
        
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center space-x-1">
          <Info className="h-3 w-3 text-sky-500 flex-shrink-0" />
          <span>{selectedDestObj.priority} • Base Transit: {selectedDestObj.baseDays} Days</span>
        </p>
      </div>

      {/* Input 3: Cargo Volume Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className={`uppercase flex items-center space-x-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <Anchor className="h-3.5 w-3.5 text-emerald-500" />
            <span>3. Cargo Dispatch Volume</span>
          </span>
          <span className="text-emerald-500 font-bold">{simParams.volumeMbpd} Million bpd</span>
        </div>

        <input
          type="range"
          min="0.5"
          max="5.0"
          step="0.1"
          value={simParams.volumeMbpd}
          onChange={(e) => handleVolumeChange(e.target.value)}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>0.5M bpd (Small Fleet)</span>
          <span>5.0M bpd (Max Pipe Allocation)</span>
        </div>
      </div>

      {/* Input 4: Crude Oil Grade Select & Chemical Diagnostic */}
      <div>
        <label className={`text-xs font-mono uppercase block mb-2 flex items-center space-x-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <FlaskConical className="h-3.5 w-3.5 text-amber-500" />
          <span>4. Crude Grade & Chemical API Blend</span>
        </label>
        
        <select
          value={simParams.crudeGrade}
          onChange={handleCrudeChange}
          className={`w-full border rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-sky-500 ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
          }`}
        >
          {CRUDE_GRADES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Chemical Blend Incompatibility Diagnostic Card */}
        <div className="mt-3 p-3 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-300 text-xs font-mono space-y-1">
          <div className="flex items-center space-x-1.5 font-bold">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
            <span>Crude API Gravity & Sulfur Mismatch Warning</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            Routing alternative crude ({selectedCrudeObj.name.split(' ')[0]}) requires <strong>+3.2% hydrocracker desulfurization penalty</strong>; adjusted net refinery margin: <strong className="text-amber-400">-$1.40/bbl</strong>.
          </p>
        </div>
      </div>

      {/* Input 5: Optimization Weights Priority Slider Matrix */}
      <div className="pt-2 border-t border-slate-800">
        <label className="text-xs font-mono uppercase text-sky-500 block mb-3 font-bold flex items-center space-x-1">
          <Zap className="h-3.5 w-3.5" />
          <span>5. MILP Optimization Priority Weights</span>
        </label>

        <div className="space-y-3 text-xs">
          
          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span>Cost Efficiency</span>
              <span className="text-emerald-500 font-bold">{simParams.weights.cost}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.cost}
              onChange={(e) => handleWeightChange('cost', e.target.value)}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span>Delivery Speed</span>
              <span className="text-sky-500 font-bold">{simParams.weights.speed}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.speed}
              onChange={(e) => handleWeightChange('speed', e.target.value)}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 font-mono mb-1">
              <span>Risk Avoidance</span>
              <span className="text-amber-500 font-bold">{simParams.weights.risk}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={simParams.weights.risk}
              onChange={(e) => handleWeightChange('risk', e.target.value)}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
