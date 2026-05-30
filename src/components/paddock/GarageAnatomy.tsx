import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  DollarSign, 
  ShieldAlert, 
  Cpu, 
  Flame, 
  Activity, 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Info
} from 'lucide-react';
import { F1_TEAMS } from '../../data/f1Data';

interface CarSpec {
  teamId: string;
  carName: string;
  engineSupplier: string;
  engineModel: string;
  chassisCost: string;
  annualCrashRepairs: string;
  durabilityScore: number; // 0-100 indicating resistance/build quality
  aeroEfficiency: number; // 0-100
  powerUnitPerformance: number; // 0-100
  carbonFootprintDesc: string;
  activeAeroSystems: string[];
  components: {
    id: string;
    name: string;
    material: string;
    singleUnitCost: string;
    weightKg: number;
    failureRisk: 'Low' | 'Medium' | 'High';
    description: string;
  }[];
}

const CONSTRUCTOR_CAR_SPECS: CarSpec[] = [
  {
    teamId: 'mclaren',
    carName: 'MCL38 F1 Challenger',
    engineSupplier: 'Mercedes-AMG High Performance Powertrains',
    engineModel: 'Mercedes-AMG M15 E Performance V6 Turbo Hybrid',
    chassisCost: '$15,450,000',
    annualCrashRepairs: '$1,850,000 (Very Low)',
    durabilityScore: 92,
    aeroEfficiency: 98,
    powerUnitPerformance: 96,
    carbonFootprintDesc: 'Pre-preg carbon matrix cure with zero-autoclave resin infusing.',
    activeAeroSystems: ['Bernoulli Split Floor Venturi', 'Low-Drag Active DRS Plate', 'Outwash Front Endplate Stagger'],
    components: [
      { id: 'front-wing', name: 'High-Outwash Front Assembly', material: 'Nomex honeycomb carbon-fiber laminates', singleUnitCost: '$240,000', weightKg: 11.5, failureRisk: 'High', description: 'Deformable aerodynamically crucial structure. Controls air vortices passing down the sidepods. Highly vulnerable in close racing contact.' },
      { id: 'sidepods', name: 'Ultra-Slim Venturi Inlets', material: 'Spectra-wrapped aerospace carbon composite', singleUnitCost: '$165,000', weightKg: 8.2, failureRisk: 'Low', description: 'Sucks massive cold volumes straight to the central radiator. Features extremely slim aerodynamic coke-bottle waistlines.' },
      { id: 'power-unit', name: 'Mercedes-AMG V6 Core Block', material: 'Titanium-Aluminide single-cast block & high-nickel alloy headers', singleUnitCost: '$12,200,000', weightKg: 151, failureRisk: 'Low', description: 'Thermally unmatched V6 system harvesting exhaust energy through the MGU-H and kinetic energy via the MGU-K.' },
      { id: 'rear-wing', name: 'Bi-plane DRS Rear Assembly', material: 'Pre-preg unidirectional high-modulus fibers', singleUnitCost: '$125,000', weightKg: 9.8, failureRisk: 'Medium', description: 'Contains the high-pressure electro-hydraulic spoiler latch that opens by 85mm to dump drag on DRS straights.' }
    ]
  },
  {
    teamId: 'redbull',
    carName: 'RB22 Rocket Challenger',
    engineSupplier: 'Red Bull Ford Powertrains / Honda HRC',
    engineModel: 'Honda RBPTH002 1.6L Turbo-hybrid Kinetic Store',
    chassisCost: '$16,200,000',
    annualCrashRepairs: '$2,410,000 (Moderate)',
    durabilityScore: 89,
    aeroEfficiency: 99,
    powerUnitPerformance: 97,
    carbonFootprintDesc: 'Ultra-thin vacuum consolidated dry fibers with lightweight honeycomb core cores.',
    activeAeroSystems: ['Newey Venturi Air-curtain Channels', 'Wide-sweep Pitch-compensating Front Wing', 'Triple-gurney Flap Diffuser'],
    components: [
      { id: 'front-wing', name: 'S-Duct Flow-forming Nose Wing', material: 'Carbon composite matching core Nomex weave', singleUnitCost: '$260,000', weightKg: 12.0, failureRisk: 'High', description: 'Features custom-swept low-aspect air channels designed to guide smooth streams around front wheels.' },
      { id: 'sidepods', name: 'Horizontal Coanda Effect Sidepods', material: 'High-compaction autoclave carbon panels', singleUnitCost: '$180,000', weightKg: 7.9, failureRisk: 'Low', description: 'Directs fast boundary drafts downward using the physical Coanda phenomenon to seal the Underfloor suction.' },
      { id: 'power-unit', name: 'RBP-Honda Power Block Unit', material: 'Exclusive sintered powder-metallurgy metals and cobalt-steel turbine', singleUnitCost: '$12,500,000', weightKg: 150, failureRisk: 'Low', description: 'Legendary efficiency rating, harvesting up to 4MJ of electricity per lap with lightning fast kinetic recovery.' },
      { id: 'rear-wing', name: 'Extreme High-camber Rear Wing', material: 'Resilient woven graphite layers', singleUnitCost: '$135,000', weightKg: 10.1, failureRisk: 'Medium', description: 'Extremely aggressive angle of attack, balanced by a highly responsive DRS actuator system.' }
    ]
  },
  {
    teamId: 'ferrari',
    carName: 'SF-26 Prancing Challenger',
    engineSupplier: 'Scuderia Ferrari Powertrains',
    engineModel: 'Ferrari Type 066/12 Dual-Recovery Hybrid',
    chassisCost: '$15,800,000',
    annualCrashRepairs: '$3,120,000 (Relatively High)',
    durabilityScore: 85,
    aeroEfficiency: 95,
    powerUnitPerformance: 98,
    carbonFootprintDesc: 'Autoclave liquid pressure-molded carbon layouts using eco-resin matrix polymers.',
    activeAeroSystems: ['Inward Sidepod Wash channels', 'Vortex-shredding Rear Plate Actuator', 'Flexible Carbon Front Flap Slots'],
    components: [
      { id: 'front-wing', name: 'Tri-plane Vortex Deflector Wing', material: 'Vibration-damping carbon weave with Kevlar cords', singleUnitCost: '$255,000', weightKg: 11.2, failureRisk: 'High', description: 'Designed to bend ever so slightly under top-speed wind loads to shed drag, while remaining fully legal under deflection tests.' },
      { id: 'sidepods', name: 'In-wash Aerodynamic Bathtub Pods', material: 'Double-cure dry carbon weaves', singleUnitCost: '$170,000', weightKg: 8.5, failureRisk: 'Medium', description: 'Indents in the upper sidepod body funnel air directly onto the beam wing for outstanding high-speed stability.' },
      { id: 'power-unit', name: 'Maranello Type V6 Block', material: 'Zirconium-doped aluminum blocks and laser-sintered titanium valves', singleUnitCost: '$12,400,000', weightKg: 153, failureRisk: 'Medium', description: 'The absolute peak power champion in straight line deployment modes. Feeds heavy electric energy blocks to rear axels.' },
      { id: 'rear-wing', name: 'Spoon-profile Medium Downforce wing', material: 'Continuous tow carbon filament matrix strips', singleUnitCost: '$130,000', weightKg: 9.6, failureRisk: 'Low', description: 'Graceful curved profile reducing drag at center, maximizing grip at extreme cornering yaw angles.' }
    ]
  },
  {
    teamId: 'mercedes',
    carName: 'W17 E Performance Challenger',
    engineSupplier: 'Mercedes-AMG High Performance Powertrains',
    engineModel: 'Mercedes-AMG M15 E Performance V6 Turbo Hybrid',
    chassisCost: '$15,500,000',
    annualCrashRepairs: '$2,150,000 (Average)',
    durabilityScore: 94,
    aeroEfficiency: 94,
    powerUnitPerformance: 96,
    carbonFootprintDesc: 'Recycled-carbon continuous fibers aligned along high stress vectors.',
    activeAeroSystems: ['Floating Rear Wing DRS Actuator Pod', 'Z-shaped Flexi-floor Edges', 'Y250 Vortex Shaper Fins'],
    components: [
      { id: 'front-wing', name: 'Floating Element Front Structure', material: 'Toughened resin high-modulus carbon sheets', singleUnitCost: '$245,000', weightKg: 11.8, failureRisk: 'High', description: 'Features a unique detached innermost element to direct massive high speed air into front floor entrance points.' },
      { id: 'sidepods', name: 'Outwash Cocoon Sidepods', material: 'Honeycomb Nomex sandwich + impact-absorbing structure', singleUnitCost: '$160,000', weightKg: 8.4, failureRisk: 'Low', description: 'Incorporates robust side-impact spars inside a sleek contour designed to deflect wake away from rear tires.' },
      { id: 'power-unit', name: 'Mercedes-AMG M15 Hybrid Core', material: 'Cast alloy chambers with nickel-silicon plating', singleUnitCost: '$12,200,000', weightKg: 151, failureRisk: 'Low', description: 'High reliability index. Excellent continuous state-of-charge management through advanced battery-rack cells.' },
      { id: 'rear-wing', name: 'Anti-stall Serrated Flap Spoiler', material: 'Autoclave molded carbon with steel pivots', singleUnitCost: '$128,000', weightKg: 9.9, failureRisk: 'Low', description: 'Features small serrations along trailing edges that help sustain attachment flow during low-speed high angle modes.' }
    ]
  },
  {
    teamId: 'astonmartin',
    carName: 'AMR26 Greenwood Challenger',
    engineSupplier: 'Honda Racing Corporation (HRC)',
    engineModel: 'Honda RBP002 High-efficiency Performance Node',
    chassisCost: '$15,200,000',
    annualCrashRepairs: '$2,750,000 (Moderate)',
    durabilityScore: 91,
    aeroEfficiency: 92,
    powerUnitPerformance: 97,
    carbonFootprintDesc: 'Flax fiber sustainable composite patches inside outer fairing panels.',
    activeAeroSystems: ['Deep Sidepod Channels ("Water-Slides")', 'Sealed Venturi Skirt Simulator', 'Vane-controlled Front Brake Scoops'],
    components: [
      { id: 'front-wing', name: 'Rigid High-camber Loading Wing', material: 'Unidirectional high strength carbon matrix layers', singleUnitCost: '$238,000', weightKg: 12.1, failureRisk: 'High', description: 'Highly stable loading curve to secure extreme front tires bite upon slow corner entries.' },
      { id: 'sidepods', name: 'Deep Slide-channel Sidepods', material: 'Infused carbon laminate with aramid protective wrap', singleUnitCost: '$175,000', weightKg: 8.8, failureRisk: 'Medium', description: 'Features dramatic deep gully slides on the top face that redirect clean air straight into the diffuser top.' },
      { id: 'power-unit', name: 'Honda-HRC Racing V-Core', material: 'Cast monolithic magnesium-titanium alloys', singleUnitCost: '$12,500,000', weightKg: 151, failureRisk: 'Low', description: 'Highly efficient cooling specs. Operates effectively at higher thermo baselines to reduce overall radiator openings.' },
      { id: 'rear-wing', name: 'Active-DRS Pivot-arm Spoiler', material: 'Woven carbon fiber pre-preg layers', singleUnitCost: '$123,000', weightKg: 10.0, failureRisk: 'Medium', description: 'Double-linkage control arms that can close or open the main flap within a 15-millisecond window.' }
    ]
  },
  {
    teamId: 'alpine',
    carName: 'A526 Pink Lightning',
    engineSupplier: 'Alpine Renault Power Systems',
    engineModel: 'Renault E-Tech RE26 Turbo-kinetic Plant',
    chassisCost: '$14,900,000',
    annualCrashRepairs: '$3,480,000 (High)',
    durabilityScore: 78,
    aeroEfficiency: 90,
    powerUnitPerformance: 88,
    carbonFootprintDesc: 'Woven hybrid synthetic graphite sheets cured with high temperature epoxies.',
    activeAeroSystems: ['Coanda exhaust gas scavenge simulator', 'Low-profile floor seal lines', 'Variable-pitch front slot deflectors'],
    components: [
      { id: 'front-wing', name: 'Asymmetrical vortex-shredder front assembly', material: 'Standard hybrid carbon-Kevlar mix', singleUnitCost: '$230,000', weightKg: 12.6, failureRisk: 'High', description: 'Vulnerable design layout with wide outward-lying flaps. Prone to cracking on high kerb vibrations.' },
      { id: 'sidepods', name: 'Standard Ramp-style Sidepods', material: 'Pre-preg carbon fiber composite', singleUnitCost: '$155,000', weightKg: 9.1, failureRisk: 'High', description: 'Wide rear surface ramp to feed air towards the rear brakes. High cooling reliability but slight drag penalty.' },
      { id: 'power-unit', name: 'Renault E-Tech Kinetic Inverter', material: 'Heavy density cast aluminum and steel rotor systems', singleUnitCost: '$11,900,000', weightKg: 156, failureRisk: 'Medium', description: 'Features aggressive fuel injection pressures but historically suffers from high vibration wear indexes.' },
      { id: 'rear-wing', name: 'Narrow-aspect drag-reducing wing', material: 'Compressed carbon laminate lines', singleUnitCost: '$118,000', weightKg: 10.3, failureRisk: 'Medium', description: 'Compact span reducing straight-line drag, designed specifically to compensate for thermal powertrain gaps.' }
    ]
  },
  {
    teamId: 'williams',
    carName: 'FW48 Blue Heritage',
    engineSupplier: 'Mercedes-AMG High Performance Powertrains',
    engineModel: 'Mercedes-AMG M15 E Performance V6 Turbo Hybrid',
    chassisCost: '$15,100,000',
    annualCrashRepairs: '$2,980,000 (Moderate)',
    durabilityScore: 86,
    aeroEfficiency: 91,
    powerUnitPerformance: 96,
    carbonFootprintDesc: 'Continuous carbon fiber filaments wound on multi-axis pneumatic spindles.',
    activeAeroSystems: ['Aggressive straight-line low drag profiles', 'Rigid floor boundary fences', 'Active rear cooling exhaust gills'],
    components: [
      { id: 'front-wing', name: 'Low drag high velocity front assembly', material: 'Double pressure curing standard carbon fibers', singleUnitCost: '$235,000', weightKg: 12.2, failureRisk: 'High', description: 'Optimized for slipstreaming efficiency, trading slight cornering downforce for unmatched straight line acceleration.' },
      { id: 'sidepods', name: 'Compact side-sloped cooling pods', material: 'Lightweight honeycomb composite', singleUnitCost: '$159,000', weightKg: 8.6, failureRisk: 'Low', description: 'Tight packaging layout that minimizes drag and exposes more of the rear floor to active atmospheric streams.' },
      { id: 'power-unit', name: 'Mercedes-AMG M15 Power Unit', material: 'Sintered titanium elements and specialized cooling block', singleUnitCost: '$12,200,000', weightKg: 151, failureRisk: 'Low', description: 'Extremely dependable Mercedes powerplant outputting constant battery power and clean harvesting loops.' },
      { id: 'rear-wing', name: 'Low drag straightline rear spoiler', material: 'Toughened resin woven carbon filaments', singleUnitCost: '$120,000', weightKg: 10.1, failureRisk: 'Medium', description: 'Features highly aerodynamic elements suited for high velocity tracks like Monza or Spa-Francorchamps.' }
    ]
  }
];

