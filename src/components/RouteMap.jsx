import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Polyline, 
  Popup, 
  Tooltip,
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  Layers, 
  Activity, 
  ArrowRight, 
  Anchor, 
  Train, 
  Zap,
  Info,
  Maximize2,
  Filter,
  Flame,
  Globe
} from 'lucide-react';

// Fix Leaflet default icon URLs in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create Custom SVG DivIcons for High-Visual Precision
const createCustomIcon = (color, isChokepoint = false, iconType = 'dot') => {
  const size = isChokepoint ? 36 : 26;
  const pulseHtml = isChokepoint ? `<div class="absolute inset-0 rounded-full animate-ping opacity-75" style="background-color: ${color};"></div>` : '';
  
  let innerIcon = `<div class="w-3 h-3 rounded-full" style="background-color: ${color};"></div>`;
  if (iconType === 'anchor') {
    innerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`;
  } else if (iconType === 'train') {
    innerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-3 3"/><path d="M16 19l3 3"/></svg>`;
  } else if (iconType === 'chokepoint') {
    innerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  }

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div className="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
        ${pulseHtml}
        <div className="relative rounded-full shadow-2xl flex items-center justify-center border-2 border-white" style="width: ${size}px; height: ${size}px; background-color: ${color};">
          ${innerIcon}
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Map View Controller to handle smooth flyTo transitions
function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function RouteMap({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [activeRouteFilter, setActiveRouteFilter] = useState('all'); // 'all', 'alt1', 'alt2', 'alt3'
  const [showPipelines, setShowPipelines] = useState(true);
  const [showSeaLanes, setShowSeaLanes] = useState(true);
  const [showRail, setShowRail] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    setMapMounted(true);
  }, []);

  // Precise Middle East Waypoint Coordinates
  const INFRASTRUCTURE_NODES = {
    hormuz: {
      lat: 26.56, lng: 56.25,
      name: 'Strait of Hormuz',
      type: 'Primary Chokepoint',
      status: 'CRITICAL LOCKOUT (Naval Mines)',
      throughput: '21.0M bpd Disrupted',
      color: '#ef4444',
      iconType: 'chokepoint',
      isChokepoint: true,
      desc: 'Carries 20% of global oil. Currently 100% blocked due to conflict risk.'
    },
    abqaiq: {
      lat: 26.28, lng: 49.80,
      name: 'Abqaiq Oil Processing Plant',
      type: 'Supply Hub (Saudi Arabia)',
      status: 'OPERATIONAL',
      throughput: '7.0M bpd Crude Processing',
      color: '#3b82f6',
      iconType: 'dot',
      desc: 'World largest crude oil stabilization plant in Ghawar field.'
    },
    yanbu: {
      lat: 24.08, lng: 38.06,
      name: 'Yanbu Commercial Port (Red Sea)',
      type: 'Pipeline Terminal',
      status: 'ACTIVE (94% Load)',
      throughput: '5.0M bpd Export Capacity',
      color: '#10b981',
      iconType: 'anchor',
      desc: 'Red Sea export terminal bypassing Hormuz via East-West Petroline.'
    },
    habshan: {
      lat: 23.67, lng: 53.71,
      name: 'Habshan Oil Field (Abu Dhabi)',
      type: 'Supply Hub (UAE)',
      status: 'OPERATIONAL',
      throughput: '1.5M bpd Feed Capacity',
      color: '#3b82f6',
      iconType: 'dot',
      desc: 'Primary inland crude gathering hub for UAE ADCOP pipeline.'
    },
    fujairah: {
      lat: 25.18, lng: 56.36,
      name: 'Fujairah Deepwater SPM Berths',
      type: 'Bypass Terminal',
      status: 'ACTIVE (100% Load)',
      throughput: '1.5M bpd Export Capacity',
      color: '#10b981',
      iconType: 'anchor',
      desc: 'Gulf of Oman deepwater berths allowing VLCC loading outside Hormuz.'
    },
    bandarAbbas: {
      lat: 27.18, lng: 56.27,
      name: 'Bandar Abbas INSTC Terminal',
      type: 'Multimodal Rail Hub',
      status: 'QUEUED (22 Freight Trains)',
      throughput: '0.8M bpd Max Rail',
      color: '#f59e0b',
      iconType: 'train',
      desc: 'Southern maritime railhead for the Eurasian INSTC land bridge.'
    },
    tehran: {
      lat: 35.68, lng: 51.38,
      name: 'Tehran INSTC Junction',
      type: 'Rail Transport Hub',
      status: 'OPERATIONAL',
      throughput: '0.8M bpd Transit Flow',
      color: '#f59e0b',
      iconType: 'train',
      desc: 'Central Eurasian rail junction routing crude containers north.'
    },
    astrakhan: {
      lat: 46.34, lng: 48.03,
      name: 'Astrakhan Caspian Sea Depot',
      type: 'Rail Terminal',
      status: 'OPERATIONAL',
      throughput: '0.8M bpd Rail Arrival',
      color: '#f59e0b',
      iconType: 'train',
      desc: 'Caspian Sea rail depot connecting to European pipeline networks.'
    },
    jamnagar: {
      lat: 22.47, lng: 70.05,
      name: 'Jamnagar Mega Refinery (India)',
      type: 'Refinery Hub',
      status: 'OPERATIONAL',
      throughput: '1.24M bpd Refining Capacity',
      color: '#06b6d4',
      iconType: 'anchor',
      desc: 'World largest single-location refinery destination hub.'
    },
    babElMandeb: {
      lat: 12.58, lng: 43.33,
      name: 'Bab-el-Mandeb Strait',
      type: 'Secondary Chokepoint',
      status: 'HIGH RISK (Naval Escorts Active)',
      throughput: '4.8M bpd Flow',
      color: '#f97316',
      iconType: 'chokepoint',
      desc: 'Red Sea exit chokepoint into the Gulf of Aden & Indian Ocean.'
    },
    capeGoodHope: {
      lat: -34.35, lng: 18.47,
      name: 'Cape of Good Hope Passage',
      type: 'Deep Sea Bypass',
      status: 'ACTIVE (+14.2 Transit Days)',
      throughput: 'Unlimited Sea Lane',
      color: '#3b82f6',
      iconType: 'anchor',
      desc: 'Cape bypass around Southern Africa avoiding Middle East chokepoints.'
    }
  };

  // Precise Polyline Coordinates for Pipeline & Rail Paths
  const saudiPetrolinePath = [
    [26.28, 49.80], // Abqaiq
    [24.68, 46.72], // Riyadh Substation
    [24.50, 44.39], // Dawadmi Substation
    [24.08, 38.06]  // Yanbu Port
  ];

  const saudiCapeSeaPath = [
    [24.08, 38.06], // Yanbu Port
    [12.58, 43.33], // Bab-el-Mandeb Strait
    [12.20, 53.50], // Socotra Passage
    [-15.00, 41.50], // Mozambique Channel
    [-34.35, 18.47], // Cape of Good Hope
    [-25.00, 65.00], // Deep Indian Ocean
    [22.47, 70.05]  // Jamnagar India
  ];

  const uaeAdcopPath = [
    [23.67, 53.71], // Habshan Field
    [24.47, 55.33], // Sweihan Substation
    [25.08, 56.28], // Al Hayl Pass
    [25.18, 56.36]  // Fujairah Terminal
  ];

  const uaeAdcopSeaPath = [
    [25.18, 56.36], // Fujairah Terminal
    [23.80, 60.50], // Gulf of Oman Outer Sea
    [22.47, 70.05]  // Jamnagar India
  ];

  const instcRailPath = [
    [27.18, 56.27], // Bandar Abbas
    [29.45, 55.68], // Sirjan Junction
    [32.65, 51.67], // Isfahan Junction
    [34.64, 50.87], // Qom Junction
    [35.68, 51.38], // Tehran
    [37.28, 49.58], // Rasht Caspian Port
    [46.34, 48.03]  // Astrakhan Russia
  ];

  // Camera views depending on corridor filter
  const mapCenter = activeRouteFilter === 'alt3' ? [34.0, 52.0] : activeRouteFilter === 'alt1' ? [18.0, 45.0] : [24.5, 55.5];
  const mapZoom = activeRouteFilter === 'alt1' ? 4 : 5;

  return (
    <div className={`rounded-2xl border p-6 shadow-2xl transition-colors ${
      isDark ? 'stitch-card-dark' : 'stitch-card-light'
    }`}>
      
      {/* Header & Map Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-blue-400" />
            <h3 className={`font-bold text-lg font-sans ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Interactive GIS Global Rerouting Map
            </h3>
            <span className="bg-emerald-950/80 text-emerald-300 text-xs font-mono font-semibold px-2.5 py-0.5 rounded border border-emerald-800/50">
              PRECISION GIS TELEMETRY
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            True Geographic Coordinates & Multimodal Alternative Energy Flow Corridors (Pipelines, Sea Lanes & INSTC Rail)
          </p>
        </div>

        {/* Corridor Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveRouteFilter('all')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              activeRouteFilter === 'all'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 border-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            All Corridors
          </button>
          
          <button
            onClick={() => setActiveRouteFilter('alt1')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              activeRouteFilter === 'alt1'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : isDark ? 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border-slate-800' : 'bg-slate-100 text-emerald-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            Alt 1: Saudi Petroline (5.0M bpd)
          </button>

          <button
            onClick={() => setActiveRouteFilter('alt2')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              activeRouteFilter === 'alt2'
                ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                : isDark ? 'bg-slate-900 text-cyan-400 hover:bg-slate-800 border-slate-800' : 'bg-slate-100 text-cyan-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            Alt 2: UAE ADCOP (1.5M bpd)
          </button>

          <button
            onClick={() => setActiveRouteFilter('alt3')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              activeRouteFilter === 'alt3'
                ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                : isDark ? 'bg-slate-900 text-amber-400 hover:bg-slate-800 border-slate-800' : 'bg-slate-100 text-amber-700 hover:bg-slate-200 border-slate-300'
            }`}
          >
            Alt 3: INSTC Rail (0.8M bpd)
          </button>
        </div>
      </div>

      {/* Interactive Layer Checkbox Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-slate-950/80 border-b border-slate-800/80 text-xs font-mono text-slate-300">
        <div className="flex items-center space-x-5">
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showPipelines}
              onChange={(e) => setShowPipelines(e.target.checked)}
              className="accent-emerald-500 rounded cursor-pointer"
            />
            <span className="flex items-center space-x-1.5">
              <span className="h-2.5 w-5 bg-emerald-500 rounded-full inline-block" />
              <span>Overland Pipelines</span>
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showSeaLanes}
              onChange={(e) => setShowSeaLanes(e.target.checked)}
              className="accent-cyan-500 rounded cursor-pointer"
            />
            <span className="flex items-center space-x-1.5">
              <span className="h-2.5 w-5 bg-cyan-500 rounded-full inline-block" />
              <span>Cape Deep Sea Lanes</span>
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showRail}
              onChange={(e) => setShowRail(e.target.checked)}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <span className="flex items-center space-x-1.5">
              <span className="h-2.5 w-5 bg-amber-500 rounded-full inline-block" />
              <span>INSTC Rail Bridge</span>
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2 text-rose-400 font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>STRAIT OF HORMUZ: 100% LOCKOUT ACTIVE</span>
        </div>
      </div>

      {/* Main Leaflet GIS Map Canvas */}
      <div className="relative mt-4 h-[550px] w-full overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950 shadow-inner group">
        
        {mapMounted && (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', backgroundColor: '#090d16' }}
          >
            <MapViewController center={mapCenter} zoom={mapZoom} />

            {/* High-Contrast CartoDB Dark Matter Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={18}
            />

            {/* ================= POLYLINES & PATHS ================= */}

            {/* Saudi Petroline Pipeline (Alt 1) */}
            {showPipelines && (activeRouteFilter === 'all' || activeRouteFilter === 'alt1') && (
              <Polyline
                positions={saudiPetrolinePath}
                pathOptions={{ color: '#10b981', weight: 5, opacity: 0.95 }}
              >
                <Tooltip sticky>Saudi East-West Petroline (5.0M bpd Rated Capacity)</Tooltip>
              </Polyline>
            )}

            {/* Saudi Petroline Cape Sea Route */}
            {showSeaLanes && (activeRouteFilter === 'all' || activeRouteFilter === 'alt1') && (
              <Polyline
                positions={saudiCapeSeaPath}
                pathOptions={{ color: '#06b6d4', weight: 4, opacity: 0.85, dashArray: '8, 8' }}
              >
                <Tooltip sticky>Cape of Good Hope Sea Passage (+14.2 Transit Days)</Tooltip>
              </Polyline>
            )}

            {/* UAE ADCOP Pipeline (Alt 2) */}
            {showPipelines && (activeRouteFilter === 'all' || activeRouteFilter === 'alt2') && (
              <Polyline
                positions={uaeAdcopPath}
                pathOptions={{ color: '#10b981', weight: 5, opacity: 0.95 }}
              >
                <Tooltip sticky>UAE Habshan-Fujairah ADCOP Pipeline (1.5M bpd Capacity)</Tooltip>
              </Polyline>
            )}

            {/* Fujairah Sea Route */}
            {showSeaLanes && (activeRouteFilter === 'all' || activeRouteFilter === 'alt2') && (
              <Polyline
                positions={uaeAdcopSeaPath}
                pathOptions={{ color: '#06b6d4', weight: 4, opacity: 0.85 }}
              >
                <Tooltip sticky>Fujairah Gulf of Oman Deepwater Tanker Route</Tooltip>
              </Polyline>
            )}

            {/* INSTC Rail Corridor (Alt 3) */}
            {showRail && (activeRouteFilter === 'all' || activeRouteFilter === 'alt3') && (
              <Polyline
                positions={instcRailPath}
                pathOptions={{ color: '#f59e0b', weight: 4, opacity: 0.95, dashArray: '4, 6' }}
              >
                <Tooltip sticky>INSTC Eurasian Container Rail Corridor (0.8M bpd Max)</Tooltip>
              </Polyline>
            )}

            {/* ================= CUSTOM SVG MARKERS ================= */}
            {Object.entries(INFRASTRUCTURE_NODES).map(([key, loc]) => {
              const customIcon = createCustomIcon(loc.color, loc.isChokepoint, loc.iconType);
              return (
                <Marker
                  key={key}
                  position={[loc.lat, loc.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedNode(loc)
                  }}
                >
                  <Popup>
                    <div className="p-2 font-mono text-xs max-w-xs space-y-1 text-slate-900">
                      <div className="flex items-center space-x-1.5 border-b pb-1 font-bold text-sm text-slate-950">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span>{loc.name}</span>
                      </div>
                      <p><strong>Category:</strong> {loc.type}</p>
                      <p><strong>Status:</strong> <span className="text-emerald-700 font-bold">{loc.status}</span></p>
                      <p><strong>Throughput:</strong> {loc.throughput}</p>
                      <p className="text-[11px] text-slate-600 font-sans mt-1 leading-snug">{loc.desc}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t">Coords: {loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E</p>
                    </div>
                  </Popup>
                  
                  <Tooltip direction="top" offset={[0, -14]} opacity={0.95} permanent={key === 'hormuz' || key === 'yanbu' || key === 'fujairah'}>
                    <div className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded shadow">
                      <span>{loc.name}</span>
                      <span className="block text-[9px] font-normal opacity-80">{loc.throughput.split(' ')[0]}</span>
                    </div>
                  </Tooltip>
                </Marker>
              );
            })}

          </MapContainer>
        )}

        {/* Floating Telemetry Inspector Card top-right */}
        <div className="absolute top-4 right-4 z-[400] w-72 rounded-xl p-4 bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-2xl font-mono text-xs text-slate-200 hidden md:block">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="font-bold text-sky-400 flex items-center space-x-1">
              <Activity className="h-3.5 w-3.5" />
              <span>GIS Telemetry Inspector</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Selected Filter:</span>
              <span className="font-bold uppercase text-white">{activeRouteFilter}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Chokepoint Deficit:</span>
              <span className="text-rose-400 font-bold">21.0M bpd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bypass Capacity:</span>
              <span className="text-emerald-400 font-bold">6.5M bpd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Net Global Gap:</span>
              <span className="text-amber-400 font-bold">14.5M bpd</span>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Node Telemetry Summary Cards Below Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        
        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 1: Saudi Petroline (Yanbu)</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Pipe Capacity:</strong> 5.0M bpd Abqaiq-Yanbu</p>
          <p className="text-slate-300"><strong className="text-slate-500">Cape Bypass:</strong> +14.2 Days ($3.80/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Carries crude across Saudi Arabia to Red Sea export berths.</p>
        </div>

        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 2: UAE ADCOP (Fujairah)</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Pipe Capacity:</strong> 1.5M bpd Habshan</p>
          <p className="text-slate-300"><strong className="text-slate-500">Oman Gulf:</strong> +2.1 Days ($1.20/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Loads VLCC tankers at Fujairah deepwater SPM buoys.</p>
        </div>

        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-amber-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 3: INSTC Eurasian Rail</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Rail Capacity:</strong> 0.8M bpd Max</p>
          <p className="text-slate-300"><strong className="text-slate-500">Land Bridge:</strong> +8.5 Days ($5.40/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Multimodal rail corridor via Bandar Abbas to Caspian Sea.</p>
        </div>

      </div>

    </div>
  );
}
