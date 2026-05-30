import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Trophy, Navigation, Compass, Star, Zap } from 'lucide-react';

interface SectorPoint {
  id: string;
  name: string;
  type: 'speed_trap' | 'braking' | 'drs' | 'corner' | 'overtake';
  gear: string;
  speed: string;
  lateralG: string;
  historicalStory: string;
}

interface Circuit {
  id: string;
  name: string;
  location: string;
  length: string;
  laps: number;
  svgPath: string; // F1 Track trajectory path representation
  width: number;
  height: number;
  points: SectorPoint[];
}

const CIRCUITS: Circuit[] = [
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    location: 'Monza, Italy - "The Temple of Speed"',
    length: '5.793 km',
    laps: 53,
    svgPath: 'M 50,40 L 450,40 Q 480,45 500,70 L 530,110 Q 550,140 520,165 L 450,200 Q 420,210 390,190 L 340,160 Q 320,150 280,160 L 220,180 Q 200,195 170,185 L 120,135 Q 105,115 110,95 Q 115,75 100,65 L 70,55 Q 50,45 50,40 Z',
    width: 600,
    height: 250,
    points: [
      {
        id: 'prima_variante',
        name: 'Variante del Rettifilo (Turn 1 & 2)',
        type: 'braking',
        gear: 'Gear 1',
        speed: '75 km/h',
        lateralG: '-5.4G Decel',
        historicalStory: 'Monza\'s absolute heaviest braking zone. Cars scream down the main straight at 350+ km/h before hammering the carbon disks. In 2021, this was the scene of the dramatic collision where Max Verstappen\'s Red Bull climbed over Lewis Hamilton\'s halo element.'
      },
      {
        id: 'curva_grande',
        name: 'Curva Grande (Turn 3)',
        type: 'speed_trap',
        gear: 'Gear 8',
        speed: '312 km/h',
        lateralG: '3.8G Lateral',
        historicalStory: 'A sweeping, flat-out paradise of speed. Aerodynamic downforce holds the cars glued to the asphalt. Drivers must commit fully through the long curvature, holding a pristine tight line to maximize entry into the Roggia chicane.'
      },
      {
        id: 'ascari',
        name: 'Variante Ascari (Turns 8, 9 & 10)',
        type: 'corner',
        gear: 'Gear 5',
        speed: '205 km/h',
        lateralG: '4.2G Lateral',
        historicalStory: 'Named after the legendary double champion Alberto Ascari. High-speed chicane requires aggressive kerb-riding. Managing the weight transfers on entries and high-gear stabilization during exit creates immediate overtake flows onto the back straight.'
      },
      {
        id: 'parabolica',
        name: 'Curva Alboreto (Parabolica) (Turn 11)',
        type: 'drs',
        gear: 'Gear 7',
        speed: '260 km/h',
        lateralG: '4.5G Lateral',
        historicalStory: 'The final infinite loop corner opening back onto the pit straight. Getting a powerful, early exit in third sector DRS zones is crucial. Named in honor of Michele Alboreto, it requires absolute geometric accuracy to minimize drift.'
      }
    ]
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    location: 'Stavelot, Belgium - "Majestic Ardennes"',
    length: '7.004 km',
    laps: 44,
    svgPath: 'M 80,180 Q 90,120 120,110 L 170,115 Q 195,115 210,135 L 260,180 Q 285,200 320,195 L 390,175 Q 430,165 440,140 L 460,100 Q 470,80 440,75 L 390,75 Q 360,75 340,60 L 305,35 Q 280,20 250,45 L 180,100 L 140,110 L 105,100 Q 80,105 70,125 L 50,150 Q 40,170 80,180 Z',
    width: 600,
    height: 250,
    points: [
      {
        id: 'la_source',
        name: 'La Source (Turn 1 Hairpin)',
        type: 'braking',
        gear: 'Gear 1',
        speed: '80 km/h',
        lateralG: '-4.6G Decel',
        historicalStory: 'A tight first-corner hairpin at the bottom of the start straight. Classic staging area for multi-car first-lap pinball incidents. If survived, drivers punch the accelerator to generate immense slipstream torque down the valley.'
      },
      {
        id: 'eau_rouge',
        name: 'Eau Rouge & Raidillon (Turns 2, 3 & 4)',
        type: 'corner',
        gear: 'Gear 8',
        speed: '308 km/h',
        lateralG: '4.8G Compression',
        historicalStory: 'The most legendary, spine-tingling corner sweep in global racing. Cars plunge into a sudden valley crossing, compressing the suspension completely before flicking blind through the crested Raidillon apex. Requires total open-throttle belief!'
      },
      {
        id: 'kemmel',
        name: 'Kemmel Straight DRS Drive',
        type: 'drs',
        gear: 'Gear 8',
        speed: '345 km/h',
        lateralG: '0G Decel',
        historicalStory: 'Spa\'s primary overtaking straight. The scene of the spectacular three-wide pass in 2000 where Mika Häkkinen squeezed past Michael Schumacher around the outside whilst simultaneously lapping Ricardo Zonta\'s BAR Honda in the middle!'
      },
      {
        id: 'pouhon',
        name: 'Pouhon (Turn 10)',
        type: 'corner',
        gear: 'Gear 6',
        speed: '275 km/h',
        lateralG: '5.1G Lateral',
        historicalStory: 'A double-apex, downhill left-hander. One of the single greatest structural tests of neck strength and aerodynamic boundary layout on the grid. Drivers rely heavily on front axle bite to prevent massive steering slide off-track.'
      }
    ]
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    location: 'Monte Carlo - "The Ultimate Tightrope"',
    length: '3.337 km',
    laps: 78,
    svgPath: 'M 50,120 L 150,120 Q 180,125 190,110 L 220,60 Q 235,40 260,65 L 290,100 L 330,110 Q 360,115 350,135 Q 340,155 315,160 L 250,162 Q 220,160 210,185 L 195,210 Q 185,225 160,215 L 120,195 Q 95,190 90,165 L 85,150 L 50,140 Z',
    width: 600,
    height: 250,
    points: [
      {
        id: 'sainte_devote',
        name: 'Sainte Dévote (Turn 1)',
        type: 'braking',
        gear: 'Gear 2',
        speed: '110 km/h',
        lateralG: '-3.8G Decel',
        historicalStory: 'Monaco\'s terrifying first corner. Drivers brake hard over bumps and visual track crown divides before aiming right next to the historic stone church. Run-offs are virtually non-existent, punishing locking brakes immediately.'
      },
      {
        id: 'hairpin',
        name: 'Grand Hotel Hairpin (Turn 6)',
        type: 'corner',
        gear: 'Gear 1',
        speed: '47 km/h',
        lateralG: '1.2G Lateral',
        historicalStory: 'The slowest, tightest cornerback in all of Formula 1. Drivers must fully cross-lock and turn the steering wheel past normal locks, occasionally requiring custom-machined suspension assemblies specifically for this single Monégasque event.'
      },
      {
        id: 'tunnel',
        name: 'The Yacht Club Tunnel Sector',
        type: 'speed_trap',
        gear: 'Gear 8',
        speed: '290 km/h',
        lateralG: '2.5G Lateral',
        historicalStory: 'A curving dark acceleration tunnel underneath the Fairmont Hotel. Shifting from blind darkness into blinding Mediterranean sunlight while accelerating flat out creates high-stress visors triggers. Engines echo flat-out sound waves.'
      },
      {
        id: 'swimming_pool',
        name: 'Louis Chiron (Swimming Pool) (Turns 13 & 14)',
        type: 'corner',
        gear: 'Gear 6',
        speed: '215 km/h',
        lateralG: '4.6G Lateral',
        historicalStory: 'A blind-apex, hyper-fast chicane wrapping around the harbor swimming pool. Drivers routinely clip structural crash barriers on the entry apex at 200+ km/h. To watch modern wide cars fly through this chicane is pure visual theater.'
      }
    ]
  }
];

