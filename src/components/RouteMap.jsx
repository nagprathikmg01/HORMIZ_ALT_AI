import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Polyline, 
  Popup, 
  CircleMarker, 
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
  Info
} from 'lucide-react';

// Fix Leaflet default icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to center/re-fit map bounds smoothly when route changes
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

  // Precise Geographic Coordinates for Middle East Energy Infrastructure
  const LOCATIONS = {
    hormuz: { lat: 26.56, lng: 56.25, name: 'Strait of Hormuz', type: 'Chokepoint', status: 'LOCKED (100% Mine Hazard)', throughput: '21.0M bpd (BLOCKED)', color: '#f43f5e' },
    abqaiq: { lat: 26.28, lng: 49.80, name: 'Abqaiq Processing Plant (Ghawar)', type: 'Supply Hub', status: 'ACTIVE', throughput: '7.0M bpd Capacity', color: '#3b82f6' },
    yanbu: { lat: 24.08, lng: 38.06, name: 'Yanbu Port (Red Sea)', type: 'Pipeline Terminal', status: 'ACTIVE (94% Load)', throughput: '5.0M bpd Rated', color: '#10b981' },
    habshan: { lat: 23.67, lng: 53.71, name: 'Habshan Oil Field (Abu Dhabi)', type: 'Supply Hub', status: 'ACTIVE', throughput: '1.5M bpd Capacity', color: '#3b82f6' },
    fujairah: { lat: 25.11, lng: 56.34, name: 'Fujairah Deepwater Terminal', type: 'Bypass Port', status: 'ACTIVE (100% Load)', throughput: '1.5M bpd Rated', color: '#10b981' },
    bandarAbbas: { lat: 27.18, lng: 56.27, name: 'Bandar Abbas INSTC Rail Terminal', type: 'Multimodal Hub', status: 'QUEUED (22 Trains)', throughput: '0.8M bpd Max Rail', color: '#f59e0b' },
    tehran: { lat: 35.68, lng: 51.38, name: 'Tehran INSTC Freight Junction', type: 'Rail Junction', status: 'ACTIVE', throughput: '0.8M bpd Transit', color: '#f59e0b' },
    astrakhan: { lat: 46.34, lng: 48.03, name: 'Astrakhan Caspian Sea Rail Terminal', type: 'Rail Terminal', status: 'ACTIVE', throughput: '0.8M bpd Destination', color: '#f59e0b' },
    jamnagar: { lat: 22.47, lng: 70.05, name: 'Jamnagar Mega Refinery (India)', type: 'Refinery Hub', status: 'ACTIVE', throughput: '1.24M bpd Refining Capacity', color: '#06b6d4' },
    ningbo: { lat: 29.86, lng: 121.54, name: 'Ningbo Petrochemical Hub (China)', type: 'Refinery Hub', status: 'ACTIVE', throughput: '1.60M bpd Refining Capacity', color: '#06b6d4' },
    rotterdam: { lat: 51.92, lng: 4.47, name: 'Rotterdam Energy Hub (EU)', type: 'Refinery Hub', status: 'ACTIVE', throughput: '1.40M bpd Refining Capacity', color: '#06b6d4' },
    capeGoodHope: { lat: -34.35, lng: 18.47, name: 'Cape of Good Hope Passage', type: 'Maritime Bypass', status: 'ACTIVE (+14 Days)', throughput: 'Unlimited Sea Lane', color: '#6366f1' },
    babElMandeb: { lat: 12.58, lng: 43.33, name: 'Bab-el-Mandeb Strait', type: 'Secondary Chokepoint', status: 'ELEVATED RISK', throughput: '4.8M bpd Flow', color: '#f97316' }
  };

  // Precise Polyline Coordinates for Alternative Corridors
  // Alt 1: Saudi East-West Petroline (Abqaiq -> Yanbu -> Red Sea -> Cape -> Jamnagar/Rotterdam)
  const petrolinePipe = [
    [LOCATIONS.abqaiq.lat, LOCATIONS.abqaiq.lng],
    [24.68, 46.72], // Riyadh Substation
    [LOCATIONS.yanbu.lat, LOCATIONS.yanbu.lng]
  ];

  const petrolineCapeSeaRoute = [
    [LOCATIONS.yanbu.lat, LOCATIONS.yanbu.lng],
    [LOCATIONS.babElMandeb.lat, LOCATIONS.babElMandeb.lng],
    [-11.95, 40.54], // Mozambique Channel
    [LOCATIONS.capeGoodHope.lat, LOCATIONS.capeGoodHope.lng],
    [-20.0, 60.0], // Indian Ocean Deep Sea Waypoint
    [LOCATIONS.jamnagar.lat, LOCATIONS.jamnagar.lng]
  ];

  // Alt 2: UAE ADCOP Pipeline (Habshan -> Fujairah -> Gulf of Oman -> Jamnagar)
  const adcopPipe = [
    [LOCATIONS.habshan.lat, LOCATIONS.habshan.lng],
    [24.20, 55.30], // Hajar Mountains Substation
    [LOCATIONS.fujairah.lat, LOCATIONS.fujairah.lng]
  ];

  const adcopSeaRoute = [
    [LOCATIONS.fujairah.lat, LOCATIONS.fujairah.lng],
    [22.50, 63.00], // Arabian Sea Waypoint
    [LOCATIONS.jamnagar.lat, LOCATIONS.jamnagar.lng]
  ];

  // Alt 3: INSTC Eurasian Rail Bridge (Bandar Abbas -> Tehran -> Astrakhan)
  const instcRailRoute = [
    [LOCATIONS.bandarAbbas.lat, LOCATIONS.bandarAbbas.lng],
    [32.65, 51.67], // Isfahan Junction
    [LOCATIONS.tehran.lat, LOCATIONS.tehran.lng],
    [37.28, 49.58], // Rasht Port
    [LOCATIONS.astrakhan.lat, LOCATIONS.astrakhan.lng]
  ];

  const mapCenter = activeRouteFilter === 'alt3' ? [35.0, 53.0] : [24.0, 55.0];
  const mapZoom = activeRouteFilter === 'alt3' ? 5 : 5;

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
              LIVE GIS TELEMETRY
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
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showPipelines}
              onChange={(e) => setShowPipelines(e.target.checked)}
              className="accent-emerald-500 rounded cursor-pointer"
            />
            <span className="flex items-center space-x-1">
              <span className="h-2 w-4 bg-emerald-500 rounded-full inline-block" />
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
            <span className="flex items-center space-x-1">
              <span className="h-2 w-4 bg-cyan-500 rounded-full inline-block" />
              <span>Cape/Deep Sea Lanes</span>
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer hover:text-white">
            <input
              type="checkbox"
              checked={showRail}
              onChange={(e) => setShowRail(e.target.checked)}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <span className="flex items-center space-x-1">
              <span className="h-2 w-4 bg-amber-500 rounded-full inline-block" />
              <span>INSTC Rail Network</span>
            </span>
          </label>
        </div>

        <div className="flex items-center space-x-2 text-rose-400">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          <span>Hormuz Lockout: 21.0M bpd Disrupted</span>
        </div>
      </div>

      {/* Main Leaflet GIS Map Canvas */}
      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950 shadow-inner">
        
        {mapMounted && (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', backgroundColor: '#090d16' }}
          >
            <MapViewController center={mapCenter} zoom={mapZoom} />

            {/* Dark CartoDB Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url={isDark 
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
              }
              maxZoom={18}
            />

            {/* ================= MAP OVERLAYS & POLYLINES ================= */}

            {/* Saudi Petroline Overland Pipeline (Alt 1) */}
            {showPipelines && (activeRouteFilter === 'all' || activeRouteFilter === 'alt1') && (
              <Polyline
                positions={petrolinePipe}
                pathOptions={{ color: '#10b981', weight: 4, opacity: 0.9, dashArray: '6, 6' }}
              >
                <Tooltip sticky>Saudi East-West Petroline Pipeline (5.0M bpd Capacity)</Tooltip>
              </Polyline>
            )}

            {/* Petroline Cape of Good Hope Sea Route */}
            {showSeaLanes && (activeRouteFilter === 'all' || activeRouteFilter === 'alt1') && (
              <Polyline
                positions={petrolineCapeSeaRoute}
                pathOptions={{ color: '#06b6d4', weight: 3, opacity: 0.8, dashArray: '8, 8' }}
              >
                <Tooltip sticky>Cape of Good Hope Tanker Bypass (+14.2 Transit Days)</Tooltip>
              </Polyline>
            )}

            {/* UAE ADCOP Pipeline (Alt 2) */}
            {showPipelines && (activeRouteFilter === 'all' || activeRouteFilter === 'alt2') && (
              <Polyline
                positions={adcopPipe}
                pathOptions={{ color: '#10b981', weight: 4, opacity: 0.9, dashArray: '6, 6' }}
              >
                <Tooltip sticky>UAE Habshan-Fujairah ADCOP Pipeline (1.5M bpd Capacity)</Tooltip>
              </Polyline>
            )}

            {/* ADCOP Fujairah Sea Route */}
            {showSeaLanes && (activeRouteFilter === 'all' || activeRouteFilter === 'alt2') && (
              <Polyline
                positions={adcopSeaRoute}
                pathOptions={{ color: '#06b6d4', weight: 3, opacity: 0.8 }}
              >
                <Tooltip sticky>Fujairah Deepwater Buoy to Jamnagar (Direct Gulf of Oman)</Tooltip>
              </Polyline>
            )}

            {/* INSTC Eurasian Rail Route (Alt 3) */}
            {showRail && (activeRouteFilter === 'all' || activeRouteFilter === 'alt3') && (
              <Polyline
                positions={instcRailRoute}
                pathOptions={{ color: '#f59e0b', weight: 4, opacity: 0.9, dashArray: '4, 8' }}
              >
                <Tooltip sticky>INSTC Eurasian Rail Corridor (0.8M bpd Max Capacity)</Tooltip>
              </Polyline>
            )}

            {/* ================= INTERACTIVE NODE MARKERS ================= */}
            {Object.entries(LOCATIONS).map(([key, loc]) => (
              <CircleMarker
                key={key}
                center={[loc.lat, loc.lng]}
                radius={key === 'hormuz' ? 14 : key === 'yanbu' || key === 'fujairah' ? 10 : 7}
                pathOptions={{
                  fillColor: loc.color,
                  color: '#ffffff',
                  weight: 2,
                  fillOpacity: 0.95
                }}
                eventHandlers={{
                  click: () => setSelectedNode(loc)
                }}
              >
                <Popup>
                  <div className="p-2 font-mono text-xs max-w-xs space-y-1 text-slate-900">
                    <div className="flex items-center space-x-1 border-b pb-1 font-bold text-sm">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span>{loc.name}</span>
                    </div>
                    <p><strong>Type:</strong> {loc.type}</p>
                    <p><strong>Status:</strong> <span className="text-emerald-700 font-bold">{loc.status}</span></p>
                    <p><strong>Throughput:</strong> {loc.throughput}</p>
                    <p className="text-[10px] text-slate-500 font-sans mt-1">Coordinates: {loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E</p>
                  </div>
                </Popup>
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={key === 'hormuz' || key === 'yanbu' || key === 'fujairah'}>
                  <span className="font-mono text-[11px] font-bold">{loc.name}</span>
                </Tooltip>
              </CircleMarker>
            ))}

          </MapContainer>
        )}

      </div>

      {/* Detailed Node Telemetry Card Below Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        
        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 1: Petroline Bypass</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Pipe Throughput:</strong> 5.0M bpd Yanbu</p>
          <p className="text-slate-300"><strong className="text-slate-500">Cape Transit:</strong> +14.2 Days ($3.80/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Bypasses Hormuz via Saudi Red Sea terminal.</p>
        </div>

        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 2: ADCOP Fujairah</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Pipe Throughput:</strong> 1.5M bpd Habshan</p>
          <p className="text-slate-300"><strong className="text-slate-500">Direct Oman Gulf:</strong> +2.1 Days ($1.20/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Loads VLCCs outside Strait in Oman Gulf.</p>
        </div>

        <div className={`p-4 rounded-xl border font-mono text-xs transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 text-amber-400 font-bold mb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alt 3: INSTC Caspian Rail</span>
          </div>
          <p className="text-slate-300"><strong className="text-slate-500">Rail Capacity:</strong> 0.8M bpd Max</p>
          <p className="text-slate-300"><strong className="text-slate-500">Land Bridge:</strong> +8.5 Days ($5.40/bbl)</p>
          <p className="text-slate-400 text-[11px] mt-1">Eurasian rail corridor via Bandar Abbas.</p>
        </div>

      </div>

    </div>
  );
}
