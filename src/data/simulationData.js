// Simulation heuristics and multimodal routing math model for HORMIZ-ALT AI

export const DESTINATIONS = [
  {
    id: 'india_west',
    name: 'India - West Coast Hubs',
    subtext: 'Jamnagar, Sikka & Vadinar Refineries (1.4M bpd demand)',
    baseDays: 4,
    baseCostBbl: 2.10,
    co2BaseTonnes: 120,
    priority: 'Critical SPR & Commercial Refinery Supply'
  },
  {
    id: 'east_asia',
    name: 'East Asia - Ningbo / Yokohama',
    subtext: 'Sinopec & ENEOS Energy Refineries (6.8M bpd demand)',
    baseDays: 14,
    baseCostBbl: 4.80,
    co2BaseTonnes: 380,
    priority: 'High Volume Long-Haul Strategic Crude'
  },
  {
    id: 'europe_rotterdam',
    name: 'Europe - Rotterdam / Wilhelmshaven',
    subtext: 'ARA Hub & Northern European Refineries (2.2M bpd demand)',
    baseDays: 22,
    baseCostBbl: 7.50,
    co2BaseTonnes: 540,
    priority: 'Diversified Crude API Blend'
  }
];

export const CRUDE_GRADES = [
  { id: 'arab_light', name: 'Arab Light (33.0° API, 1.9% S)', yieldEfficiency: 0.96, premiumFactor: 1.0 },
  { id: 'murban', name: 'Murban Light (40.2° API, 0.8% S)', yieldEfficiency: 0.99, premiumFactor: 1.15 },
  { id: 'basra_heavy', name: 'Basra Heavy (24.0° API, 3.8% S)', yieldEfficiency: 0.88, premiumFactor: 0.85 }
];

export const DISRUPTION_SCENARIOS = [
  { id: 'full_lockout', name: '100% Total Naval Lockout', riskIndex: 98, durationDays: 90, desc: 'Complete military blockade & sea-mine deployment in Strait narrow channel (21M bpd blocked).' },
  { id: 'mine_hazard', name: 'Asymmetric Mine Hazard', riskIndex: 74, durationDays: 30, desc: 'High insurance war-risk premiums ($400k/voyage), 65% commercial fleet refusal.' },
  { id: 'targeted_interdiction', name: 'Targeted Tanker Interdiction', riskIndex: 52, durationDays: 60, desc: 'Selective boarding & drone harassment, slowing transit times by 60%.' }
];

