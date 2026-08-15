import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, ShieldAlert, Zap, Layers } from 'lucide-react';

// Fix leaflet marker default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordinates for Key Infrastructure Nodes
const INFRASTRUCTURE_NODES = [
  {
    id: 'hormuz',
    name: 'Strait of Hormuz (CHOKEPOINT LOCKOUT)',
    type: 'chokepoint',
    coords: [26.56, 56.25],
    status: '100% NAVAL LOCKOUT',
    color: '#ef4444',
    desc: 'Narrow 21 nautical mile chokepoint. 21.0M bpd global flow halted.'
  },
  {
    id: 'abqaiq',
    name: 'Abqaiq Crude Processing Complex',
    type: 'origin',
    coords: [25.93, 49.67],
    status: 'Operational Source',
    color: '#06b6d4',
    desc: 'World largest crude stabilization plant supplying Saudi Petroline.'
  },
  {
    id: 'yanbu',
    name: 'Yanbu Red Sea Crude Terminal',
    type: 'bypass',
    coords: [24.08, 38.06],
    status: '5.0M bpd Petroline Terminal',
    color: '#10b981',
    desc: 'Overland pipeline terminus on Red Sea. Bypasses Hormuz completely.'
  },
  {
    id: 'habshan',
    name: 'Habshan ADCOP Pipeline Head',
    type: 'origin',
    coords: [23.67, 53.71],
    status: 'Abu Dhabi Onshore Fields',
    color: '#06b6d4',
    desc: 'Feeds Abu Dhabi Crude Oil Pipeline (ADCOP).'
  },
  {
    id: 'fujairah',
    name: 'Fujairah Deepwater Berth',
    type: 'bypass',
    coords: [25.12, 56.36],
    status: '1.5M bpd ADCOP Terminus',
    color: '#10b981',
    desc: 'Direct Arabian Sea VLCC loading buoy outside Persian Gulf.'
  },
  {
    id: 'bandar_abbas',
    name: 'Bandar Abbas / INSTC Rail Hub',
    type: 'bypass',
    coords: [27.18, 56.28],
    status: '0.8M bpd Multimodal Rail',
    color: '#f59e0b',
    desc: 'ISO Containerized Tanker Rail to Caspian Sea & Baku.'
  },
  {
    id: 'jamnagar',
    name: 'Jamnagar / Sikka Refinery Hub (India)',
    type: 'destination',
    coords: [22.47, 70.06],
    status: '1.4M bpd Destination Demand',
    color: '#38bdf8',
    desc: 'Reliance & Nayara Energy mega refinery complexes.'
  },
  {
    id: 'ningbo',
    name: 'Ningbo-Zhoushan Port (China)',
    type: 'destination',
    coords: [29.86, 121.54],
    status: '6.8M bpd East Asia Hub',
    color: '#38bdf8',
    desc: 'Primary Chinese crude receiving terminal.'
  },
  {
    id: 'rotterdam',
    name: 'Port of Rotterdam (Netherlands)',
    type: 'destination',
    coords: [51.92, 4.47],
    status: '2.2M bpd European Hub',
    color: '#38bdf8',
    desc: 'ARA hub supplying European refineries.'
  }
];

// Route Polylines
const ROUTE_LINES = {
  petroline: [
    [25.93, 49.67], // Abqaiq
    [24.08, 38.06], // Yanbu Red Sea
    [12.50, 43.33], // Bab-el-Mandeb
    [-34.83, 20.00], // Cape of Good Hope
    [22.47, 70.06]  // Jamnagar
  ],
  fujairah: [
    [23.67, 53.71], // Habshan
    [25.12, 56.36], // Fujairah
    [20.00, 65.00], // Arabian Sea
    [22.47, 70.06]  // Jamnagar
  ],
  instc: [
    [27.18, 56.28], // Bandar Abbas
    [35.68, 51.38], // Tehran
    [40.40, 49.86], // Baku (Caspian)
    [46.34, 48.03]  // Astrakhan
  ]
};

export default function RouteMap({ activeRoute = 'alt1' }) {
  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    setMapMounted(true);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
      
      {/* Map Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Navigation className="h-5 w-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Interactive GIS Global Rerouting Map
            </h3>
            <p className="text-[11px] text-slate-400">
              Live Geographic Coordinates for Middle East Pipelines & Multimodal Corridors
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-300">
          <div className="flex items-center space-x-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Chokepoint</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Overland Pipeline</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span>INSTC Rail</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Box */}
      <div className="h-[420px] w-full rounded-xl overflow-hidden border border-slate-800/80 relative z-0">
        {mapMounted && (
          <MapContainer
            center={[25.0, 52.0]}
            zoom={4}
            scrollWheelZoom={false}
            className="h-full w-full bg-slate-950"
          >
            {/* Dark Mode Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Render Route Polylines */}
            <Polyline
              positions={ROUTE_LINES.petroline}
              pathOptions={{ color: '#10b981', weight: activeRoute === 'alt1' ? 4 : 2, dashArray: '8, 8', opacity: 0.8 }}
            />
            <Polyline
              positions={ROUTE_LINES.fujairah}
              pathOptions={{ color: '#06b6d4', weight: activeRoute === 'alt2' ? 4 : 2, opacity: 0.9 }}
            />
            <Polyline
              positions={ROUTE_LINES.instc}
              pathOptions={{ color: '#f59e0b', weight: activeRoute === 'alt3' ? 4 : 2, dashArray: '4, 4', opacity: 0.8 }}
            />

            {/* Render Nodes */}
            {INFRASTRUCTURE_NODES.map((node) => (
              <React.Fragment key={node.id}>
                <CircleMarker
                  center={node.coords}
                  radius={node.type === 'chokepoint' ? 12 : 8}
                  pathOptions={{
                    fillColor: node.color,
                    color: node.color,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-2 font-sans text-xs bg-slate-950 text-slate-100 rounded-lg max-w-xs border border-slate-800">
                      <strong className="text-cyan-400 block font-mono font-bold text-sm mb-1">
                        {node.name}
                      </strong>
                      <span className="inline-block bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 mb-1">
                        {node.status}
                      </span>
                      <p className="text-slate-300 text-[11px] leading-tight">
                        {node.desc}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            ))}
          </MapContainer>
        )}
      </div>

    </div>
  );
}
