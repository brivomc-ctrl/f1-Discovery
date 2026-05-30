import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, History, Shield, Sliders, Sparkles, Award } from 'lucide-react';

interface EraCar {
  id: string;
  name: string;
  year: number;
  engine: string;
  powerHP: number;
  weightKg: number;
  championships: string;
  notableDriver: string;
  aerodynamicTrait: string;
  dimensionsWidthMm: number;
  philosophy: string;
}

const HISTORIC_CARS: EraCar[] = [
  {
    id: 'lotus_79',
    name: 'Lotus 79 (Black Beauty)',
    year: 1978,
    engine: '3.0L Ford Cosworth DFV V8',
    powerHP: 475,
    weightKg: 575,
    championships: '1978 Drivers & Constructors',
    notableDriver: 'Mario Andretti',
    aerodynamicTrait: 'Sliding skirts with early venturi floors (First true Ground Effect car)',
    dimensionsWidthMm: 2150,
    philosophy: 'The pioneer of lower chassis air acceleration. Ground-breaking slider skirt sidewalls seals underbody air vacuum, generating downforce parameters so immense that drivers were subjected to new realms of lateral G forces.'
  },
  {
    id: 'mclaren_mp4',
    name: 'McLaren MP4/4',
    year: 1988,
    engine: '1.5L Honda RA168E V6 Twin-Turbo',
    powerHP: 650,
    weightKg: 540,
    championships: '1988 Drivers & Constructors (15 of 16 Wins)',
    notableDriver: 'Ayrton Senna / Alain Prost',
    aerodynamicTrait: 'Laid-back driver packaging, low-drag profile sleek surfaces',
    dimensionsWidthMm: 2130,
    philosophy: 'Widely recognized as the most dominant race car built. Structured with an exceptionally low height, utilizing Turbo boost gates pushing extreme torque margins. Combines carbon-composite layouts with elegant aerodynamics.'
  },
  {
    id: 'ferrari_f2004',
    name: 'Ferrari F2004',
    year: 2004,
    engine: '3.0L Scuderia Ferrari Tipo 053 V10',
    powerHP: 920,
    weightKg: 605,
    championships: '2004 Drivers & Constructors',
    notableDriver: 'Michael Schumacher',
    aerodynamicTrait: 'Complex exterior bargeboard wings, high revving flow splits',
    dimensionsWidthMm: 1800,
    philosophy: 'The pinnacle of high-revving naturally aspirated V10 screaming monsters. Holding lap records that stood for over 15 years, it combined incredible engine durability (revving to 19,000 RPM) with high downforce package balances.'
  },
  {
    id: 'mercedes_w11',
    name: 'Mercedes-AMG F1 W11 EQ Performance',
    year: 2020,
    engine: '1.6L V6 Turbo Hybrid + Dual MGU Recovery',
    powerHP: 1020,
    weightKg: 746,
    championships: '2020 Drivers & Constructors (Fastest Lap Records)',
    notableDriver: 'Lewis Hamilton',
    aerodynamicTrait: 'Dual-Axis Steering (DAS) toe-adjustments, massive side vortex guides',
    dimensionsWidthMm: 2000,
    philosophy: 'The fastest race car over a single qualifying lap in motor racing history. Packed with an incredible 1000+ horsepower thermal-efficient power unit, and featuring the active mechanical DAS system adjusting front wheel toe on straights.'
  },
  {
    id: 'redbull_rb19',
    name: 'Red Bull Racing RB19',
    year: 2023,
    engine: '1.6L V6 Turbo Hybrid + Honda HRC Battery Boost',
    powerHP: 1010,
    weightKg: 798,
    championships: '2023 Drivers & Constructors (21 of 22 Wins)',
    notableDriver: 'Max Verstappen',
    aerodynamicTrait: 'Underbody Venturi side channel, anti-squat rear kinematics',
    dimensionsWidthMm: 2000,
    philosophy: 'A modern masterpiece. Dominating with extreme aerodynamic floor efficiency, the design maintains exceptionally stable chassis ride heights during braking and heavy corners to lock down the downforce coefficient.'
  }
];