export function calculateRouteMetrics({
  durationDays = 60,
  targetMarket = 'india_west',
  volumeMbpd = 2.5,
  weights = { cost: 40, speed: 40, risk: 20 },
  crudeGrade = 'arab_light'
}) {
  const destObj = DESTINATIONS.find(d => d.id === targetMarket) || DESTINATIONS[0];
  const crudeObj = CRUDE_GRADES.find(c => c.id === crudeGrade) || CRUDE_GRADES[0];

  // Weight multipliers (0.5 to 1.5)
  const costW = (weights.cost || 40) / 40;
  const speedW = (weights.speed || 40) / 40;
  const riskW = (weights.risk || 20) / 20;

  // ROUTE 1: Saudi East-West Petroline (Abqaiq to Yanbu) + Red Sea / Cape Bypass
  const route1CapacityMbpd = 5.0;
  const r1Sat = Math.min(100, Math.round((volumeMbpd / route1CapacityMbpd) * 100));
  const r1TransitDays = Math.round(destObj.baseDays + 11 + (volumeMbpd > 3.5 ? 2 : 0));
  const r1FreightPremium = +(9.80 * crudeObj.premiumFactor + (r1Sat > 80 ? 2.4 : 0)).toFixed(2);
  const r1TotalCostBbl = +(destObj.baseCostBbl + r1FreightPremium).toFixed(2);
  const r1RiskIndex = 28;
  const r1CO2 = Math.round(destObj.co2BaseTonnes * 1.45);

  // ROUTE 2: Habshan-Fujairah ADCOP Pipeline Direct Arabian Sea Offloading
  const route2CapacityMbpd = 1.5;
  const r2Sat = Math.min(100, Math.round((volumeMbpd / route2CapacityMbpd) * 100));
  const r2TransitDays = Math.round(destObj.baseDays + 2 + (r2Sat > 90 ? 3 : 0));
  const r2FreightPremium = +(4.20 * crudeObj.premiumFactor + (r2Sat > 90 ? 3.8 : 0)).toFixed(2);
  const r2TotalCostBbl = +(destObj.baseCostBbl + r2FreightPremium).toFixed(2);
  const r2RiskIndex = 14;
  const r2CO2 = Math.round(destObj.co2BaseTonnes * 1.08);

  // ROUTE 3: INSTC Multimodal Corridor (Bandar Abbas / Caspian Rail)
  const route3CapacityMbpd = 0.8;
  const r3Sat = Math.min(100, Math.round((volumeMbpd / route3CapacityMbpd) * 100));
  const r3TransitDays = Math.round(destObj.baseDays + 8 + (r3Sat > 70 ? 4 : 0));
  const r3FreightPremium = +(14.60 * crudeObj.premiumFactor).toFixed(2);
  const r3TotalCostBbl = +(destObj.baseCostBbl + r3FreightPremium).toFixed(2);
  const r3RiskIndex = 58;
  const r3CO2 = Math.round(destObj.co2BaseTonnes * 1.70);

  // Calculate composite MILP Score (lower score is better, inverse displayed as efficiency score out of 100)
  const score1 = Math.max(10, Math.min(99, Math.round(100 - (r1TotalCostBbl * 2 * costW + r1TransitDays * 1.5 * speedW + r1RiskIndex * 0.4 * riskW))));
  const score2 = Math.max(10, Math.min(99, Math.round(100 - (r2TotalCostBbl * 2 * costW + r2TransitDays * 1.5 * speedW + r2RiskIndex * 0.4 * riskW))));
  const score3 = Math.max(10, Math.min(99, Math.round(100 - (r3TotalCostBbl * 2 * costW + r3TransitDays * 1.5 * speedW + r3RiskIndex * 0.4 * riskW))));

  // Total financial exposure over disruption duration
  const totalVolumeBarrels = volumeMbpd * 1000000 * durationDays;
  const unmitigatedLossM = Math.round((totalVolumeBarrels * 42.50) / 1000000); // $42.50 price shock per bbl
  const mitigatedCostM1 = Math.round((totalVolumeBarrels * r1TotalCostBbl) / 1000000);
  const netSavingsM = Math.round(unmitigatedLossM - mitigatedCostM1);

  return {
    destination: destObj,
    crude: crudeObj,
    totalVolumeBarrels,
    unmitigatedLossM,
    netSavingsM,
    routes: [
      {
        id: 'alt1',
        name: 'Saudi East-West Petroline (Yanbu Red Sea)',
        tagline: '5.0M bpd Overland Pipeline + Cape Bypass Tankers',
        transitDays: r1TransitDays,
        transitDelta: `+${r1TransitDays - destObj.baseDays} Days`,
        freightPremium: r1FreightPremium,
        totalCostBbl: r1TotalCostBbl,
        capacityMbpd: route1CapacityMbpd,
        capacityUtilization: r1Sat,
        riskIndex: r1RiskIndex,
        co2Tonnes: r1CO2,
        optimalityScore: score1,
        status: r1Sat > 90 ? 'High Congestion' : 'Optimal Path',
        statusColor: r1Sat > 90 ? 'amber' : 'emerald',
        badge: 'Primary Overland Bypass',
        chokepointBypassed: 'Strait of Hormuz (100%)',
        highlights: [
          'Direct pipe connection from Abqaiq to Red Sea terminal (Yanbu)',
          'Requires Cape of Good Hope voyage for East Asia destinations',
          'Absorbs ~24% of missing Strait flow'
        ]
      },
      {
        id: 'alt2',
        name: 'Fujairah ADCOP Deepwater Offloading',
        tagline: '1.5M bpd Habshan Pipeline Direct to Arabian Sea',
        transitDays: r2TransitDays,
        transitDelta: `+${r2TransitDays - destObj.baseDays} Days`,
        freightPremium: r2FreightPremium,
        totalCostBbl: r2TotalCostBbl,
        capacityMbpd: route2CapacityMbpd,
        capacityUtilization: r2Sat,
        riskIndex: r2RiskIndex,
        co2Tonnes: r2CO2,
        optimalityScore: score2,
        status: r2Sat >= 100 ? 'Saturated Ceiling' : 'Fastest Delivery',
        statusColor: r2Sat >= 100 ? 'crimson' : 'cyan',
        badge: 'Lowest Risk Corridor',
        chokepointBypassed: 'Strait Entrance & Persian Gulf',
        highlights: [
          'Zero exposure to Persian Gulf naval threats',
          'Ultra-fast VLCC loading at Fujairah deepwater buoy',
          'Strict 1.5M bpd physical pipeline bottleneck'
        ]
      },
      {
        id: 'alt3',
        name: 'INSTC Multimodal Eurasian Land-Bridge',
        tagline: '0.8M bpd Bandar Abbas → Caspian Rail & Intermodal',
        transitDays: r3TransitDays,
        transitDelta: `+${r3TransitDays - destObj.baseDays} Days`,
        freightPremium: r3FreightPremium,
        totalCostBbl: r3TotalCostBbl,
        capacityMbpd: route3CapacityMbpd,
        capacityUtilization: r3Sat,
        riskIndex: r3RiskIndex,
        co2Tonnes: r3CO2,
        optimalityScore: score3,
        status: 'Strategic Fallback',
        statusColor: 'amber',
        badge: 'Eurasian Land Route',
        chokepointBypassed: 'Maritime Gulf & Indian Ocean',
        highlights: [
          'ISO Tanker Containerized Rail Freight via Baku/Astrakhan',
          'Higher freight cost per bbl ($14.60/bbl premium)',
          'Complex customs & sanctions compliance verification'
        ]
      }
    ]
  };
}