export default function CircuitMaps() {
  const [activeCircuitId, setActiveCircuitId] = useState<string>('monza');
  const [activePointId, setActivePointId] = useState<string>('prima_variante');

  const circuit = CIRCUITS.find(c => c.id === activeCircuitId) || CIRCUITS[0];
  const point = circuit.points.find(p => p.id === activePointId) || circuit.points[0];

  const handleCircuitChange = (id: string) => {
    setActiveCircuitId(id);
    const newCircuit = CIRCUITS.find(c => c.id === id);
    if (newCircuit && newCircuit.points.length > 0) {
      setActivePointId(newCircuit.points[0].id);
    }
  };

  return (
    <div className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-4 md:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">Interactive Track Analyzer</span>
          <h3 className="text-xl md:text-2xl font-display font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400 animate-[spin_5s_linear_infinite]" /> Interactive Vector Circuit Maps
          </h3>
        </div>

        {/* Circuit toggles */}
        {/* Circuit toggles */}
        <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-zinc-900 overflow-x-auto relative">
          {CIRCUITS.map(c => {
            const isActive = c.id === activeCircuitId;
            return (
              <button
                key={c.id}
                onClick={() => handleCircuitChange(c.id)}
                className={`relative px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMapTabOverlay"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/25 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* VECTOR TRACK MAP SVG SCREEN */}
        <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
          {/* Subtle grid lining */}
          <div className="absolute inset-0 carbon-grid opacity-15 pointer-events-none" />
          
          <div className="flex justify-between items-start text-xs font-mono text-zinc-500 z-10">
            <div>
              <span className="text-emerald-400 font-extrabold block">MAP: {circuit.name}</span>
              <span className="text-[10px]">{circuit.location}</span>
            </div>
            <div className="text-right text-[10px]">
              <span className="block">LENGTH: {circuit.length}</span>
              <span>RACE LAPS: {circuit.laps}</span>
            </div>
          </div>

          {/* Interactive SVG path render */}
          <div className="flex justify-center items-center py-6">
            <svg 
              viewBox={`0 0 ${circuit.width} ${circuit.height}`} 
              className="w-full max-w-[550px] drop-shadow-[0_0_25px_rgba(16,185,129,0.08)] select-none"
              fill="none" 
              stroke="currentColor" 
            >
              {/* Subtle back baseline shadow vector */}
              <path 
                d={circuit.svgPath} 
                stroke="#18181b" 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Main glowing Track lane */}
              <motion.path 
                d={circuit.svgPath} 
                stroke="rgba(16,185,129,0.3)" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              <path 
                d={circuit.svgPath} 
                stroke="#3f3f46" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Highlight active trajectory points */}
              {circuit.points.map((pt, idx) => {
                const isActive = pt.id === activePointId;
                // Calculate illustrative coordinate placements based on index to spread them nicely on circuit SVG dimensions
                let xCoord = 100;
                let yCoord = 100;

                if (circuit.id === 'monza') {
                  const coords = [[70, 50], [250, 40], [315, 175], [520, 110]];
                  xCoord = coords[idx][0];
                  yCoord = coords[idx][1];
                } else if (circuit.id === 'spa') {
                  const coords = [[85, 115], [130, 112], [280, 195], [375, 75]];
                  xCoord = coords[idx][0];
                  yCoord = coords[idx][1];
                } else { // Monaco
                  const coords = [[140, 120], [260, 65], [345, 115], [180, 215]];
                  xCoord = coords[idx][0];
                  yCoord = coords[idx][1];
                }

                return (
                  <g 
                    key={pt.id} 
                    className="cursor-pointer"
                    onClick={() => setActivePointId(pt.id)}
                  >
                    {isActive && (
                      <motion.circle
                        cx={xCoord}
                        cy={yCoord}
                        r="18"
                        stroke="#10b981"
                        strokeWidth="1"
                        fill="none"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          ease: "easeOut"
                        }}
                      />
                    )}
                    <circle 
                      cx={xCoord} 
                      cy={yCoord} 
                      r={isActive ? 10 : 7} 
                      fill={isActive ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.6)'} 
                      stroke={isActive ? '#10b981' : '#a1a1aa'} 
                      strokeWidth={isActive ? 2 : 1}
                    />
                    <circle 
                      cx={xCoord} 
                      cy={yCoord} 
                      r="3" 
                      fill={isActive ? '#10b981' : '#71717a'} 
                    />
                    <text 
                      x={xCoord + 12} 
                      y={yCoord + 4} 
                      fill={isActive ? '#10b981' : '#71717a'} 
                      fontSize="8" 
                      fontWeight="bold" 
                      fontFamily="monospace"
                      className="opacity-70 group-hover:opacity-100"
                    >
                      S{idx+1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex gap-2 items-center text-[10px] text-zinc-500 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Select points (S1-S4) directly on vector map bounds to capture live turn telemetries.</span>
          </div>
        </div>

        {/* DETAIL PANEL & HIGHLIGHT STORIES */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">TELEMETRY DECK RECOVERY</span>
            
            {/* Active Point Selector Menu */}
            <div className="grid grid-cols-2 gap-2">
              {circuit.points.map((pt) => {
                const isActive = pt.id === activePointId;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActivePointId(pt.id)}
                    className={`px-2.5 py-2 rounded-xl text-[9px] font-mono font-bold uppercase transition-all cursor-pointer text-left truncate flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-zinc-950 text-zinc-500 border-zinc-900/60 hover:text-zinc-300'
                    }`}
                  >
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{pt.name.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Corner Stats Spec Card */}
            <div className="glass rounded-xl p-4 bg-zinc-900/40 border border-zinc-800 space-y-3.5">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-0.5">
                  Checkpoint {point.type === 'braking' ? '⛔ BRAKING DECEL' : point.type === 'speed_trap' ? '⚡ SPEED TRAP' : point.type === 'drs' ? '🚀 DRS ZONE' : '🏁 CORNER INDEX'}
                </span>
                <h4 className="text-sm font-display font-black text-white uppercase tracking-tight">{point.name}</h4>
              </div>

              {/* Dynamic Readouts grids */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-400">
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                  <span className="text-zinc-600 uppercase text-[8px] block tracking-wider">APEX GEAR</span>
                  <span className="text-white font-extrabold">{point.gear}</span>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                  <span className="text-zinc-600 uppercase text-[8px] block tracking-wider">SPEED</span>
                  <span className="text-emerald-400 font-extrabold">{point.speed}</span>
                </div>
                <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                  <span className="text-zinc-600 uppercase text-[8px] block tracking-wider">G-FORCE</span>
                  <span className="text-amber-500 font-extrabold">{point.lateralG}</span>
                </div>
              </div>
            </div>

            {/* Memorable Overtake / History card */}
            <div className="p-4 rounded-xl bg-black/50 border border-zinc-900 space-y-2 select-text">
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="w-3 h-3" /> Historic Paddock Moment
              </span>
              <p className="text-zinc-300 text-xs font-mono leading-relaxed">
                {point.historicalStory}
              </p>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono text-right italic pt-2">
            * Synced live track data vectors.
          </div>
        </div>
      </div>
    </div>
  );
}