export default function VintageLegacies() {
  const [carAId, setCarAId] = useState<string>('mclaren_mp4');
  const [carBId, setCarBId] = useState<string>('mercedes_w11');

  const carA = HISTORIC_CARS.find(c => c.id === carAId) || HISTORIC_CARS[0];
  const carB = HISTORIC_CARS.find(c => c.id === carBId) || HISTORIC_CARS[1];

  // Mathematical comparisons helper
  const powerWeightRatio = (car: EraCar) => (car.powerHP / car.weightKg).toFixed(2);

  return (
    <div className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-4 md:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#E10600] uppercase tracking-widest block font-bold">Historic Evolution Comparator</span>
          <h3 className="text-xl md:text-2xl font-display font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
            <History className="w-5 h-5 text-[#E10600]" /> Vintage Legacies & Era Timelines
          </h3>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900/60 font-bold uppercase">
          F1 Technology Leap Comparison
        </div>
      </div>

      {/* SELECTORS ROW */}
      <div className="grid grid-cols-2 gap-3 mb-6 bg-zinc-950 p-4 rounded-xl border border-zinc-900">
        <div className="space-y-1">
          <label htmlFor="vintage-car-a" className="block text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Select Heritage/Modern Class A</label>
          <select
            id="vintage-car-a"
            value={carAId}
            onChange={(e) => setCarAId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-3 text-xs text-zinc-200 outline-none focus:border-[#E10600] font-mono appearance-none"
          >
            {HISTORIC_CARS.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === carBId}>{c.name} ({c.year})</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="vintage-car-b" className="block text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Select Heritage/Modern Class B</label>
          <select
            id="vintage-car-b"
            value={carBId}
            onChange={(e) => setCarBId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-3 text-xs text-zinc-200 outline-none focus:border-[#E10600] font-mono appearance-none"
          >
            {HISTORIC_CARS.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === carAId}>{c.name} ({c.year})</option>
            ))}
          </select>
        </div>
      </div>

      {/* DOUBLE DETAIL COMPARE SPEC SHEET */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6 select-text">
        {/* CAR ALPA SPEC CARD */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between" style={{ borderLeftWidth: 3, borderLeftColor: '#E10600' }}>
          <div>
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mb-1 font-bold">
              <span>{carA.year} CHALLENGER</span>
              <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[#E10600]" /> HISTORIC SYMBOL</span>
            </div>
            <h4 className="text-md font-display font-black text-white uppercase">{carA.name}</h4>
            <span className="text-[10px] font-mono text-zinc-400 block mt-1">Sovereign driver: {carA.notableDriver}</span>

            <p className="text-xs font-mono text-zinc-400 leading-relaxed mt-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900/60 select-all">
              {carA.philosophy}
            </p>
          </div>

          <div className="mt-5 space-y-1 font-mono text-[9px] text-zinc-500 border-t border-zinc-900/60 pt-3">
            <div>Championship Legacy: <span className="text-white font-bold">{carA.championships}</span></div>
            <div>Aero Highlight: <span className="text-emerald-400 font-bold">{carA.aerodynamicTrait}</span></div>
          </div>
        </div>

        {/* CAR BETA SPEC CARD */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between" style={{ borderLeftWidth: 3, borderLeftColor: '#3671C6' }}>
          <div>
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mb-1 font-bold">
              <span>{carB.year} CHALLENGER</span>
              <span className="flex items-center gap-1"><Award className="w-3 h-3 text-cyan-400" /> HISTORIC SYMBOL</span>
            </div>
            <h4 className="text-md font-display font-black text-white uppercase">{carB.name}</h4>
            <span className="text-[10px] font-mono text-zinc-400 block mt-1">Sovereign driver: {carB.notableDriver}</span>

            <p className="text-xs font-mono text-zinc-400 leading-relaxed mt-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900/60 select-all">
              {carB.philosophy}
            </p>
          </div>

          <div className="mt-5 space-y-1 font-mono text-[9px] text-zinc-500 border-t border-zinc-900/60 pt-3">
            <div>Championship Legacy: <span className="text-white font-bold">{carB.championships}</span></div>
            <div>Aero Highlight: <span className="text-[#3671C6] font-bold">{carB.aerodynamicTrait}</span></div>
          </div>
        </div>
      </div>

      {/* METRIC GRAPHS BARS COMPARISON */}
      <div className="px-4 py-5 rounded-xl bg-black/60 border border-zinc-900 space-y-4">
        <h5 className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1 pb-2 border-b border-zinc-900">
          ⚙️ Raw Dynamic Metrics Standings
        </h5>

        <div className="space-y-4">
          {/* Compare Power Output HP */}
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[9px] text-zinc-400">
              <span className="font-extrabold">{carA.powerHP} HP</span>
              <span className="uppercase text-zinc-600 font-extrabold text-[8px] tracking-wider">ENGINE HORSEPOWER OUTPUT</span>
              <span className="font-extrabold">{carB.powerHP} HP</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-zinc-900 flex">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${(carA.powerHP / (carA.powerHP + carB.powerHP)) * 100}%`,
                  backgroundColor: '#E10600'
                }}
              />
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${(carB.powerHP / (carA.powerHP + carB.powerHP)) * 100}%`,
                  backgroundColor: '#3671C6'
                }}
              />
            </div>
          </div>

          {/* Compare Weight Kg (Lower is faster in F1) */}
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[9px] text-zinc-400">
              <span className="font-extrabold text-[#E10600]">{carA.weightKg} kg {carA.weightKg < carB.weightKg && '⚖️'}</span>
              <span className="uppercase text-zinc-600 font-extrabold text-[8px] tracking-wider">OVERALL MINIMUM REGULATED WEIGHT</span>
              <span className="font-extrabold text-[#3671C6]">{carB.weightKg} kg {carB.weightKg < carA.weightKg && '⚖️'}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-zinc-900 flex">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${(carA.weightKg / (carA.weightKg + carB.weightKg)) * 100}%`,
                  backgroundColor: '#E10600',
                  opacity: carA.weightKg < carB.weightKg ? 1 : 0.4
                }}
              />
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${(carB.weightKg / (carA.weightKg + carB.weightKg)) * 100}%`,
                  backgroundColor: '#3671C6',
                  opacity: carB.weightKg < carA.weightKg ? 1 : 0.4
                }}
              />
            </div>
          </div>

          {/* Compare Power to Weight (HP / Kg) */}
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[9px] text-zinc-400">
              <span className="font-extrabold">{powerWeightRatio(carA)} HP/kg</span>
              <span className="uppercase text-zinc-600 font-extrabold text-[8px] tracking-wider">POWER TO WEIGHT RATIO RATING</span>
              <span className="font-extrabold">{powerWeightRatio(carB)} HP/kg</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-zinc-900 flex">
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${parseFloat(powerWeightRatio(carA)) / (parseFloat(powerWeightRatio(carA)) + parseFloat(powerWeightRatio(carB))) * 100}%`,
                  backgroundColor: '#E10600'
                }}
              />
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${parseFloat(powerWeightRatio(carB)) / (parseFloat(powerWeightRatio(carA)) + parseFloat(powerWeightRatio(carB))) * 100}%`,
                  backgroundColor: '#3671C6'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