export const ARCHITECTURE_NODES = [
  {
    step: '01',
    title: 'Multi-Sensor Data Ingestion',
    subtitle: 'AIS Telemetry, War-Risk Insurance & Platts Oil Pricing',
    tech: 'Kafka Streaming • Spire AIS • S&P Platts API',
    desc: 'Aggregates real-time transponder data for 1,400+ oil tankers in the Indian Ocean, live military threat alerts, pipeline pressure sensors, and crude futures order books.',
    metrics: '12.4M msgs/sec • 99.99% Uptime'
  },
  {
    step: '02',
    title: 'Vector Graph Memory & Neural Net',
    subtitle: 'Spatio-Temporal Graph Neural Network (GNN)',
    tech: 'PyTorch Geometric • Qdrant Vector Store',
    desc: 'Models global maritime supply routes as dynamic graph nodes. Predicts port congestion, naval blockade risks, and tanker speed slowdowns 72 hours before physical occurrence.',
    metrics: '48k Graph Nodes • 14ms Inference'
  },
  {
    step: '03',
    title: 'MILP Route Optimization Engine',
    subtitle: 'Mixed Integer Linear Programming Flow Optimizer',
    tech: 'OR-Tools • SCIP Solver • Custom Heuristics',
    desc: 'Solves minimum-cost multi-commodity network flow problems subject to hard physical constraints (pipeline diameter, VLCC berth limits, SPR minimum reserves).',
    metrics: '2,400 Variables • 99.4% Optimality'
  },
  {
    step: '04',
    title: 'Automated Procurement & Enterprise ERP Action',
    subtitle: 'SAP / Oracle S/4HANA Webhook Trigger & LLM Briefing',
    tech: 'Enterprise Webhooks • LLM Synthesizer',
    desc: 'Translates math outputs into automated SAP purchase orders, hedges crude futures on NYMEX/ICE, and generates executive CPO briefing memos.',
    metrics: '< 180ms Webhook Dispatch'
  }
];

export const VULNERABILITIES = [
  {
    id: 'pipe_ceiling',
    title: 'Overland Pipeline Capacity Ceiling',
    subtitle: 'Physical Bottleneck: 6.5M bpd Max Bypass Capacity vs 21M bpd Strait Flow',
    severity: 'High Impact',
    severityColor: 'crimson',
    details: 'Combined overland bypass pipelines (Saudi Petroline 5.0M bpd + UAE ADCOP 1.5M bpd) can only absorb ~31% of normal Strait flow. The remaining ~14.5M bpd cannot be rerouted overland and requires strategic petroleum reserve (SPR) releases or demand destruction.',
    mitigation: 'Demands immediate 90-day SPR release protocol coordination among IEA member nations.'
  },
  {
    id: 'vlcc_deficit',
    title: 'Supertanker (VLCC) Global Charter Deficit',
    subtitle: 'Fleet Capacity: +14-Day Cape Bypass Voyage Increases Required Fleet by 38%',
    severity: 'High Impact',
    severityColor: 'crimson',
    details: 'Routing Middle Eastern oil around the Cape of Good Hope adds 10 to 14 days per round trip. This ties up tankers for much longer periods, creating a sudden global shortage of 200,000+ DWT Very Large Crude Carriers (VLCCs) and driving charter rates to record highs (>$250,000/day).',
    mitigation: 'Dynamic spot charter pre-hedging and conversion of clean product tankers to dirty crude service.'
  },
  {
    id: 'cascading_chokepoint',
    title: 'Cascading Red Sea / Bab-el-Mandeb Threat',
    subtitle: 'Secondary Bottleneck: Petroline Offloading at Yanbu Exposes Fleet to Red Sea Risks',
    severity: 'Medium-High Impact',
    severityColor: 'amber',
    details: 'Rerouting crude via Petroline to Yanbu (Red Sea) avoids Hormuz, but ships sailing south out of the Red Sea must pass Bab-el-Mandeb, exposing them to secondary naval drone and missile interdiction hazards.',
    mitigation: 'Directing Asia-bound tankers out of Yanbu south under naval escort, or northbound via Suez Canal to Mediterranean terminals.'
  },
  {
    id: 'crude_mismatch',
    title: 'Refinery Crude API & Sulfur Gravity Mismatches',
    subtitle: 'Quality Bottleneck: Not All Refineries Can Process Heavy Basra or Light Murban',
    severity: 'Medium Impact',
    severityColor: 'amber',
    details: 'Sophisticated hydrocracking refineries configured specifically for Arab Light cannot seamlessly switch to heavy sour or ultra-light condensate without throughput penalties (10-15% yield loss).',
    mitigation: 'AI-assisted crude blending optimization at Fujairah and Yanbu tank farms before tanker loading.'
  }
];
