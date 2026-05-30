import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, MapPin, Calendar, HelpCircle, Shield, Compass, Heart } from 'lucide-react';
import { Driver, Team } from '../types';

interface DriverModalProps {
  driver: Driver | null;
  team: Team | undefined;
  onClose: () => void;
}

export default function DriverModal({ driver, team, onClose }: DriverModalProps) {
  if (!driver) return null;

  const accentColor = team?.color || '#E10600';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        {/* Backdrop clickable */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        <motion.div
          id="driver-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#111115] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Accent glow top-bar */}
          <div className="h-2 w-full" style={{ backgroundColor: accentColor }} />

          {/* Close button */}
          <button
            id="close-driver-modal"
            onClick={onClose}
            className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-md z-20"
          >
            <X className="w-4 h-4" />
            <span>CLOSE BIO</span>
          </button>

          <div className="p-6 md:p-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800/80">
              <div>
                <span 
                  className="inline-block text-xs font-bold tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 mb-2 font-mono"
                  style={{ color: accentColor }}
                >
                  TEAM PILOT #{driver.number}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                  {driver.name}
                  <span className="text-zinc-600 text-2xl font-mono">[{driver.code}]</span>
                </h2>
                <p className="text-zinc-400 text-sm md:text-base mt-1 flex items-center gap-1.5">
                  <span className="text-lg">{driver.flagCode === 'GB' ? '🇬🇧' : driver.flagCode === 'NL' ? '🇳🇱' : driver.flagCode === 'AU' ? '🇦🇺' : driver.flagCode === 'MC' ? '🇲🇨' : driver.flagCode === 'NZ' ? '🇳🇿' : driver.flagCode === 'ES' ? '🇪🇸' : driver.flagCode === 'FR' ? '🇫🇷' : driver.flagCode === 'IT' ? '🇮🇹' : driver.flagCode === 'TH' ? '🇹🇭' : driver.flagCode === 'DE' ? '🇩🇪' : driver.flagCode === 'BR' ? '🇧🇷' : driver.flagCode === 'JP' ? '🇯🇵' : '🏁'}</span>
                  {driver.country} &bull; <span className="font-semibold text-zinc-300">{driver.teamName}</span>
                </p>
              </div>

              <div className="text-left md:text-right font-mono bg-zinc-900/60 p-4 border border-zinc-800/50 rounded-xl min-w-[200px]">
                <div className="text-xs text-zinc-500 uppercase tracking-wider">MEMBER SINCE</div>
                <div className="text-lg font-bold text-zinc-200">2026 Season Grid</div>
                <div className="text-xs text-zinc-400 mt-1">Birthplace: {driver.birthPlace}</div>
              </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Bio & Stats */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-zinc-400" />
                    Biographical Profile
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed antialiased">
                    {driver.bio}
                  </p>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-zinc-500" /> Active Highlights
                  </h4>
                  <p className="text-sm text-amber-400 font-medium">
                    &ldquo;{driver.careerHighlight}&rdquo;
                  </p>
                </div>

                {/* Performance Stats Grid */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-3 flex items-center gap-2">
                    Telemetry Career Stats
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 font-mono">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">Championships</div>
                      <div className="text-2xl font-bold flex items-center gap-1.5 mt-0.5">
                        {driver.stats.championships > 0 ? (
                          <span className="text-amber-400 font-black">{driver.stats.championships} 🏆</span>
                        ) : (
                          <span className="text-zinc-400">0</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 font-mono">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">Grand Prix Wins</div>
                      <div className="text-2xl font-bold text-white mt-0.5">{driver.stats.wins}</div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 font-mono">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">Podium Finishes</div>
                      <div className="text-2xl font-bold text-zinc-200 mt-0.5">{driver.stats.podiums}</div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 font-mono">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">GP Entries</div>
                      <div className="text-2xl font-bold text-zinc-200 mt-0.5">{driver.stats.gps}</div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 font-mono col-span-2 sm:col-span-2">
                      <div className="text-zinc-500 text-[10px] uppercase tracking-wider">Career Points Accumulated</div>
                      <div className="text-2xl font-bold text-zinc-100 mt-0.5 flex items-center justify-between">
                        <span>{driver.stats.careerPoints.toLocaleString()} pts</span>
                        {driver.stats.currentRank && (
                          <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                            P{driver.stats.currentRank} Active Run
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Helmet Interactive Lab */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-zinc-800 text-6xl font-mono font-extrabold select-none opacity-10">
                    {driver.code}
                  </div>
                  
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Compass className="w-4 h-4" style={{ color: accentColor }} /> Helmet Design Lab
                  </h3>

                  {/* Helmet Visual Generator */}
                  <div className="relative h-44 bg-zinc-900/60 rounded-xl flex items-center justify-center p-4 border border-zinc-800/40 shadow-inner mb-4 overflow-hidden">
                    {/* Track grid background */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'radial-gradient(ellipse at center, #ffffff 1px, transparent 1px)',
                      backgroundSize: '12px 12px'
                    }} />

                    {/* SVG Helmet Wireframe */}
                    <svg className="w-40 h-40 drop-shadow-xl relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Outer Shell Shadow */}
                      <path d="M15,50 C15,20 35,15 55,15 C75,15 85,25 85,45 C85,60 80,75 75,80 C68,85 50,85 40,85 C25,85 20,78 15,70" fill="#08080c" opacity="0.4" />
                      
                      {/* Main Crown Base Shell */}
                      <path d="M18,50 C18,22 36,18 55,18 C74,18 82,27 82,45 C82,58 78,72 73,76 C66,81 50,81 41,81 C28,81 23,75 18,65 Z" fill={driver.helmet.baseColor} stroke="#18181c" strokeWidth="1.5" />
                      
                      {/* Aero Winglets Accent Top */}
                      <path d="M30,18 C40,12 60,12 70,18 C65,16 45,16 30,18 Z" fill={driver.helmet.accentColor} opacity="0.9" />
                      <path d="M68,18 C75,20 80,24 82,28 C80,24 74,21 68,18 Z" fill={driver.helmet.accentColor} />

                      {/* Decal Streaks (Swoosh lines) */}
                      <path d="M18,55 C25,48 40,42 60,48 C75,52 82,54 81,64 C70,68 45,68 30,68 C22,68 18,60 18,55 Z" fill={driver.helmet.accentColor} opacity="0.8" />
                      <path d="M22,35 C35,28 55,30 74,38 L76,43 C55,34 35,32 22,38 Z" fill={driver.helmet.accentColor} opacity="0.3" />

                      {/* Carbon Visor Rim */}
                      <path d="M38,36 C55,34 76,38 81,46 L82,54 C74,48 55,44 38,46 Z" fill="#18181c" stroke="#2a2a30" strokeWidth="0.8" />
                      
                      {/* Dynamic Visor Shield */}
                      <path d="M40,38 C55,36 74,40 79,47 L80,52 C72,46 55,42 40,44 Z" fill="url(#visorGrad)" stroke="#1a1a1e" strokeWidth="0.5" />

                      {/* Visor Tear-off clips */}
                      <circle cx="39" cy="41" r="1.5" fill="#555" />
                      <circle cx="79" cy="49" r="1.5" fill="#555" />

                      {/* Chin Guard Base Plate */}
                      <path d="M18,60 C24,64 36,68 41,68 C45,68 55,60 55,56 C40,56 25,60 18,60 Z" fill="#222" opacity="0.6" />
                      
                      {/* Personal Number Emblem */}
                      <rect x="25" y="52" width="10" height="8" rx="1.5" fill="#fff" opacity="0.9" />
                      <text x="30" y="58" fill="#111" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{driver.number}</text>

                      {/* Sponsor visor plate */}
                      <path d="M42,39 L78,45" stroke="#fff" strokeWidth="1" opacity="0.8" />

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e222b" />
                          <stop offset="60%" stopColor="#2c3445" />
                          <stop offset="100%" stopColor="#0c8bcc" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Color Dot Swatches */}
                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                      <div className="flex items-center gap-1 bg-zinc-900/90 py-1 px-2 rounded-md border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                        <span className="w-2h h-2 rounded-full inline-block" style={{ backgroundColor: driver.helmet.baseColor, width: '8px', height: '8px' }} />
                        Base
                      </div>
                      <div className="flex items-center gap-1 bg-zinc-900/90 py-1 px-2 rounded-md border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                        <span className="w-2h h-2 rounded-full inline-block" style={{ backgroundColor: driver.helmet.accentColor, width: '8px', height: '8px' }} />
                        Accent
                      </div>
                    </div>
                  </div>

                  {/* Helmet Specifications list */}
                  <div className="space-y-3 font-sans text-xs">
                    <div>
                      <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">LIVERY SCHEMA</div>
                      <div className="text-zinc-200 font-medium">{driver.helmet.colorScheme}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">CROWN GRAPHIC HIGHLIGHT</div>
                      <div className="text-zinc-300 leading-relaxed">{driver.helmet.topFeature}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">REAR PANEL MONOGRAM</div>
                      <div className="text-zinc-300 leading-relaxed">{driver.helmet.rearSymbol}</div>
                    </div>
                    <div className="pt-2 border-t border-zinc-800/60">
                      <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mb-1">AESTHETIC & DESIGN STORY</div>
                      <p className="text-zinc-400 italic leading-relaxed text-[11px]">
                        &ldquo;{driver.helmet.designStory}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Principal stamp */}
                <div className="text-[11px] font-mono text-zinc-500 flex justify-between items-center px-4 py-2 border border-dashed border-zinc-800 rounded-xl">
                  <span>Sign-off: {team?.principal}</span>
                  <span className="text-zinc-600">Maranello-Enstone certified</span>
                </div>
              </div>
            </div>

            {/* Bottom Return Control Panel */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-mono text-center sm:text-left">
                Pressing Escape, clicking outside the card, or using the top button also closes this view.
              </span>
              <button
                id="bottom-close-driver-modal"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-[#E10600] hover:bg-[#FF1C14] text-white text-xs font-bold uppercase tracking-widest font-display rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-950/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                ← Back to Drivers Gallery
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
