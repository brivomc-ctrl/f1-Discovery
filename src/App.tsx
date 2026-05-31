import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Flag, 
  Calendar, 
  Briefcase, 
  Mail, 
  Search, 
  Filter, 
  ShieldAlert, 
  Gauge, 
  Compass, 
  ArrowRight,
  Clock,
  ChevronRight,
  Ticket,
  ChevronDown,
  Info,
  CheckCircle,
  HelpCircle,
  Cpu,
  BookmarkCheck,
  Send,
  MapPin,
  Wrench,
  Map,
  History,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { F1_DRIVERS, F1_TEAMS, F1_RACES, F1_TROPHIES, F1_SPONSORS } from './data/f1Data';
import { Driver, Team, RaceGP, TrophyInfo, SponsorInfo, ContactInquiry } from './types';
import DriverModal from './components/DriverModal';

// Paddock Interactive Components Imports
import LiveStandingsSync from './components/paddock/LiveStandingsSync';
import GarageAnatomy from './components/paddock/GarageAnatomy';
import CircuitMaps from './components/paddock/CircuitMaps';
import VintageLegacies from './components/paddock/VintageLegacies';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // States for Drivers Dataset (Allows Dynamic Syncing)
  const [driversList, setDriversList] = useState<Driver[]>(F1_DRIVERS);

  // States for Drivers
  const [driverSearch, setDriverSearch] = useState<string>('');
  const [driverTeamFilter, setDriverTeamFilter] = useState<string>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverChartMetric, setDriverChartMetric] = useState<'wins' | 'podiums' | 'careerPoints' | 'championships' | 'gps'>('careerPoints');
  const [compareDriverAId, setCompareDriverAId] = useState<string>('norris');
  const [compareDriverBId, setCompareDriverBId] = useState<string>('verstappen');

  // States for Teams panel
  const [teamSearch, setTeamSearch] = useState<string>('');
  const [activeTeamDetail, setActiveTeamDetail] = useState<string>('mclaren');

  // States for Schedule
  const [scheduleFilter, setScheduleFilter] = useState<string>('all');
  const [selectedGPForTicket, setSelectedGPForTicket] = useState<RaceGP | null>(null);
  const [ticketSeatClass, setTicketSeatClass] = useState<string>('grandstand');
  const [ticketSuccess, setTicketSuccess] = useState<boolean>(false);
  const [bookedTickets, setBookedTickets] = useState<Array<{ gpName: string; seatClass: string; ticketCode: string }>>([]);

  // States for Helmets Gallery page
  const [helmetSearch, setHelmetSearch] = useState<string>('');
  const [activeHelmetDriverId, setActiveHelmetDriverId] = useState<string>('norris');

  // States for Trophies / Timeline
  const [activeTrophyId, setActiveTrophyId] = useState<string>('drivers-championship');
  const [activeHistoryEra, setActiveHistoryEra] = useState<number>(0);

  // Contact Forum State
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactTeam, setContactTeam] = useState<string>('mclaren');
  const [contactDriver, setContactDriver] = useState<string>('Lando Norris');
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<ContactInquiry[]>([]);

  // Simulated Montreal Countdown state (Target: June 5, 2026 13:00:00 UTC)
  const [countdownString, setCountdownString] = useState<string>('06d : 12h : 45m : 02s');

  useEffect(() => {
    // Current simulated local time is Thursday/Friday May 29, 2026
    const targetDate = new Date('2026-06-05T13:00:00Z').getTime();
    
    const interval = setInterval(() => {
      // Calculate difference starting from artificial system date
      const now = new Date().getTime();
      const difference = targetDate - now;

      // In case we are far in the future or system clock is different, let's slide nicely
      let remMs = difference;
      if (remMs < 0) {
        // Fallback: 6 days, 15 hours from today
        remMs = (6 * 24 * 60 * 60 * 1000) + (15 * 60 * 60 * 1000);
      }

      const days = Math.floor(remMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const textMinutes = Math.floor((remMs % (1000 * 60 * 60)) / (1000 * 60));
      const textSeconds = Math.floor((remMs % (1000 * 60)) / 1000);

      const dStr = days.toString().padStart(2, '0');
      const hStr = hours.toString().padStart(2, '0');
      const mStr = textMinutes.toString().padStart(2, '0');
      const sStr = textSeconds.toString().padStart(2, '0');

      setCountdownString(`${dStr}d : ${hStr}h : ${mStr}m : ${sStr}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Submit contact helper
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactSubject.trim() || !contactMessage.trim()) {
      setFormError('Telemetry alerts: All fields are required to process inquiries.');
      setTimeout(() => setFormError(''), 4000);
      return;
    }

    if (!contactEmail.includes('@') || contactEmail.length < 5) {
      setFormError('Invalid communications link: Please enter a logical email template.');
      setTimeout(() => setFormError(''), 4000);
      return;
    }

    const newInquiry: ContactInquiry = {
      name: contactName,
      email: contactEmail,
      favoriteTeam: contactTeam,
      favoriteDriver: contactDriver,
      subject: contactSubject,
      message: contactMessage
    };

    setSubmittedInquiries([newInquiry, ...submittedInquiries]);
    setFormSuccess(true);
    setFormError('');

    // Clear inputs
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // Submit ticket booking pass
  const handleTicketBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGPForTicket) return;

    const code = 'F1-26-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + selectedGPForTicket.round;
    const item = {
      gpName: selectedGPForTicket.name,
      seatClass: ticketSeatClass.toUpperCase(),
      ticketCode: code
    };

    setBookedTickets([item, ...bookedTickets]);
    setTicketSuccess(true);

    setTimeout(() => {
      setTicketSuccess(false);
      setSelectedGPForTicket(null);
    }, 4000);
  };

  // Filter systems
  const filteredDrivers = driversList.filter(d => {
    const sTerm = driverSearch.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(sTerm) || d.code.toLowerCase().includes(sTerm) || d.country.toLowerCase().includes(sTerm);
    const matchTeam = driverTeamFilter === 'all' || d.teamId === driverTeamFilter;
    return matchSearch && matchTeam;
  });

  const handleCompareClick = (e: React.MouseEvent | React.KeyboardEvent, driverId: string) => {
    e.stopPropagation();
    if (compareDriverAId === driverId) {
      // already in A, skip
    } else {
      setCompareDriverAId(compareDriverBId);
      setCompareDriverBId(driverId);
      
      const element = document.getElementById('driver-comparator-arena');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const filteredTeams = F1_TEAMS.filter(t => {
    const sTerm = teamSearch.toLowerCase();
    return t.name.toLowerCase().includes(sTerm) || t.principal.toLowerCase().includes(sTerm) || t.base.toLowerCase().includes(sTerm);
  });

  const filteredRaces = F1_RACES.filter(r => {
    if (scheduleFilter === 'all') return true;
    return r.status === scheduleFilter;
  });

  const filteredSponsors = F1_SPONSORS;

  const currentHelmetDriver = driversList.find(d => d.id === activeHelmetDriverId);
  const currentHelmetTeam = F1_TEAMS.find(t => t.id === currentHelmetDriver?.teamId);

  // Timeline events array
  const historyTimeline = [
    { year: 1950, event: 'The Inaugural Season', desc: 'The modern Formula 1 World Championship was born in Silverstone, won by Giuseppe "Nino" Farina in a roaring supercharged Alfa Romeo.' },
    { year: 1968, event: 'Aerodynamic Wedges & Wings', desc: 'Teams introduced high strut-mounted wings. Colin Chapman launched commercial sponsorships on Lotus, transforming colors forever.' },
    { year: 1981, event: 'Carbon Fiber Revolution', desc: 'John Barnard designed the McLaren MP4/1, the first ever carbon fiber composite chassis. It completely redefined driver structural survival bounds.' },
    { year: 1994, event: 'Adaptive Telemetry Refinements', desc: 'Active suspensions alongside traction controls were banned to restore raw mechanic driving skills to pilots after Williams dominant runs.' },
    { year: 2014, event: 'The V6 Turbo-Hybrid Era', desc: 'F1 migrated from high-revving V8s to technically outstanding 1.6L turbocharged thermal-efficiency units with kinetic energy restoration loops.' },
    { year: 2022, event: 'Ground Effect Resurrection', desc: 'F1 overhauled rules to utilize venturi floor aerodynamics, allowing closer high-speed following without massive wake turbulence losses.' },
    { year: 2026, event: 'Sustainable Hyper-Fuels Future', desc: 'Introduction of the new 2026 engine regulations utilizing nearly 50% electrical power distribution combined with 100% sustainable hydrocarbons.' }
  ];

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col font-sans carbon-grid antialiased">
      {/* Dynamic Paddock Status Header Strip */}
      <div className="bg-[#050507] border-b border-zinc-900 text-[11px] font-mono py-1.5 px-4 flex flex-wrap justify-between items-center gap-1.5 text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="text-zinc-400 font-semibold uppercase tracking-wider">FIA LIVE CORE:</span>
          <span>Simulation Active - 2026 Paddock Sync</span>
        </div>
        <div className="flex items-center gap-4">
          <span>GP Live Hub Latitude: 43.50° N</span>
          <span className="text-zinc-400 font-bold hidden sm:inline">NEXT ROUND METRIC: SG-26 Canada</span>
        </div>
      </div>

      {/* Primary Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-[#E10600] text-white p-1.5 rounded-md font-black italic tracking-tighter text-xl font-display transform skew-x-[-12deg] flex items-center justify-center glow-red">
              F1
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-tight uppercase"><span className="text-[#E10600]">F1</span> DISCOVERY</span>
              <span className="font-mono text-[9px] tracking-widest text-[#E10600] uppercase font-bold">KNOWLEDGE BASE</span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: 'home', label: 'Dashboard', icon: Gauge },
              { id: 'drivers', label: 'Drivers Grid', icon: Users },
              { id: 'teams', label: 'Constructor Teams', icon: Flag },
              { id: 'garage', label: 'Garage Specs', icon: Wrench },
              { id: 'tracks', label: 'Circuit Maps', icon: Map },
              { id: 'history', label: 'Vintage Legacies', icon: History },
              { id: 'schedule', label: 'Race Schedule', icon: Calendar },
              { id: 'helmets', label: 'Helmet Gallery', icon: Compass },
              { id: 'trophies', label: 'Trophy Room', icon: Trophy },
              { id: 'sponsors', label: 'Global Partners', icon: Briefcase },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-link-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-display text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-[#E10600]' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabOverlay"
                      className="absolute inset-0 bg-[#E10600]/10 border border-[#E10600]/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 z-10" />
                  <span className="z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-zinc-800 bg-[#0c0c0f]"
            >
              <div className="px-4 py-3 space-y-1">
                {[
                  { id: 'home', label: 'Dashboard', icon: Gauge },
                  { id: 'drivers', label: 'Drivers Grid', icon: Users },
                  { id: 'teams', label: 'Constructor Teams', icon: Flag },
                  { id: 'garage', label: 'Garage Specs', icon: Wrench },
                  { id: 'tracks', label: 'Circuit Maps', icon: Map },
                  { id: 'history', label: 'Vintage Legacies', icon: History },
                  { id: 'schedule', label: 'Race Schedule', icon: Calendar },
                  { id: 'helmets', label: 'Helmet Gallery', icon: Compass },
                  { id: 'trophies', label: 'Trophy Room', icon: Trophy },
                  { id: 'sponsors', label: 'Global Partners', icon: Briefcase },
                  { id: 'contact', label: 'Contact Panel', icon: Mail }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-display text-xs font-semibold uppercase tracking-wider text-left cursor-pointer ${
                        activeTab === tab.id ? 'bg-[#E10600] text-white' : 'text-zinc-400 hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Core Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME/DASHBOARD */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Hero Banner Grid */}
              <div className="relative card-gradient glass rounded-3xl overflow-hidden p-6 md:p-12 shadow-2xl border-l-4 border-l-[#E10600]">
                {/* Light reflection glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E10600] rounded-full blur-[140px] opacity-15 pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="inline-block text-xs font-bold font-mono tracking-widest text-[#E10600] px-2.5 py-1 rounded bg-[#E10600]/10 border border-[#E10600]/30 uppercase">
                    CHAMPIONSHIP TICKER EVENT
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black italic tracking-tighter text-white leading-none">
                    ENGINEERED <br /><span className="text-gradient-red">FOR VELOCITY</span>
                  </h1>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                    Welcome to the ultimate digital F1 Discovery platform. Gain unfiltered paddock technical insight, follow driver stats, dissect custom helmet design stories, browse historic trophies, and secure virtual bookings and thank you for joining.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      id="hero-go-drivers"
                      onClick={() => setActiveTab('drivers')}
                      className="px-5 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1C14] text-white text-xs font-bold uppercase tracking-wider font-display flex items-center gap-2 transition-all shadow-lg shadow-red-950/20 cursor-pointer"
                    >
                      Explore Drivers Grid
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id="hero-go-helmets"
                      onClick={() => setActiveTab('helmets')}
                      className="px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider font-display border border-zinc-800 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      Livery Museum
                    </button>
                  </div>
                </div>
              </div>

              {/* LIVE STANDINGS FEED DYNAMIC TUNNEL */}
              <LiveStandingsSync 
                drivers={driversList} 
                onSyncComplete={(updatedDrivers) => setDriversList(updatedDrivers)} 
              />

              {/* Dynamic Live Track Card with ticking widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Countdown Countdown Clock Panel */}
                <div className="lg:col-span-7 glass rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden border-l-4 border-l-[#E10600]">
                  <div className="absolute -bottom-8 -right-8 text-zinc-950 text-9xl font-black font-mono select-none opacity-20">
                    CAN_
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-2 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5 text-[#E10600]" />
                      Live Paddock Telemetry countdown
                    </div>
                    
                    <h3 className="text-2xl font-display font-black italic text-white tracking-tighter">
                      Grand Prix du Canada
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono mt-0.5">
                      Round 7 &bull; Circuit Gilles-Villeneuve, Montreal
                    </p>
                  </div>

                  {/* Tick Counter numbers */}
                  <div className="my-6 py-4 bg-black/60 border border-zinc-900 rounded-xl px-4 flex items-center justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-black text-red-500 tracking-wider">
                      {countdownString}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-900">
                    <span className="text-zinc-500 font-mono">Date: June 05 - 07, 2026</span>
                    <button
                      id="go-schedule-direct"
                      onClick={() => setActiveTab('schedule')}
                      className="text-[#E10600] hover:text-white font-display font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      Race Calendar
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Micro Championship Leaders Widget */}
                <div className="lg:col-span-5 glass rounded-2xl p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      Active Standings Apex
                    </h3>
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 font-mono py-0.5 px-2 rounded border border-amber-500/20 uppercase font-black">
                      Round 6 Live
                    </span>
                  </div>

                  {/* Top 3 Drivers Standings list in layout */}
                  <div className="space-y-3 flex-grow justify-center flex flex-col">
                    {[
                      { pos: 1, name: 'Max Verstappen', code: 'VER', team: 'Red Bull Racing', points: 156, color: '#3671C6' },
                      { pos: 2, name: 'Lando Norris', code: 'NOR', team: 'McLaren Racing', points: 124, color: '#FF8700' },
                      { pos: 3, name: 'Charles Leclerc', code: 'LEC', team: 'Scuderia Ferrari', points: 119, color: '#E80020' }
                    ].map(driver => (
                      <div 
                        key={driver.pos}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/40 relative overflow-hidden"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: driver.color }} />
                        <div className="flex items-center gap-3 pl-1.5Packed">
                          <span className="font-mono font-black text-zinc-600 text-sm">#{driver.pos}</span>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              {driver.name}
                              <span className="text-[9px] font-mono text-zinc-500">[{driver.code}]</span>
                            </div>
                            <div className="text-[10px] text-zinc-400 font-mono leading-none">{driver.team}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono text-xs font-bold text-zinc-300">
                          {driver.points} <span className="text-[9px] text-zinc-500">PTS</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-zinc-900 text-center">
                    <span className="text-[10px] font-mono text-zinc-500">Updated post Round-5 Race telemetry checkpoints</span>
                  </div>
                </div>

              </div>

              {/* Premium F1 Interactive Labs Grid */}
              <div className="space-y-4 pt-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#E10600] uppercase tracking-widest block font-bold">Advanced Simulation Decks</span>
                  <h3 className="text-xl font-display font-black italic tracking-tighter text-white uppercase flex items-center gap-1.5">
                    🏎️ F1 Paddock Interactive Labs
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Garage & Chassis Specs',
                      desc: 'Explore real chassis build costs, active engine suppliers, and seasonal crash damage estimates.',
                      tab: 'garage',
                      badge: 'Constructor Lab',
                      accentColor: '#E10600'
                    },
                    {
                      title: 'Interactive Circuit Maps',
                      desc: 'Click high-contrast vector track trajectories of Monza, Spa, and Monaco to overlay sector speed telemetries.',
                      tab: 'tracks',
                      badge: 'Trajectory Center',
                      accentColor: '#10b981'
                    },
                    {
                      title: 'Vintage Legacies Index',
                      desc: 'Compare side-by-side spec arrays of Senna\'s dry low-drag MP4/4 against modern turbo-hybrid speed titles.',
                      tab: 'history',
                      badge: 'Era Comparator',
                      accentColor: '#3671C6'
                    }
                  ].map((lab, li) => (
                    <div 
                      key={li}
                      className="p-5 rounded-2xl glass hover:border-zinc-400 transition-all flex flex-col justify-between group cursor-pointer bg-black/40 border-t-2"
                      style={{ borderTopColor: lab.accentColor }}
                      onClick={() => setActiveTab(lab.tab)}
                    >
                      <div>
                        <span className="text-[9px] font-mono font-black border px-2 py-0.5 rounded-full inline-block mb-3 uppercase tracking-wider font-mono text-[9px]" style={{ color: lab.accentColor, borderColor: `${lab.accentColor}30`, backgroundColor: `${lab.accentColor}08` }}>
                          {lab.badge}
                        </span>
                        <h4 className="text-md font-display font-bold text-white group-hover:text-white transition-all">
                          {lab.title}
                        </h4>
                        <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed font-mono">
                          {lab.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover:text-zinc-200 font-mono mt-4 pt-4 border-t border-zinc-900/40">
                        Launch System Deck
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento informational callouts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Interactive Helmet Lab',
                    desc: 'Inspect close-up aesthetic breakdowns and color composition blocks of currently worn helms.',
                    tab: 'helmets',
                    badge: 'Livery Center'
                  },
                  {
                    title: 'Historic Trophy Museum',
                    desc: 'Read origin anecdotes and materials details of motorsport’s most premium silverware.',
                    tab: 'trophies',
                    badge: 'History Room'
                  },
                  {
                    title: 'F1 Global corporate partners',
                    desc: 'Understand in-depth operations, technology contributions, and multi-team backing.',
                    tab: 'sponsors',
                    badge: 'Partners Room'
                  }
                ].map((b, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl glass hover:border-zinc-500 transition-all flex flex-col justify-between group cursor-pointer bg-black/40"
                    onClick={() => setActiveTab(b.tab)}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#E10600] border border-[#E10600]/20 bg-[#E10600]/5 px-2 py-0.5 rounded-full inline-block mb-3 uppercase tracking-widest font-mono">
                        {b.badge}
                      </span>
                      <h4 className="text-lg font-display font-semibold text-white group-hover:text-[#E10600] transition-all">
                        {b.title}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-white font-mono mt-4 pt-4 border-t border-zinc-900/60">
                      Sync Telemetry Core
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* INTERACTIVE TAB: GARAGE ANATOMY */}
          {activeTab === 'garage' && (
            <motion.div
              key="garage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <GarageAnatomy />
            </motion.div>
          )}

          {/* INTERACTIVE TAB: CIRCUIT MAPS */}
          {activeTab === 'tracks' && (
            <motion.div
              key="tracks"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <CircuitMaps />
            </motion.div>
          )}

          {/* INTERACTIVE TAB: HISTORIC VINTAGE */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <VintageLegacies />
            </motion.div>
          )}

          {/* TAB 2: DRIVERS GRID */}
          {activeTab === 'drivers' && (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Dynamic Paddock Stats & Comparison Arena */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="driver-comparator-arena">
                {/* 1. Dynamic Paddock Stats Chart */}
                <div className="lg:col-span-7 glass rounded-2xl p-4 md:p-6 bg-black/40 border border-zinc-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#E10600] uppercase tracking-widest block">Paddock Analytics</span>
                        <h3 className="text-lg md:text-xl font-display font-black italic tracking-tighter text-white uppercase">
                          Driver Status Chart
                        </h3>
                      </div>

                      {/* Metric Tabs */}
                      <div className="flex flex-wrap gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
                        {[
                          { id: 'careerPoints', label: 'Points' },
                          { id: 'wins', label: 'Wins' },
                          { id: 'podiums', label: 'Podiums' },
                          { id: 'championships', label: 'Titles' },
                          { id: 'gps', label: 'Starts' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setDriverChartMetric(m.id as any)}
                            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              driverChartMetric === m.id
                                ? 'bg-[#E10600] text-white shadow-md'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-zinc-400 text-xs mb-5 font-mono leading-relaxed">
                      Interactive chart visualizing telemetry metrics for active grid pilots. Select metric tabs to update global comparison standings below.
                    </p>

                    {/* Chart Bars */}
                    <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                      {(() => {
                        // Sort driversList based on the selected metric
                        const sortedDriversForChart = [...driversList].sort((a, b) => b.stats[driverChartMetric] - a.stats[driverChartMetric]);
                        const maxVal = Math.max(...driversList.map(d => d.stats[driverChartMetric]), 1);

                        return sortedDriversForChart.map((driver, index) => {
                          const val = driver.stats[driverChartMetric];
                          const pct = (val / maxVal) * 100;
                          const team = F1_TEAMS.find(t => t.id === driver.teamId);
                          const barColor = team?.color || '#E10600';
                          
                          return (
                            <div 
                              key={driver.id} 
                              className="group/bar flex items-center gap-2 text-xs"
                            >
                              {/* Position */}
                              <span className="w-5 text-right font-mono text-[10px] text-zinc-500 font-bold group-hover/bar:text-white transition-all">
                                {index + 1}
                              </span>

                              {/* Target Details */}
                              <div className="w-16 flex items-center gap-1 font-mono font-black text-zinc-300">
                                <span className="text-[10px] grayscale group-hover/bar:grayscale-0 transition-all">
                                  {driver.flagCode === 'GB' ? '🇬🇧' : driver.flagCode === 'NL' ? '🇳🇱' : driver.flagCode === 'MC' ? '🇲🇨' : driver.flagCode === 'AU' ? '🇦🇺' : driver.flagCode === 'ES' ? '🇪🇸' : driver.flagCode === 'FR' ? '🇫🇷' : driver.flagCode === 'TH' ? '🇹🇭' : driver.flagCode === 'DE' ? '🇩🇪' : driver.flagCode === 'BR' ? '🇧🇷' : driver.flagCode === 'JP' ? '🇯🇵' : '🏁'}
                                </span>
                                <button
                                  onClick={() => setSelectedDriver(driver)}
                                  className="text-left hover:text-[#E10600] font-sans font-extrabold uppercase text-[10px] tracking-wide truncate focus:outline-none focus:ring-1 focus:ring-[#E10600] rounded px-0.5 cursor-pointer"
                                  title="View telemetry bio"
                                >
                                  {driver.code}
                                </button>
                              </div>

                              {/* Progress bar container */}
                              <div className="flex-grow bg-zinc-950/80 border border-zinc-900 rounded-lg h-5 overflow-hidden relative flex items-center px-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.5, ease: 'easeOut' }}
                                  className="absolute left-0 top-0 bottom-0 opacity-80 group-hover/bar:opacity-100 transition-opacity"
                                  style={{ backgroundColor: barColor }}
                                />
                                <span className="relative z-10 font-mono text-[9px] font-bold text-white tracking-widest pl-1">
                                  {val.toLocaleString()}
                                </span>
                              </div>

                              {/* Quick selector compare button */}
                              <div className="flex items-center">
                                <button
                                  onClick={(e) => handleCompareClick(e, driver.id)}
                                  className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all uppercase cursor-pointer"
                                  title="Load into telemetry comparison"
                                >
                                  Compare
                                </button>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>* Standings variables synced live.</span>
                    <span className="text-[#E10600] font-black uppercase">Grid Analyzer Active</span>
                  </div>
                </div>

                {/* 2. Head-to-Head Comparison Room */}
                <div className="lg:col-span-5 glass rounded-2xl p-4 md:p-6 bg-black/40 border border-zinc-800/80 flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">Dual Analytics Engine</span>
                      <h3 className="text-lg md:text-xl font-display font-black italic tracking-tighter text-white uppercase">
                        Pilot Comparison
                      </h3>
                      <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                        Select any two pilots to compare side-by-side indicators in real time.
                      </p>
                    </div>

                    {/* SELECTORS GRID */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {/* Pilot A Select */}
                      <div className="space-y-1">
                        <label htmlFor="compare-a-select" className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Pilot Alpha</label>
                        <select
                          id="compare-a-select"
                          value={compareDriverAId}
                          onChange={(e) => setCompareDriverAId(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-2.5 text-xs text-zinc-200 outline-none focus:border-[#E10600] font-mono appearance-none"
                        >
                          {driversList.map(d => (
                            <option key={d.id} value={d.id} disabled={d.id === compareDriverBId}>{d.name} ({d.code})</option>
                          ))}
                        </select>
                      </div>

                      {/* Pilot B Select */}
                      <div className="space-y-1">
                        <label htmlFor="compare-b-select" className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Pilot Beta</label>
                        <select
                          id="compare-b-select"
                          value={compareDriverBId}
                          onChange={(e) => setCompareDriverBId(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 px-2.5 text-xs text-zinc-200 outline-none focus:border-[#E10600] font-mono appearance-none"
                        >
                          {driversList.map(d => (
                            <option key={d.id} value={d.id} disabled={d.id === compareDriverAId}>{d.name} ({d.code})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* DUAL SPECS COMPARATOR LIST */}
                    {(() => {
                      const d1 = driversList.find(d => d.id === compareDriverAId) || driversList[0];
                      const d2 = driversList.find(d => d.id === compareDriverBId) || driversList[1];

                      const t1 = F1_TEAMS.find(t => t.id === d1.teamId);
                      const t2 = F1_TEAMS.find(t => t.id === d2.teamId);

                      const metrics = [
                        { key: 'championships', label: 'World Titles', lowBetter: false },
                        { key: 'careerPoints', label: 'Lifetime Points', lowBetter: false },
                        { key: 'wins', label: 'Grand Prix Wins', lowBetter: false },
                        { key: 'podiums', label: 'Podium Finishes', lowBetter: false },
                        { key: 'gps', label: 'Races Started', lowBetter: false },
                        { key: 'currentRank', label: 'Grid Standings Rank', lowBetter: true },
                      ] as const;

                      return (
                        <div className="space-y-5">
                          {/* Top mini-cards */}
                          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-900">
                            {/* Pilot Alpha Info */}
                            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-between" style={{ borderLeftColor: t1?.color || '#E10600', borderLeftWidth: 3 }}>
                              <div>
                                <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wide truncate block">{d1.teamName}</span>
                                <h4 className="text-xs font-display font-extrabold text-white truncate">{d1.name}</h4>
                                <span className="inline-block text-[10px] font-mono font-bold text-zinc-400">#{d1.number} | {d1.code}</span>
                              </div>
                            </div>
                            {/* Pilot Beta Info */}
                            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-between" style={{ borderLeftColor: t2?.color || '#E10600', borderLeftWidth: 3 }}>
                              <div>
                                <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wide truncate block">{d2.teamName}</span>
                                <h4 className="text-xs font-display font-extrabold text-white truncate">{d2.name}</h4>
                                <span className="inline-block text-[10px] font-mono font-bold text-zinc-400">#{d2.number} | {d2.code}</span>
                              </div>
                            </div>
                          </div>

                          {/* Metric Bars Comparison */}
                          <div className="space-y-3.5 font-mono text-[10px]">
                            {metrics.map(m => {
                              const val1 = d1.stats[m.key] || 0;
                              const val2 = d2.stats[m.key] || 0;

                              const is1Better = m.lowBetter ? val1 < val2 : val1 > val2;
                              const is2Better = m.lowBetter ? val2 < val1 : val2 > val1;

                              // Split styling
                              const total = val1 + val2;
                              const pct1 = total === 0 ? 50 : (val1 / total) * 100;
                              const pct2 = total === 0 ? 50 : (val2 / total) * 100;

                              return (
                                <div key={m.key} className="space-y-1">
                                  <div className="flex justify-between items-center text-[9px] font-bold">
                                    <span className={`${is1Better ? 'text-amber-400 font-extrabold' : 'text-zinc-400'}`}>
                                      {val1} {is1Better && '🏆'}
                                    </span>
                                    <span className="text-zinc-500 uppercase tracking-wider text-[8px]">{m.label}</span>
                                    <span className={`${is2Better ? 'text-amber-400 font-extrabold' : 'text-zinc-400'}`}>
                                      {is2Better && '🏆'} {val2}
                                    </span>
                                  </div>

                                  {/* Split meter */}
                                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-zinc-950 flex border border-zinc-900">
                                    <div 
                                      className="h-full transition-all duration-300" 
                                      style={{ 
                                        width: `${pct1}%`, 
                                        backgroundColor: t1?.color || '#E10600',
                                        opacity: is1Better ? 1 : 0.6
                                      }}
                                    />
                                    <div 
                                      className="h-full transition-all duration-300" 
                                      style={{ 
                                        width: `${pct2}%`, 
                                        backgroundColor: t2?.color || '#E10600',
                                        opacity: is2Better ? 1 : 0.6
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-900 flex">
                    <button
                      onClick={() => {
                        const d1 = driversList.find(d => d.id === compareDriverAId);
                        const d2 = driversList.find(d => d.id === compareDriverBId);
                        if (d1 && d2) {
                          alert(`Comparing: ${d1.name} vs ${d2.name}\n\n${d1.name} Career Focus: ${d1.careerHighlight}\n\n${d2.name} Career Focus: ${d2.careerHighlight}`);
                        }
                      }}
                      className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-300 hover:text-white transition-all uppercase cursor-pointer text-center"
                    >
                      Compare Highlight Summaries
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter controls */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    PADDOCK GRID
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Showing {filteredDrivers.length} active pilots
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Search box */}
                  <div className="relative flex-grow sm:w-64">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="driver-search-input"
                      type="text"
                      placeholder="Search pilot name, code..."
                      value={driverSearch}
                      onChange={(e) => setDriverSearch(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/30 font-mono transition-all"
                    />
                  </div>

                  {/* Team Filter Dropdown */}
                  <div className="relative flex-grow sm:w-56">
                    <Filter className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      id="driver-team-select"
                      value={driverTeamFilter}
                      onChange={(e) => setDriverTeamFilter(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-300 outline-none focus:border-[#E10600] font-mono transition-all appearance-none"
                    >
                      <option value="all">All Constructor Teams</option>
                      {F1_TEAMS.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid cards of pilots */}
              {filteredDrivers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDrivers.map(driver => {
                    const teamOf = F1_TEAMS.find(t => t.id === driver.teamId);
                    const isChampion = driver.stats.championships > 0;
                    
                    return (
                      <motion.div
                        key={driver.id}
                        id={`driver-card-${driver.id}`}
                        whileHover={{ scale: 1.02 }}
                        className="glass border border-white/10 hover:border-zinc-500 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all group relative cursor-pointer bg-black/40 focus-visible:ring-2 focus-visible:ring-[#E10600] outline-none"
                        onClick={() => setSelectedDriver(driver)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Inspect ${driver.name}, racing number ${driver.number}, representing ${driver.teamName}. Press Enter or Space to open full bio, or select comparison options below.`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedDriver(driver);
                          }
                        }}
                      >
                        {/* Team Accent Color Indicator bar */}
                        <div className="h-1.5 w-full" style={{ backgroundColor: teamOf?.color || '#E10600' }} />

                        {/* Top detail of the card */}
                        <div className="p-5 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider block uppercase">
                                {driver.teamName}
                              </span>
                              <h3 className="text-lg font-display font-black text-white mt-1 group-hover:text-[#FF2E4E] transition-all">
                                {driver.name}
                              </h3>
                            </div>
                            
                            <div className="font-mono text-zinc-700 text-2xl font-black italic select-none">
                              #{driver.number}
                            </div>
                          </div>

                          {/* Quick career specs */}
                          <div className="py-2.5 px-3 bg-zinc-900/50 border border-zinc-900 rounded-xl space-y-1.5 font-mono text-[10px] text-zinc-400">
                            <div className="flex justify-between">
                              <span>NATIONALITY:</span>
                              <span className="font-bold text-zinc-200 uppercase">{driver.country}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>TELEMETRY ABBR:</span>
                              <span className="font-bold text-zinc-200">{driver.code}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>WORLD TITLES:</span>
                              <span className="font-bold text-amber-400">{driver.stats.championships > 0 ? `${driver.stats.championships} 🏆` : 'None'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer action block */}
                        <div className="px-4 py-3 bg-zinc-900/40 border-t border-zinc-900/80 flex items-center justify-between gap-1.5 text-xs font-display font-bold uppercase tracking-wider group-hover:bg-zinc-900 transition-all">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDriver(driver);
                            }}
                            className="flex items-center gap-1.5 text-[#E10600] hover:text-[#FF1C14] transition-all text-[11px] font-bold focus-visible:ring-1 focus-visible:ring-[#E10600] outline-none rounded p-1 cursor-pointer"
                            aria-label={`Inspect Bio telemetry of ${driver.name}`}
                          >
                            <span>Inspect Bio</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompareClick(e, driver.id);
                            }}
                            className="bg-zinc-800/80 hover:bg-[#E10600] text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#E10600] px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wide transition-all focus-visible:ring-1 focus-visible:ring-white outline-none cursor-pointer flex items-center"
                            aria-label={`Compare ${driver.name}`}
                          >
                            <span>⚖️ Compare</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl">
                  <ShieldAlert className="w-10 h-10 text-zinc-600 mx-auto" />
                  <p className="text-sm font-mono text-zinc-500 mt-2">
                    Zero telemetry packets match the active filter criteria. Check spelling limits.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: CONSTRUCTOR TEAMS */}
          {activeTab === 'teams' && (
            <motion.div
              key="teams"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Tech Header overview */}
              <div className="glass rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 border-l-4 border-l-[#E10600]">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black italic tracking-tighter text-white uppercase">
                    MANUFACTURER CONSTRUCTORS
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Browse team tech campuses and power unit specifications
                  </p>
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="team-search-input"
                    type="text"
                    placeholder="Search principal, chassis..."
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 outline-none focus:border-[#E10600] font-mono transition-all"
                  />
                </div>
              </div>

              {/* Main constructor interaction splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left side list of constructors */}
                <div className="lg:col-span-4 space-y-2.5">
                  {filteredTeams.map(team => {
                    const isSelected = activeTeamDetail === team.id;
                    return (
                      <button
                        key={team.id}
                        id={`team-selector-${team.id}`}
                        onClick={() => setActiveTeamDetail(team.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between relative overflow-hidden cursor-pointer ${
                          isSelected 
                            ? 'bg-zinc-900 border-zinc-700/80 shadow-md' 
                            : 'bg-zinc-950/40 border-zinc-900/60 hover:bg-zinc-900/20 hover:border-zinc-800'
                        }`}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: team.color }} />
                        <div className="pl-1">
                          <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">{team.fullName}</h4>
                          <h3 className="text-sm font-display font-bold text-white mt-0.5">{team.name}</h3>
                        </div>
                        <span className="font-mono text-zinc-600 text-xs font-bold leading-normal">
                          {team.logoChar}-{team.entryYear}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right side detailed Profile Card */}
                <div className="lg:col-span-8">
                  {(() => {
                    const team = F1_TEAMS.find(t => t.id === activeTeamDetail);
                    if (!team) return null;

                    return (
                      <motion.div
                        key={team.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111116] border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden"
                      >
                        {/* Glow accent */}
                        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: team.color }} />

                        {/* Top team identifiers */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-85 * border-zinc-900">
                          <div>
                            <span 
                              className="text-xs font-bold font-mono tracking-widest px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 inline-block mb-2 uppercase"
                              style={{ color: team.color }}
                            >
                              Est. {team.entryYear} constructor
                            </span>
                            <h2 className="text-2xl md:text-3.5xl font-display font-black text-white tracking-tight uppercase">
                              {team.fullName}
                            </h2>
                            <p className="text-zinc-400 text-xs font-mono mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-zinc-500" /> Headquarters base: {team.base}
                            </p>
                          </div>

                          <div className="text-right font-mono text-xs bg-zinc-950 p-3.5 border border-zinc-900 rounded-xl min-w-[150px]">
                            <p className="text-zinc-500 text-[9px] uppercase tracking-wider leading-none">Constructor Points</p>
                            <p className="text-lg font-black text-white mt-1">Global Standard</p>
                            <p className="text-amber-500 font-extrabold text-[10px] mt-1 pr-1">Championships: {team.stats.championships} 🏆</p>
                          </div>
                        </div>

                        {/* History profile */}
                        <div>
                          <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">Technical Origin Archive</h3>
                          <p className="text-zinc-305 text-sm leading-relaxed antialiased">
                            {team.longHistory}
                          </p>
                        </div>

                        {/* Spec table */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-zinc-900">
                          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 font-mono">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">TEAM PRINCIPAL</span>
                            <span className="text-xs font-bold text-zinc-200 mt-1 block">{team.principal}</span>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 font-mono">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">TECH DIRECTOR / CTO</span>
                            <span className="text-xs font-bold text-zinc-200 mt-1 block">{team.techChief}</span>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 font-mono">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">CHASSIS CELL MODEL</span>
                            <span className="text-xs font-bold text-zinc-200 mt-1 block">{team.chassis}</span>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 font-mono">
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">POWER UNIT MODEL</span>
                            <span className="text-xs font-bold text-zinc-200 mt-1 block h-auto">{team.powerUnit}</span>
                          </div>
                        </div>

                        {/* stats summary */}
                        <div className="bg-zinc-900/30 p-4 border border-zinc-800/40 rounded-xl font-mono text-[11px] grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-zinc-500">Wins overall in F1 History:</span>
                            <p className="text-sm font-bold text-zinc-250 mt-0.5">{team.stats.wins}</p>
                          </div>
                          <div>
                            <span className="text-zinc-500">Podium finishes overall:</span>
                            <p className="text-sm font-bold text-zinc-250 mt-0.5">{team.stats.podiums}</p>
                          </div>
                          <div>
                            <span className="text-zinc-500">Fastest lap telemetries:</span>
                            <p className="text-sm font-bold text-zinc-250 mt-0.5">{team.stats.fastestLaps}</p>
                          </div>
                        </div>

                        {/* Sponsors associated */}
                        <div className="pt-2">
                          <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">Prominent Brand Sponsors</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {team.sponsors.map((sp, sIdx) => (
                              <span 
                                key={sIdx}
                                className="text-[10px] bg-zinc-950 py-1.5 px-3 border border-zinc-900 text-zinc-300 font-mono rounded-lg hover:text-white transition-all hover:bg-zinc-900"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: RACE SCHEDULE */}
          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Schedule header */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    RACE SCHEDULE & TICKETS
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Browse chronological 2026 GP calendar and simulate grandstand ticket passes
                  </p>
                </div>

                {/* Progress filters states */}
                <div className="flex gap-1.5 bg-zinc-900/60 border border-zinc-800/40 p-1 rounded-xl">
                  {[
                    { id: 'all', label: 'All GPs' },
                    { id: 'completed', label: 'Completed' },
                    { id: 'ongoing', label: 'Ongoing' },
                    { id: 'upcoming', label: 'Upcoming' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setScheduleFilter(f.id)}
                      className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-all cursor-pointer ${
                        scheduleFilter === f.id
                          ? 'bg-[#E10600] text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Race schedule calendar list */}
              <div className="space-y-4">
                {filteredRaces.map(race => {
                  return (
                    <div
                      key={race.round}
                      className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between hover:border-zinc-700/60 transition-all"
                    >
                      {/* Left: Round & General track name */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-zinc-900 text-center font-mono min-w-[55px] border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">RD</span>
                          <span className="text-xl font-black text-white">{race.round}</span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-display font-semibold text-white tracking-tight">
                              {race.name}
                            </h3>
                            {race.status === 'ongoing' && (
                              <span className="text-[9px] bg-emerald-500 text-black font-mono font-black py-0.5 px-2 rounded-full uppercase animate-pulse">
                                Live Weekend
                              </span>
                            )}
                            {race.status === 'completed' && (
                              <span className="text-[9px] bg-zinc-800 text-zinc-400 font-mono font-bold py-0.5 px-2 rounded-full uppercase">
                                GP Completed
                              </span>
                            )}
                          </div>
                          
                          <p className="text-zinc-350 text-sm mt-0.5">{race.circuit}</p>
                          <p className="text-zinc-500 text-[11px] font-mono mt-1 flex items-center gap-1 bg-zinc-900/30 py-1 px-2.5 rounded border border-zinc-900 inline-block">
                            <span>📍 {race.location}</span> &bull; 📅 {race.date}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Technical Spec details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-900/60 w-full lg:w-auto">
                        <div>
                          <span className="text-zinc-500 uppercase tracking-widest block font-bold text-[9px]">Laps count</span>
                          <span className="text-zinc-300 font-semibold mt-0.5 block">{race.laps} Laps</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase tracking-widest block font-bold text-[9px]">Track distance</span>
                          <span className="text-zinc-300 font-semibold mt-0.5 block">{(race.lengthKm * race.laps).toFixed(1)} km</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-zinc-500 uppercase tracking-widest block font-bold text-[9px]">Lap Record Time</span>
                          <span className="text-zinc-300 font-semibold mt-0.5 block text-[11px]">
                            {race.lapRecord.time} <span className="text-[9px] text-zinc-500">by {race.lapRecord.holder}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right side: Winner or Ticket action block */}
                      <div className="pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-900/60 flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
                        {race.status === 'completed' && race.topThree && (
                          <div className="bg-zinc-900/40 p-3 border border-zinc-904 border-zinc-900 rounded-xl font-mono text-[10px]">
                            <span className="text-zinc-500 uppercase tracking-widest font-black text-[9px] block mb-1">RACE PODIUM RESULTS</span>
                            <div className="text-zinc-200">
                              🥇 <span className="font-semibold text-white">{race.topThree[0]}</span> &bull; 🥈 {race.topThree[1]} &bull; 🥉 {race.topThree[2]}
                            </div>
                          </div>
                        )}

                        {(race.status === 'upcoming' || race.status === 'ongoing') && (
                          <button
                            id={`book-ticket-${race.round}`}
                            onClick={() => setSelectedGPForTicket(race)}
                            className="w-full lg:w-auto px-4.5 py-3 rounded-xl bg-zinc-900 hover:bg-[#E10600] text-zinc-300 hover:text-white font-display text-xs font-semibold uppercase tracking-wider border border-zinc-800 hover:border-[#E10600] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Ticket className="w-4 h-4 text-[#E10600] group-hover:text-white" />
                            Secure Virtual Fan Pass
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Simulated Ticket booking modal popup overlay */}
              <AnimatePresence>
                {selectedGPForTicket && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedGPForTicket(null)} />
                    
                    <motion.div
                      id="ticket-modal"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#111115] border border-zinc-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative z-10 p-6 md:p-8 space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <span className="w-12 h-12 rounded-full bg-[#E10600]/10 border border-[#E10600]/30 flex items-center justify-center mx-auto text-[#FF1C14] text-lg font-black font-mono">
                          F1
                        </span>
                        <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                          Simulation Pass Booking Center
                        </h3>
                        <p className="text-zinc-400 text-xs font-mono max-w-xs mx-auto">
                          Choose paddock grandstand configurations for {selectedGPForTicket.name}
                        </p>
                      </div>

                      {ticketSuccess ? (
                        <div className="py-6 text-center space-y-3">
                          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                          <p className="text-sm font-mono text-zinc-300 uppercase font-black">
                            Telemetry Pass generated successfully
                          </p>
                          <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                            The virtual wallet ledger has appended the code <span className="text-[#FF1C14] font-bold">F1-26-GEN</span>. Complete the booking mock in your browser.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleTicketBooking} className="space-y-4">
                          <div>
                            <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1">SELECTED ROUND</label>
                            <input 
                              type="text" 
                              disabled 
                              value={`ROUND ${selectedGPForTicket.round}: ${selectedGPForTicket.name}`}
                              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-zinc-400 outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block mb-1">GRANDSTAND CATEGORY</label>
                            <select
                              id="seat-class-select"
                              value={ticketSeatClass}
                              onChange={(e) => setTicketSeatClass(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none font-mono focus:border-[#E10600] text-normal select-classes"
                            >
                              <option value="grandstand">Main Pit Lane Grandstand - Gold Spot</option>
                              <option value="paddock-club">Exotic Paddock Club Luxury Suites - Red Pass</option>
                              <option value="curb-side">Eau Rouge/Hairpin Slope Apex - Bronze Pass</option>
                              <option value="general">Curb Side General Admission - Steel Tier</option>
                            </select>
                          </div>

                          <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl font-mono text-[10px] text-zinc-500 space-y-1">
                            <div className="flex justify-between">
                              <span>MOCK VALUE TARIFF:</span>
                              <span className="font-bold text-emerald-500">$0.00 FREE (SIMULATION MODE)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ACCESS BOUNDS:</span>
                              <span className="text-zinc-400 font-semibold">Includes Paddock Walk & Free WiFi</span>
                            </div>
                          </div>

                          <div className="flex gap-2.5">
                            <button
                              type="button"
                              onClick={() => setSelectedGPForTicket(null)}
                              className="w-1/2 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider font-display cursor-pointer"
                            >
                              Abort
                            </button>
                            <button
                              id="confirm-ticket-submit"
                              type="submit"
                              className="w-1/2 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1C14] text-white text-xs font-semibold uppercase tracking-wider font-display cursor-pointer"
                            >
                              Print Ticket
                            </button>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Booked tickets ledger feed display */}
              {bookedTickets.length > 0 && (
                <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl space-y-4">
                  <h4 className="text-sm font-mono font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-emerald-500" /> Booked Passes virtual wallet ledger
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {bookedTickets.map((t, index) => (
                      <div key={index} className="bg-zinc-950/80 p-4 border border-zinc-900 rounded-xl font-mono text-xs flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white truncate max-w-[180px]">{t.gpName}</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{t.seatClass} &bull; CODE: {t.ticketCode}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 uppercase bg-emerald-500/10 py-1 px-2.5 rounded border border-emerald-500/20">
                          Active Pass
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 5: HELMET GALLERY */}
          {activeTab === 'helmets' && (
            <motion.div
              key="helmets"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Helmets intro panel */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    HELMET EXHIBITION GALLERY
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Close-up visual and design breakdowns for every helmet worn on the grid
                  </p>
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="helmet-search-bar"
                    type="text"
                    placeholder="Search driver helmet colors..."
                    value={helmetSearch}
                    onChange={(e) => setHelmetSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 outline-none focus:border-[#D40026] font-mono transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left block list of active pilots with helmet previews on small nodes */}
                <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {driversList.filter(d => {
                    const hTerm = helmetSearch.toLowerCase();
                    return d.name.toLowerCase().includes(hTerm) || d.helmet.colorScheme.toLowerCase().includes(hTerm);
                  }).map(d => {
                    const teamColor = F1_TEAMS.find(t => t.id === d.teamId)?.color || '#fff';
                    const isSelected = activeHelmetDriverId === d.id;
                    
                    return (
                      <button
                        key={d.id}
                        id={`helmet-select-${d.id}`}
                        onClick={() => setActiveHelmetDriverId(d.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-zinc-900 border-zinc-700' 
                            : 'bg-zinc-950/40 border-zinc-900/60 hover:bg-zinc-900/30 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono font-black text-[9px] text-zinc-950" style={{ backgroundColor: teamColor }}>
                            {d.code[0]}
                          </div>
                          <div>
                            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{d.teamName}</h4>
                            <h3 className="text-sm font-display font-medium text-white leading-normal">{d.name}</h3>
                          </div>
                        </div>

                        {/* Miniature color dots swatches */}
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full border border-zinc-85 * border-zinc-800" style={{ backgroundColor: d.helmet.baseColor }} />
                          <span className="w-2.5 h-2.5 rounded-full border border-zinc-85 * border-zinc-800" style={{ backgroundColor: d.helmet.accentColor }} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right block: Large graphic showcase design center */}
                <div className="lg:col-span-7">
                  {currentHelmetDriver && (
                    <motion.div
                      key={currentHelmetDriver.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#111116] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
                    >
                      {/* Gradient aura banner backing */}
                      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b opacity-10 pointer-events-none" style={{
                        backgroundImage: `linear-gradient(180deg, ${currentHelmetDriver.helmet.baseColor} 0%, transparent 100%)`
                      }} />

                      {/* Header block details */}
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-zinc-900 relative z-10">
                        <div>
                          <span className="text-xs font-bold font-mono tracking-widest uppercase mb-1 inline-block" style={{ color: currentHelmetTeam?.color }}>
                            #{currentHelmetDriver.number} &bull; GRID LIVERY SPECS
                          </span>
                          <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase">
                            {currentHelmetDriver.name} Helmet Detail
                          </h2>
                          <p className="text-zinc-404 text-zinc-400 text-xs font-mono mt-0.5">
                            Livery Scheme: <span className="text-zinc-250 font-bold">{currentHelmetDriver.helmet.colorScheme}</span>
                          </p>
                        </div>

                        <div className="text-right flex items-center gap-1 bg-zinc-950 py-1.5 px-3 border border-zinc-900 rounded-lg">
                          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentHelmetDriver.helmet.accentColor }} />
                          <span className="font-mono text-[9px] text-zinc-400 uppercase font-black">EXHIBITED LIVERY</span>
                        </div>
                      </div>

                      {/* Big close-up visual generated via fully stylized custom vector */}
                      <div className="h-64 bg-zinc-950 rounded-2xl flex items-center justify-center p-6 border border-zinc-900 relative shadow-inner overflow-hidden">
                        
                        {/* Background structural drafting circles */}
                        <div className="absolute inset-x-0 inset-y-0 opacity-5" style={{
                          backgroundImage: 'radial-gradient(ellipse at center, #ffffff 1px, transparent 1px)',
                          backgroundSize: '16px 16px'
                        }} />

                        {/* Technical draft axes */}
                        <div className="absolute inset-x-0 h-px bg-zinc-800/20 top-1/2" />
                        <div className="absolute inset-y-0 w-px bg-zinc-800/20 left-1/2" />

                        {/* Major SVG high fidelity vector helmet illustration */}
                        <svg className="w-52 h-52 drop-shadow-2xl relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          
                          {/* Inner Shadow sphere */}
                          <circle cx="50" cy="50" r="44" fill="#060608" opacity="0.3" />

                          {/* Primary helmet dome structure cap */}
                          <path 
                            d="M16,52 C16,22 36,15 56,15 C76,15 84,24 84,45 C84,60 80,75 75,80 C68,85 50,85 41,85 C26,85 20,78 16,70" 
                            fill={currentHelmetDriver.helmet.baseColor} 
                            stroke="#18181c" 
                            strokeWidth="1.2" 
                          />
                          
                          {/* Aero Diffusers and spoiler arrays */}
                          <path 
                            d="M74,35 C80,38 86,43 85,50 C82,53 80,50 78,48 Z" 
                            fill={currentHelmetDriver.helmet.accentColor} 
                            stroke="#0d0d11" 
                            strokeWidth="0.5" 
                            opacity="0.9"
                          />

                          {/* Secondary color sweep wrapping contours */}
                          <path 
                            d="M16,56 C28,45 42,42 62,48 C75,52 82,54 81,64 C70,68 45,68 30,68 C22,68 16,60 16,56 Z" 
                            fill={currentHelmetDriver.helmet.accentColor} 
                            stroke="#222"
                            strokeWidth="0.5"
                            opacity="0.85" 
                          />
                          
                          <path 
                            d="M24,32 C38,24 58,26 76,34 L78,39 C58,30 38,28 24,34 Z" 
                            fill={currentHelmetDriver.helmet.accentColor} 
                            opacity="0.4" 
                          />

                          {/* Visor block base */}
                          <path 
                            d="M36,34 C54,30 76,34 81,43 L82,51 C74,45 54,41 36,43 Z" 
                            fill="#111" 
                            stroke="#1d222b" 
                            strokeWidth="0.7" 
                          />

                          {/* Visor lens glass with premium neon gradient flare */}
                          <path 
                            d="M38,36 C54,32 74,36 79,44 L80,49 C72,43 54,39 38,41 Z" 
                            fill="url(#exhibitVisorGrad)" 
                            stroke="#1a1a1e" 
                            strokeWidth="0.5" 
                          />

                          {/* Chin Guard Ventilation mesh layout */}
                          <path d="M16,62 C23,66 33,70 38,70 L34,74 C26,74 20,70 16,62 Z" fill="#2c2c35" opacity="0.8" />
                          <line x1="22" y1="64" x2="26" y2="72" stroke="#111" strokeWidth="0.7" />
                          <line x1="25" y1="63" x2="29" y2="71" stroke="#111" strokeWidth="0.7" />
                          <line x1="28" y1="62" x2="32" y2="70" stroke="#111" strokeWidth="0.7" />

                          {/* Visor bolt caps pivots */}
                          <circle cx="37.5" cy="38.5" r="1.5" fill="#e2ac24" />
                          <circle cx="78.5" cy="46.5" r="1.5" fill="#e2ac24" />

                          {/* Helmet Air Intake scoop on top crown */}
                          <path d="M42,16 C48,13 56,13 62,16 C58,15 48,15 42,16 Z" fill="#222" stroke="#111" strokeWidth="0.5" />

                          {/* Giant numerical block decal */}
                          <rect x="25" y="50" width="10" height="8" rx="1" fill="#fff" stroke="#ccc" strokeWidth="0.3" />
                          <text x="30" y="56.5" fill="#000" fontSize="6.2" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                            {currentHelmetDriver.number}
                          </text>

                          {/* Exhibits Visor Gradient */}
                          <defs>
                            <linearGradient id="exhibitVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#121316" />
                              <stop offset="50%" stopColor="#202530" />
                              <stop offset="100%" stopColor={currentHelmetDriver.helmet.accentColor} stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Spec swatch values overlay */}
                        <div className="absolute top-4 right-4 text-xs font-mono bg-zinc-900 border border-zinc-800 p-3 rounded-xl space-y-1 z-10 text-zinc-450 leading-none">
                          <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">COLOR SWATCH</p>
                          <p className="flex items-center gap-1.5 text-zinc-250"><span className="w-2.5 h-2.5 inline-block rounded" style={{ backgroundColor: currentHelmetDriver.helmet.baseColor }} /> BASE: {currentHelmetDriver.helmet.baseColor}</p>
                          <p className="flex items-center gap-1.5 text-zinc-250"><span className="w-2.5 h-2.5 inline-block rounded" style={{ backgroundColor: currentHelmetDriver.helmet.accentColor }} /> ACCENT: {currentHelmetDriver.helmet.accentColor}</p>
                        </div>
                      </div>

                      {/* Decals design narrative data rows */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                        <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">CROWN DECAL PATTERN</span>
                          <span className="text-xs font-medium text-zinc-200 block">{currentHelmetDriver.helmet.topFeature}</span>
                        </div>
                        <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl space-y-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">REAR PANEL EMBLEM</span>
                          <span className="text-xs font-medium text-zinc-200 block">{currentHelmetDriver.helmet.rearSymbol}</span>
                        </div>
                      </div>

                      {/* Design history write-up */}
                      <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                        <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">VISUAL ARCHITECTURE STORY</h4>
                        <p className="text-zinc-350 text-xs italic leading-relaxed antialiased">
                          &ldquo;{currentHelmetDriver.helmet.designStory}&rdquo;
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 6: TROPHY & HISTORY TIMELINE */}
          {activeTab === 'trophies' && (
            <motion.div
              key="trophies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Profile Intro */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    SILVERWARE MUSEUM & TIMELINE
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Explore original championship trophies and historic F1 milestone epochs
                  </p>
                </div>
              </div>

              {/* Grid 1: Silverware interactive cabinets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left side list of trophies */}
                <div className="lg:col-span-4 space-y-2.5">
                  {F1_TROPHIES.map(trophy => {
                    const isSelected = activeTrophyId === trophy.id;
                    return (
                      <button
                        key={trophy.id}
                        id={`trophy-select-${trophy.id}`}
                        onClick={() => setActiveTrophyId(trophy.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between relative cursor-pointer ${
                          isSelected 
                            ? 'bg-zinc-900 border-zinc-700 shadow-md' 
                            : 'bg-zinc-950/40 border-zinc-900/60 hover:bg-zinc-900/20 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Trophy className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                          <div>
                            <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">FIA Silver Cabinet</h4>
                            <h3 className="text-sm font-display font-bold text-white mt-0.5">{trophy.name.split('World')[0].split('FIA')[0]} Cup</h3>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-700'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right side trophy specs profiles */}
                <div className="lg:col-span-8">
                  {(() => {
                    const trophy = F1_TROPHIES.find(t => t.id === activeTrophyId);
                    if (!trophy) return null;

                    return (
                      <motion.div
                        key={trophy.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111116] border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden"
                      >
                        {/* Golden backdrop glow circle */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />

                        {/* Header details */}
                        <div className="pb-4 border-b border-zinc-900">
                          <span className="text-[10px] font-mono font-bold text-amber-500 tracking-widest uppercase inline-block mb-1 bg-amber-500/10 py-1 px-2.5 rounded border border-amber-500/20">
                            First instated in {trophy.originYear}
                          </span>
                          <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase mt-1">
                            {trophy.name}
                          </h2>
                          <p className="text-zinc-400 text-xs font-mono mt-1 leading-normal">
                            Significance: <span className="font-semibold text-zinc-300">{trophy.significance}</span>
                          </p>
                        </div>

                        {/* Physical specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                          <div className="bg-zinc-950 p-4 border border-zinc-900 rounded-xl space-y-1">
                            <span className="text-zinc-500 uppercase tracking-widest block font-bold text-[9px]">PHYSICAL MASS</span>
                            <span className="text-zinc-300 font-bold block">{trophy.weightKr}</span>
                          </div>
                          <div className="bg-zinc-950 p-3.5 border border-zinc-900 rounded-xl space-y-1">
                            <span className="text-zinc-500 uppercase tracking-widest block font-bold text-[9px]">ENGINEERING MATERIALS</span>
                            <span className="text-zinc-300 font-bold block h-auto">{trophy.materials}</span>
                          </div>
                        </div>

                        {/* History write up info */}
                        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1.5">
                          <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">HISTORICAL ORIGIN CONTEXT</h4>
                          <p className="text-zinc-300 text-sm leading-relaxed antialiased">
                            {trophy.historicalContext}
                          </p>
                        </div>

                        {/* Anecdotes points */}
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">PADDOCK ANECDOTES LOGS</h4>
                          <ul className="space-y-2">
                            {trophy.anecdotes.map((anec, aIdx) => (
                              <li 
                                key={aIdx} 
                                className="p-3 bg-zinc-900/30 border border-zinc-800/40 rounded-xl text-zinc-350 text-xs flex items-start gap-2 leading-relaxed"
                              >
                                <span className="text-amber-500 font-black text-sm select-none">&bull;</span>
                                <span>{anec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>

              </div>

              {/* Grid 2: Historical Timeline Slider */}
              <div className="bg-zinc-950 border border-zinc-805 border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                    HISTORIC F1 EVOLUTION TIMELINE [1950 - today]
                  </h3>
                  <p className="text-zinc-500 text-xs font-mono">
                    Slide through the major epochs of rule changes and carbon safety innovations
                  </p>
                </div>

                {/* Timeline slider selector nodes row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-zinc-900">
                  {historyTimeline.map((time, tIdx) => {
                    const isSelected = activeHistoryEra === tIdx;
                    return (
                      <button
                        key={time.year}
                        id={`timeline-node-${time.year}`}
                        onClick={() => setActiveHistoryEra(tIdx)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#D40026] text-white' 
                            : 'bg-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {time.year}
                      </button>
                    );
                  })}
                </div>

                {/* Timeline content frame */}
                <motion.div
                  key={activeHistoryEra}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <span className="text-xs font-bold font-mono text-[#FF2E4E] uppercase tracking-widest block bg-[#D40026]/10 py-1 px-2.5 rounded border border-[#D40026]/20 inline-block">
                    ERA Milestone Node - Year {historyTimeline[activeHistoryEra].year}
                  </span>
                  <h4 className="text-xl font-display font-bold text-white tracking-tight uppercase">
                    {historyTimeline[activeHistoryEra].event}
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed antialiased max-w-3xl">
                    {historyTimeline[activeHistoryEra].desc}
                  </p>
                </motion.div>
              </div>

            </motion.div>
          )}

          {/* TAB 7: GLOBAL PARTNERS SPONSORS */}
          {activeTab === 'sponsors' && (
            <motion.div
              key="sponsors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header profile */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    GLOBAL CORPORATE PARTNERS
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Inspect sponsors HQ, sponsorship category role, and multi-team backing
                  </p>
                </div>
              </div>

              {/* Sponsors Cards loop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSponsors.map(sponsor => (
                  <div
                    key={sponsor.id}
                    className="bg-[#111116] border border-zinc-800 rounded-2xl p-5 md:p-6 space-y-4 hover:border-zinc-75 * hover:border-zinc-700 transition-all relative overflow-hidden"
                  >
                    {/* Header info */}
                    <div className="flex justify-between items-start pb-3 border-b border-zinc-900">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                          {sponsor.category}
                        </span>
                        <h3 className="text-lg font-display font-bold text-white mt-0.5 tracking-tight uppercase">
                          {sponsor.name}
                        </h3>
                      </div>

                      <span className="font-mono text-[9px] text-[#FF2E4E] font-black uppercase bg-[#D40026]/10 p-1.5 rounded border border-[#D40026]/20">
                        EST. {sponsor.founded}
                      </span>
                    </div>

                    {/* Meta specifics */}
                    <p className="text-zinc-400 text-[11.5px] font-mono flex items-center gap-1 leading-none py-1.5">
                      <span>🌏 HQ Location: {sponsor.hq}</span>
                    </p>

                    {/* Overview description */}
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {sponsor.overview}
                    </p>

                    {/* Relationship context with F1 */}
                    <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1.5 text-xs">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block font-bold">Relationship & Engineering Contribution</span>
                      <p className="text-zinc-400 italic leading-relaxed">
                        &ldquo;{sponsor.relationshipWithF1}&rdquo;
                      </p>
                    </div>

                    {/* Funded teams */}
                    <div className="pt-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block font-bold mb-1.5">Associated Backed Constructors</span>
                      <div className="flex flex-wrap gap-1.5">
                        {sponsor.associatedTeams.map((assocTeam, assocIdx) => (
                          <span 
                            key={assocIdx}
                            className="text-[10px] bg-zinc-950 py-1.5 px-3 border border-zinc-900 font-mono text-zinc-300 rounded inline-block"
                          >
                            🛡️ {assocTeam}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 8: CONTACT PANEL & SUBMISSIONS HISTORY */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header profile */}
              <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black text-white tracking-tight uppercase">
                    CONTACT TEAM & COMMS DESK
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                    Submit media inquiries or write queries concerning driver telemetry packets
                  </p>
                </div>
              </div>

              {/* Comms division blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left block form desk */}
                <div className="lg:col-span-7 bg-[#111115] border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                      Write Paddock Comms Inquiry
                    </h3>
                    <p className="text-zinc-500 text-xs font-mono">
                      Your communications sync directly with our simulated local storage index
                    </p>
                  </div>

                  {formSuccess && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2 animate-pulse">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Telemetry check: Communication packet formatted and queued successfully! Refer to ledger below.
                    </div>
                  )}

                  {formError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Marshal Hamilton"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-200 outline-none focus:border-[#D40026] focus:ring-1 focus:ring-[#D40026]/20 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Communications Link (Email)</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="hamilton@prancinghorse.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-200 outline-none focus:border-[#D40026] focus:ring-1 focus:ring-[#D400 * #D40026]/20 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Favorite Team constructor</label>
                        <select
                          id="contact-fav-team"
                          value={contactTeam}
                          onChange={(e) => setContactTeam(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-300 outline-none font-mono focus:border-[#D40026]"
                        >
                          {F1_TEAMS.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Favorite Present Driver</label>
                        <select
                          id="contact-fav-driver"
                          value={contactDriver}
                          onChange={(e) => setContactDriver(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-300 outline-none font-mono focus:border-[#D40026]"
                        >
                          {driversList.map(driver => (
                            <option key={driver.id} value={driver.name}>{driver.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Communication Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Inquiry for wind-tunnel aerodynamics telemetry telemetry check"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-200 outline-none focus:border-[#D40026] focus:ring-1 focus:ring-[#D40026]/20 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-zinc-500 block mb-1 uppercase">Detailed Message Content</label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="State your technical request, proposal or telemetry audit questions completely..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-4 text-xs text-zinc-200 outline-none focus:border-[#D40026] focus:ring-1 focus:ring-[#D400]/20 font-mono leading-relaxed"
                      />
                    </div>

                    <button
                      id="submit-contact-button"
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-[#D40026] hover:bg-[#FF2E4E] text-white text-xs font-bold uppercase tracking-wider font-display flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Dispatch Paddock Comms
                    </button>

                  </form>
                </div>

                {/* Right block: General contacts & in-session archives log */}
                <div className="lg:col-span-5 space-y-6">
                  {/* General office phone links */}
                  <div className="bg-zinc-950 p-6 border border-zinc-900 rounded-2xl space-y-4">
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      FIA PADDOCK OFFICIAL CONTACTS
                    </h3>
                    <div className="space-y-2.5 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 block">ENSTONE TECH DIVISION:</span>
                        <span className="text-zinc-200 font-bold block">+44 (0) 1608 678000</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">MARANELLO FRONT OFFICE:</span>
                        <span className="text-zinc-200 font-bold block">+39 0536 949111</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">MEDIA COMMITTAL:</span>
                        <span className="text-zinc-200 font-bold block">press@fiaf1hub.net</span>
                      </div>
                    </div>
                  </div>

                  {/* Log inbox of entries */}
                  <div className="bg-zinc-950 p-6 border border-zinc-900 rounded-2xl space-y-4 min-h-[220px]">
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      COMMUNICATIONS LEDGER ({submittedInquiries.length} logged packets)
                    </h3>
                    {submittedInquiries.length > 0 ? (
                      <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                        {submittedInquiries.map((iq, iIdx) => (
                          <div 
                            key={iIdx}
                            className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl font-mono text-[10.5px] space-y-1.5"
                          >
                            <div className="flex justify-between font-bold text-zinc-300">
                              <span>By: {iq.name}</span>
                              <span className="text-[#FF2E4E]">QUEUED</span>
                            </div>
                            <p className="text-[#FF2E4E] text-[10px]">SUBJ: {iq.subject}</p>
                            <p className="text-zinc-400 italic font-sans text-xs pt-1 border-t border-zinc-800 leading-normal">
                              &ldquo;{iq.message}&rdquo;
                            </p>
                            <div className="text-[9px] text-zinc-500 flex justify-between">
                              <span>Fav Team: {iq.favoriteTeam.toUpperCase()}</span>
                              <span>Email: {iq.email}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 space-y-2">
                        <HelpCircle className="w-8 h-8 text-zinc-75 * text-zinc-800 mx-auto" />
                        <p className="text-[10px] font-mono text-zinc-600">
                          Inactive network. Your submissions will append as active node streams on dispatch.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Driver telemetry modal slot */}
      <DriverModal 
        driver={selectedDriver}
        team={F1_TEAMS.find(t => t.id === selectedDriver?.teamId)}
        onClose={() => setSelectedDriver(null)}
      />

      {/* Primary Global Paddock Footer */}
      <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A] py-8 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-black italic text-white transform skew-x-[-12deg] bg-[#E10600] text-sm px-2 py-0.5 rounded">F1 DISCOVERY</span>
            <span className="font-mono text-[10px]">© 2026 Amar Mohammed and it's brivo . All Rights Respected.</span>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-[10px]">
            <a href="#drivers" onClick={() => { setActiveTab('drivers'); window.scrollTo(0,0); }} className="hover:text-zinc-300">Pilots</a>
            <a href="#teams" onClick={() => { setActiveTab('teams'); window.scrollTo(0,0); }} className="hover:text-zinc-300">Constructors</a>
            <a href="#schedule" onClick={() => { setActiveTab('schedule'); window.scrollTo(0,0); }} className="hover:text-zinc-300">Calendar</a>
            <a href="#helmets" onClick={() => { setActiveTab('helmets'); window.scrollTo(0,0); }} className="hover:text-zinc-300">Helms</a>
            <a href="#sponsors" onClick={() => { setActiveTab('sponsors'); window.scrollTo(0,0); }} className="hover:text-zinc-300">Sponsorships</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
