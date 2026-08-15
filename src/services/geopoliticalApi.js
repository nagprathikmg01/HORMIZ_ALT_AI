// Geopolitical War Incident & Financial Crisis Data Service

export const LIVE_GEOPOLITICAL_INCIDENTS = [
  {
    id: 'inc-01',
    time: '08:42:10 IST',
    source: 'BBC News Verification',
    headline: 'Naval Mine Clearance Operations Initiated in Strait Narrow Channel',
    desc: 'Joint mine counter-measure taskforce deployed 14 nautical miles off Qeshm Island following asymmetric explosive hazard reports.',
    threatLevel: 'CRITICAL',
    impact: 'Commercial fleet transit refusal at 100%'
  },
  {
    id: 'inc-02',
    time: '08:35:00 IST',
    source: 'Reuters Energy',
    headline: 'Saudi Petroline Overland Throughput Escalated to 4.95M bpd',
    desc: 'Saudi Aramco activates emergency booster pumps at East-West Petroline pumping stations 3 and 6 to maximize Red Sea offloading at Yanbu.',
    threatLevel: 'HIGH',
    impact: 'Yanbu tanker berth congestion +48 hours'
  },
  {
    id: 'inc-03',
    time: '08:18:45 IST',
    source: 'Bloomberg Terminal',
    headline: 'Lloyds War Risk Surcharge Expands Across Entire Gulf of Oman',
    desc: 'Joint War Committee increases hull war-risk area boundaries, triggering mandatory $420,000 per voyage insurance surcharges for VLCCs.',
    threatLevel: 'HIGH',
    impact: 'Freight cost premium +$11.80/bbl'
  },
  {
    id: 'inc-04',
    time: '07:50:12 IST',
    source: 'Platts Global Energy',
    headline: 'UAE ADCOP Habshan Pipeline Operating at 100% Saturation',
    desc: 'Fujairah deepwater buoy berth 3 loaded 3 VLCCs in 24 hours. Pipeline pressure reaching physical safety ceiling at 1.5M bpd.',
    threatLevel: 'MEDIUM',
    impact: 'Zero unallocated capacity buffer'
  }
];

export const NEWS_BROADCAST_CHANNELS = [
  {
    id: 'bbc',
    channel: 'BBC News Channel',
    program: 'BBC World News: Middle East Energy Crisis Special',
    duration: '2:15',
    summary: 'BBC International Correspondent report on the 21M bpd Strait of Hormuz lockout, maritime insurance shocks, and European refinery crude shortages.',
    videoSrc: '/hormuz-pitch.mp4',
    poster: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bloomberg',
    channel: 'Bloomberg Television',
    program: 'Bloomberg Commodities: Global Oil Supply Shock & SPR Drawdown',
    duration: '3:05',
    summary: 'Analysis of oil futures spiking past $120/bbl, IEA 90-day emergency reserve releases, and VLCC spot charter rates hitting $250k/day.',
    videoSrc: '/hormuz-pitch.mp4',
    poster: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cnbc',
    channel: 'CNBC International',
    program: 'CNBC Squawk Box: Middle East Disruption & Alternative Multimodal Corridors',
    duration: '1:45',
    summary: 'Evaluating Saudi Petroline, UAE Habshan ADCOP, and INSTC Eurasian rail bypasses with global logistics heads.',
    videoSrc: '/hormuz-pitch.mp4',
    poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const SOVEREIGN_SPR_RESERVES = [
  { country: 'United States', code: 'US', sprMbbl: 345, daysRemaining: 68, maxDrawdownKbpd: 4400 },
  { country: 'China', code: 'CN', sprMbbl: 510, daysRemaining: 75, maxDrawdownKbpd: 6800 },
  { country: 'India', code: 'IN', sprMbbl: 39, daysRemaining: 28, maxDrawdownKbpd: 1400 },
  { country: 'Japan & S. Korea', code: 'JP/KR', sprMbbl: 185, daysRemaining: 82, maxDrawdownKbpd: 2200 },
  { country: 'European Union (IEA)', code: 'EU', sprMbbl: 290, daysRemaining: 90, maxDrawdownKbpd: 3200 }
];
