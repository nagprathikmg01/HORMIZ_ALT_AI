import React, { useState } from 'react';
import { X, Database, Copy, Check, Server, Table, Code2, ShieldCheck, Sparkles } from 'lucide-react';

export default function DatabaseSchemaModal({ isOpen, onClose, theme = 'dark' }) {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const sqlDDL = `-- Relational Schema: Maritime Energy Flow & Strategic Procurement Graph
CREATE TABLE chokepoint_nodes (
    node_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_name VARCHAR(100) NOT NULL, -- e.g., 'Strait of Hormuz', 'Yanbu Terminal', 'Fujairah ADCOP'
    node_type VARCHAR(50) NOT NULL, -- 'STRAIT', 'PIPELINE_PORT', 'RAIL_TERMINAL'
    coordinates POINT NOT NULL,
    max_throughput_bpd NUMERIC(12, 2) NOT NULL, -- e.g., 5000000.00
    current_status VARCHAR(30) DEFAULT 'ACTIVE', -- 'BLOCKED', 'RESTRICTED', 'CLEAR'
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE multimodal_corridors (
    corridor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node UUID REFERENCES chokepoint_nodes(node_id),
    target_node UUID REFERENCES chokepoint_nodes(node_id),
    transit_mode VARCHAR(50) NOT NULL, -- 'VLCC_SEA', 'OVERLAND_PIPELINE', 'INSTC_RAIL'
    base_transit_days INT NOT NULL,
    freight_cost_per_bbl NUMERIC(8, 2) NOT NULL,
    war_risk_surcharge NUMERIC(10, 2) DEFAULT 0.00,
    carbon_delta_kg_per_bbl NUMERIC(6, 2)
);

CREATE TABLE enterprise_reroute_orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enterprise_cpo_id VARCHAR(100) NOT NULL,
    refinery_destination VARCHAR(100) NOT NULL, -- e.g., 'Jamnagar Refinery', 'Ningbo Petrochemical'
    crude_grade VARCHAR(50) NOT NULL, -- 'ARAB_LIGHT', 'BASRAH_MEDIUM', 'DUBAI_SOUR'
    volume_bpd NUMERIC(12, 2) NOT NULL,
    selected_corridor_id UUID REFERENCES multimodal_corridors(corridor_id),
    sap_s4hana_po_reference VARCHAR(100) UNIQUE,
    hedging_future_ticker VARCHAR(50), -- e.g., 'ICE_BRENT_DEC26'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlDDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`rounded-2xl border w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] transition-colors ${
        isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-4 px-6 border-b ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center">
              <Database className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono uppercase tracking-wider">
                PostgreSQL / PostGIS Relational Schema DDL
              </h3>
              <p className="text-xs text-slate-400">
                Maritime Energy Flow Graph & Enterprise SAP S/4HANA Reroute Orders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs leading-relaxed space-y-5 flex-1">
          
          {/* Tables Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center space-x-2 text-sky-500 font-bold mb-1">
                <Table className="h-4 w-4" />
                <span>chokepoint_nodes</span>
              </div>
              <p className="text-[11px] text-slate-400">PostGIS POINT coordinates, max throughput bpd ceilings, and active status.</p>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center space-x-2 text-emerald-500 font-bold mb-1">
                <Table className="h-4 w-4" />
                <span>multimodal_corridors</span>
              </div>
              <p className="text-[11px] text-slate-400">Source/target FKs, transit mode, base days, freight $/bbl & war risk surcharges.</p>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center space-x-2 text-amber-500 font-bold mb-1">
                <Table className="h-4 w-4" />
                <span>enterprise_reroute_orders</span>
              </div>
              <p className="text-[11px] text-slate-400">Idempotent SAP S/4HANA PO references, crude grade blends & ICE futures tickers.</p>
            </div>
          </div>

          {/* DDL Code Block */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 shadow-inner overflow-x-auto">
            <pre className="text-[11.5px] font-mono whitespace-pre text-sky-300">
              {sqlDDL}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 px-6 border-t flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>3 Foreign-Key Constraints • UUID v4 Primary Keys</span>
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-700 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
              <span>{copied ? 'Copied DDL' : 'Copy SQL DDL'}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-sm"
            >
              Close Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