export default function GarageAnatomy() {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('mclaren');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('front-wing');

  const teamCar = CONSTRUCTOR_CAR_SPECS.find(c => c.teamId === selectedTeamId) || CONSTRUCTOR_CAR_SPECS[0];
  const teamMeta = F1_TEAMS.find(t => t.id === selectedTeamId) || F1_TEAMS[0];
  const activeComponent = teamCar.components.find(comp => comp.id === selectedComponentId) || teamCar.components[0];

  return (
    <div className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-4 md:p-6 mb-6">
      {/* Header section with styling consistent with Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-5">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#E10600] uppercase tracking-widest block">Constructor Engineering & Garage Decks</span>
          <h3 className="text-xl md:text-2xl font-display font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#E10600]" /> Constructor Car Specs & Damage Center
          </h3>
        </div>
        <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900 flex items-center gap-2">
          <span>Active Regulations:</span>
          <span className="text-[#E10600] font-bold">135M COST CAP LIMITS</span>
        </div>
      </div>

      {/* STEP 1: HORIZONTAL INTERACTIVE TEAM PILL TRACK */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 pr-1 scrollbar-thin relative z-10">
        {F1_TEAMS.map((team) => {
          const isActive = team.id === selectedTeamId;
          const carData = CONSTRUCTOR_CAR_SPECS.find(c => c.teamId === team.id);
          return (
            <button
              key={team.id}
              onClick={() => {
                setSelectedTeamId(team.id);
              }}
              className="relative px-3.5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center gap-2 border bg-[#0e0e11] text-zinc-300 border-zinc-900 hover:border-zinc-800 overflow-hidden"
            >
              {isActive && (
                <motion.div
                  layoutId="activeGarageTeamGlow"
                  className="absolute inset-0 border"
                  style={{ borderColor: team.color, backgroundColor: `${team.color}15` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {/* Left Color Indicator Orb */}
              <span className="relative z-10 w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: team.color }} />
              <span className="relative z-10 text-zinc-100">{team.name.split(' ')[0]}</span>
              <span className="relative z-10 text-[10px] font-mono text-zinc-500 font-normal">({carData?.carName.split(' ')[0]})</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CAR SPEC OVERVIEW & HARDWARE Hotspots */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[350px] overflow-hidden">
            {/* Ambient circuit-grid background */}
            <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none" />
            
            {/* Diagnostic Glow Rings relative to selected team */}
            <div 
              className="absolute left-0 right-0 top-1/4 h-1 pointer-events-none transition-all duration-1000" 
              style={{ background: `linear-gradient(90deg, transparent, ${teamMeta.color}15, transparent)` }} 
            />
            <div 
              className="absolute left-0 right-0 top-3/4 h-1.5 pointer-events-none transition-all duration-1000" 
              style={{ background: `linear-gradient(90deg, transparent, ${teamMeta.color}10, transparent)` }} 
            />

            {/* Glowing active mode tag */}
            <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/60 px-2 py-1 rounded border border-zinc-800">
              [ CHALLENGER SPECS: {teamCar.carName.toUpperCase()} ]
            </div>

            {/* F1 CAR CHASSIS WIREFRAME SPECS */}
            <svg 
              viewBox="0 0 600 240" 
              className="w-full max-w-[500px] text-zinc-500 select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-500"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              {/* Aerodynamic Airflows Guide Paths */}
              <path d="M 10,120 Q 150,110 300,120 T 590,120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <path d="M 10,80 Q 200,90 300,105 T 590,110" stroke={`${teamMeta.color}25`} strokeWidth="1" />
              <path d="M 10,160 Q 200,150 300,135 T 590,130" stroke={`${teamMeta.color}20`} strokeWidth="1" />

              {/* F1 Car Body Assembly - Colored based on selected team color */}
              {/* Front Nose to Wing */}
              <path d="M 100,110 L 40,110 Q 30,110 25,120 Q 30,130 40,130 L 100,130 Z" stroke="#3f3f46" fill="#111115" />
              
              {/* Front Wing Assembly */}
              <rect 
                x="25" y="60" width="8" height="120" rx="2" 
                stroke={selectedComponentId === 'front-wing' ? teamMeta.color : '#52525b'} 
                strokeWidth={selectedComponentId === 'front-wing' ? 2 : 1.2}
                fill={selectedComponentId === 'front-wing' ? `${teamMeta.color}20` : '#09090c'} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedComponentId('front-wing')}
              />
              
              {/* Front Endplates */}
              <path d="M 22,58 L 32,60 L 30,75 L 20,73 Z" stroke="#3f3f46" fill="#0d0d12" />
              <path d="M 22,182 L 32,180 L 30,165 L 20,167 Z" stroke="#3f3f46" fill="#0d0d12" />

              {/* Front Suspension Wishbones */}
              <line x1="120" y1="120" x2="60" y2="50" stroke="#52525b" />
              <line x1="120" y1="120" x2="60" y2="190" stroke="#52525b" />

              {/* Front Wheels */}
              <rect x="35" y="24" width="44" height="28" rx="4" stroke="#52525b" strokeWidth="1" fill="#040405" />
              <rect x="35" y="188" width="44" height="28" rx="4" stroke="#52525b" strokeWidth="1" fill="#040405" />

              {/* Main Chassis Body Cockpit Area / Sidepods */}
              <path 
                d="M 100,110 Q 150,110 180,100 Q 220,105 280,105 Q 350,105 400,110 Q 430,95 480,105 L 500,112 L 500,128 L 480,135 Q 430,145 400,130 Q 350,135 280,135 Q 220,135 180,140 Q 150,130 100,130 Z" 
                stroke={selectedComponentId === 'sidepods' ? teamMeta.color : '#71717a'} 
                fill={selectedComponentId === 'sidepods' ? `${teamMeta.color}15` : '#09090c'} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedComponentId('sidepods')}
              />

              {/* Cockpit Halo / Induction Hoop */}
              <ellipse 
                cx="300" cy="120" rx="35" ry="16" 
                stroke={selectedComponentId === 'power-unit' ? teamMeta.color : '#3f3f46'} 
                strokeWidth={selectedComponentId === 'power-unit' ? 2 : 1}
                fill={selectedComponentId === 'power-unit' ? `${teamMeta.color}10` : 'none'}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedComponentId('power-unit')}
              />
              <path d="M 260,110 Q 280,120 290,120" stroke="#3f3f46" />
              <line x1="280" y1="120" x2="310" y2="120" stroke="#3f3f46" />

              {/* Engine Exhaust Pipe Outlet */}
              <line x1="470" y1="120" x2="520" y2="120" stroke={teamMeta.color} strokeWidth="2.5" />

              {/* Rear Wheels */}
              <rect x="454" y="14" width="48" height="34" rx="5" stroke="#52525b" fill="#040405" />
              <rect x="454" y="192" width="48" height="34" rx="5" stroke="#52525b" fill="#040405" />

              {/* Rear Wing Assembly - Highlightable */}
              <rect 
                x="520" y="65" width="22" height="110" rx="3" 
                stroke={selectedComponentId === 'rear-wing' ? teamMeta.color : '#4b5563'} 
                strokeWidth={selectedComponentId === 'rear-wing' ? 2 : 1.2}
                fill={selectedComponentId === 'rear-wing' ? `${teamMeta.color}25` : '#09090c'} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedComponentId('rear-wing')}
              />
              <path d="M 505,62 L 545,64" stroke="#52525b" />
              <path d="M 505,178 L 545,176" stroke="#52525b" />

              {/* Interactive SVG Radar Hotspots Overlay */}
              {[
                { id: 'front-wing', x: 28, y: 120, label: 'FRONT WING' },
                { id: 'sidepods', x: 230, y: 78, label: 'SIDEPODS' },
                { id: 'power-unit', x: 300, y: 120, label: 'ENGINE BAY' },
                { id: 'rear-wing', x: 531, y: 120, label: 'REAR SPOILER' }
              ].map(marker => {
                const isPartSelected = selectedComponentId === marker.id;
                return (
                  <g 
                    key={marker.id} 
                    className="cursor-pointer group"
                    onClick={() => setSelectedComponentId(marker.id)}
                  >
                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r={isPartSelected ? 12 : 6}
                      fill="none"
                      stroke={isPartSelected ? teamMeta.color : '#a1a1aa'}
                      strokeWidth={isPartSelected ? 2 : 1}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r="3"
                      fill={isPartSelected ? teamMeta.color : '#71717a'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Instruction tooltip overlay */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#E10600]" /> Click car sections above to inspect spec details
            </div>
          </div>

          {/* COMPONENT INSPECTOR SELECT BUTTON CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {teamCar.components.map((comp) => {
              const isSelected = selectedComponentId === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComponentId(comp.id)}
                  className={`relative p-3.5 rounded-xl border text-left transition-all duration-250 tracking-tight cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-transparent text-white'
                      : 'bg-black/30 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeComponentCardBg"
                      className="absolute inset-0 bg-zinc-900/90 shadow-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-[9px] font-mono font-bold block text-zinc-500 uppercase">INSPECT</span>
                  <span className="relative z-10 text-xs font-display font-semibold block uppercase max-w-full truncate">{comp.name.split(' ')[0]}</span>
                  <span className="relative z-10 text-[10px] font-mono block mt-1 font-bold animate-[pulse_3s_infinite]" style={{ color: isSelected ? teamMeta.color : '#888' }}>
                    {comp.singleUnitCost}
                  </span>
                  {isSelected && (
                    <motion.div 
                      layoutId="activeComponentEdge"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-t z-10"
                      style={{ backgroundColor: teamMeta.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL DECK & COMPONENT METRICS */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* 1. CHASSIS GENERAL SPECS BLOCK */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 md:p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block" style={{ color: teamMeta.color }}>
                  {teamMeta.fullName}
                </span>
                <span className="text-lg font-display font-black text-white uppercase italic tracking-tight">
                  {teamCar.carName}
                </span>
              </div>
              <div className="bg-zinc-900 px-2.5 py-1.5 rounded-xl border border-zinc-800 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-zinc-400 animate-spin-slow" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  {teamMeta.chassis}
                </span>
              </div>
            </div>

            {/* Quick Spec List */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-black/40 rounded-xl border border-zinc-900/60">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Chassis Build Cost</span>
                <span className="text-sm font-display font-bold text-emerald-400 flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  {teamCar.chassisCost}
                </span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-zinc-900/60">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Seasonal Crash Damage</span>
                <span className="text-xs font-display font-medium text-zinc-200">
                  {teamCar.annualCrashRepairs}
                </span>
              </div>
            </div>

            {/* Performance Gauges / Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 font-bold mb-1">
                  <span>AERO DOWNFORCE COEFFICIENT</span>
                  <span className="text-white">{teamCar.aeroEfficiency}%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    key={`${selectedTeamId}-aero`}
                    initial={{ width: 0 }}
                    animate={{ width: `${teamCar.aeroEfficiency}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: teamMeta.color }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 font-bold mb-1">
                  <span>HYBRID ENERGY RETURN (MGU)</span>
                  <span className="text-white">{teamCar.powerUnitPerformance}%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    key={`${selectedTeamId}-mgu`}
                    initial={{ width: 0 }}
                    animate={{ width: `${teamCar.powerUnitPerformance}%` }}
                    transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: teamMeta.color }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 font-bold mb-1">
                  <span>STRUCTURAL INTEGRITY RATING</span>
                  <span className="text-white">{teamCar.durabilityScore}%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    key={`${selectedTeamId}-durability`}
                    initial={{ width: 0 }}
                    animate={{ width: `${teamCar.durabilityScore}%` }}
                    transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: teamMeta.color }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. COMPONENT DEEP-DIVE DETAILS CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedComponentId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-black/50 border border-zinc-900 rounded-2xl p-5 space-y-4"
              style={{ borderLeftColor: teamMeta.color, borderLeftWidth: 3 }}
            >
              <div className="flex justify-between items-start pb-2 border-b border-zinc-900">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                    INSPECTED PART SPECS
                  </span>
                  <h4 className="text-md font-display font-bold text-white uppercase mt-0.5">
                    {activeComponent.name}
                  </h4>
                </div>
                {activeComponent.failureRisk === 'High' ? (
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-red-950 text-red-400 border border-red-900/60 font-bold uppercase">
                    High Collision Risk
                  </span>
                ) : activeComponent.failureRisk === 'Medium' ? (
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-amber-950 text-amber-400 border border-amber-900/60 font-bold uppercase">
                    Medium Wear Risk
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-920 text-emerald-400 border border-emerald-900/60 font-bold uppercase">
                    Stable Unit
                  </span>
                )}
              </div>

              {/* Component breakdown data */}
              <p className="text-zinc-300 text-xs leading-relaxed font-mono">
                {activeComponent.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
                <div className="bg-zinc-950/60 border border-zinc-900/60 p-2.5 rounded-xl">
                  <span className="text-[8px] text-zinc-500 block">Unit Replacement Cost</span>
                  <span className="text-zinc-100 font-bold font-sans">{activeComponent.singleUnitCost}</span>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-900/60 p-2.5 rounded-xl">
                  <span className="text-[8px] text-zinc-500 block">Chassis Added Weight</span>
                  <span className="text-zinc-100 font-bold font-sans">{activeComponent.weightKg} kg</span>
                </div>
                <div className="col-span-2 bg-zinc-950/60 border border-zinc-900/60 p-2.5 rounded-xl">
                  <span className="text-[8px] text-zinc-500 block">Aerospace Material Grade</span>
                  <span className="text-zinc-300 text-[10px] truncate max-w-full block" title={activeComponent.material}>
                    {activeComponent.material}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 3. ENGINE MANUFACTURER OVERLOOK */}
          <div className="bg-[#101014]/60 border border-zinc-900 rounded-2xl p-4 flex gap-3.5 items-center">
            <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-850 text-[#E10600]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-widest block">
                Power Unit Supplier
              </span>
              <span className="text-xs font-display font-semibold text-zinc-200 block leading-tight">
                {teamCar.engineSupplier}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                Model: <span className="text-zinc-300 font-bold">{teamCar.engineModel}</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
