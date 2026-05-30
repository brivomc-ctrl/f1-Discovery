import { Driver, Team, RaceGP, TrophyInfo, SponsorInfo } from '../types';

export const F1_TEAMS: Team[] = [
  {
    id: 'mclaren',
    name: 'McLaren Racing',
    fullName: 'McLaren Formula 1 Team',
    base: 'Woking, United Kingdom',
    principal: 'Andrea Stella',
    techChief: 'Rob Marshall (Technical)' ,
    chassis: 'MCL38',
    powerUnit: 'Mercedes-AMG M15 E Performance',
    entryYear: 1966,
    color: '#FF8700', // Papaya orange
    borderColor: 'border-[#FF8700]',
    logoChar: 'MC',
    stats: {
      championships: 8,
      wins: 188,
      podiums: 508,
      fastestLaps: 169
    },
    longHistory: 'Founded by local hero Bruce McLaren in 1963, McLaren is the second-oldest active constructor in Formula 1 history and one of the most successful. Dominating eras in the late 1980s with Senna and Prost, and late 1990s with Häkkinen, McLaren recently resurrected under Stella’s leadership is back to the absolute front of the grid, showing remarkable aerodynamic development in Papaya Orange.',
    sponsors: ['Google Chrome', 'OKX', 'Dell Technologies', 'Monster Energy', 'DP World', 'Velo', 'Jack Daniel’s']
  },
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    base: 'Milton Keynes, United Kingdom',
    principal: 'Christian Horner',
    techChief: 'Pierre Waché',
    chassis: 'RB22',
    powerUnit: 'Red Bull Ford Powertrains',
    entryYear: 2005,
    color: '#3671C6', // Racing Blue
    borderColor: 'border-[#3671C6]',
    logoChar: 'RB',
    stats: {
      championships: 6,
      wins: 122,
      podiums: 280,
      fastestLaps: 97
    },
    longHistory: 'Entering the sport in 2005 after purchasing Jaguar, Red Bull Racing transformed the grid. Designed by aerodynamic wizard Adrian Newey, they swept four straight double championships with Sebastian Vettel (2010–2013) and rebuilt another dynasty around Max Verstappen. Operating from Milton Keynes, Red Bull utilizes aggressive race strategy and high-velocity aero designs.',
    sponsors: ['Oracle', 'Bybit', 'Mobil 1', 'Castrol', 'Tag Heuer', 'Hard Rock', 'Rauch', 'HP']
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    fullName: 'Scuderia Ferrari HP',
    base: 'Maranello, Italy',
    principal: 'Frédéric Vasseur',
    techChief: 'Loïc Serra',
    chassis: 'SF-26',
    powerUnit: 'Ferrari 066/12',
    entryYear: 1950,
    color: '#E80020', // Rosso Corsa Red
    borderColor: 'border-[#E80020]',
    logoChar: 'SF',
    stats: {
      championships: 16,
      wins: 247,
      podiums: 818,
      fastestLaps: 263
    },
    longHistory: 'The oldest, most historic, and most legendary team in Grand Prix racing. Representing the Prancing Horse ("Cavallino Rampante"), Scuderia Ferrari is the only constructor to have contested every single season since the championship began in 1950. With heroes like Niki Lauda and Michael Schumacher immortalized in Rosso Corsa, Ferrari remains the emotional heartbeat of global motorsport.',
    sponsors: ['HP', 'Shell', 'Santander', 'Puma', 'Vanti', 'Estrella Galicia', 'Ray-Ban']
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG',
    fullName: 'Mercedes-AMG PETRONAS F1 Team',
    base: 'Brackley, United Kingdom',
    principal: 'Toto Wolff',
    techChief: 'James Allison',
    chassis: 'W17 E Performance',
    powerUnit: 'Mercedes-AMG M15 E Performance',
    entryYear: 1954,
    color: '#27F4D2', // Silver Arrows / Petrol Green Accent
    borderColor: 'border-[#27F4D2]',
    logoChar: 'M',
    stats: {
      championships: 8,
      wins: 128,
      podiums: 295,
      fastestLaps: 109
    },
    longHistory: 'Mercedes initially raced in the 1950s with Juan Manuel Fangio before returning as an all-conquering force in 2010. They unleashed an unprecedented, record-breaking period of dominance in the Hybrid era, winning eight consecutive Constructors’ World Championships from 2014 to 2021 with Lewis Hamilton and Nico Rosberg driving their lethal silver and black arrows.',
    sponsors: ['Petronas', 'INEOS', 'Qualcomm Snapdragon', 'Hilton', 'IWC Schaffhausen', 'TeamViewer', 'Tommy Hilfiger']
  },
  {
    id: 'astonmartin',
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco F1 Team',
    base: 'Silverstone, United Kingdom',
    principal: 'Mike Krack',
    techChief: 'Enrico Cardile',
    chassis: 'AMR26',
    powerUnit: 'Honda Racing (HRC)', // Transited/transiting to Honda or Mercedes
    entryYear: 2021,
    color: '#229977', // British Racing Green
    borderColor: 'border-[#229977]',
    logoChar: 'AM',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 9,
      fastestLaps: 3
    },
    longHistory: 'Re-entering F1 in 2021 as Lawrence Stroll rebranded Racing Point into the illustrious British Racing Green manufacturer. Aston Martin operates from a state-of-the-art technology campus right in Silverstone. Packing the experience of two-time champion Fernando Alonso, they represent ambitious luxury, heavily scaling up technical partnerships with Honda to fight for championships.',
    sponsors: ['Aramco', 'Cognizant', 'Boss', 'Valvoline', 'SentinelOne', 'Girard-Perregaux', 'Crypto.com']
  },
  {
    id: 'alpine',
    name: 'Alpine F1 Team',
    fullName: 'BWT Alpine F1 Team',
    base: 'Enstone, United Kingdom / Viry, France',
    principal: 'Oliver Oakes',
    techChief: 'David Sanchez',
    chassis: 'A526',
    powerUnit: 'Renault E-Tech RE26',
    entryYear: 2021,
    color: '#FF87B4', // BWT Pink or Alpine Blue (#0090FF)
    borderColor: 'border-[#0090FF]',
    logoChar: 'AL',
    stats: {
      championships: 2, // counting Renault eras
      wins: 36,
      podiums: 105,
      fastestLaps: 32
    },
    longHistory: 'The French powerhouse owned by Renault Group, rebranded as Alpine in 2021. Headquartered in Enstone for aerodynamics and chassis design, Alpine carries a proud history of innovation (having previously won championships as Benetton in 94/95 and Renault in 05/06). They compete with an dynamic dual-livery setup blending French Alpine blue with signature BWT pink.',
    sponsors: ['BWT', 'Castrol', 'Microsoft', 'Renault', 'Kappa', 'Yahoo!', 'H.C.S.']
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    fullName: 'Williams Racing',
    base: 'Grove, Oxfordshire, United Kingdom',
    principal: 'James Vowles',
    techChief: 'Pat Fry',
    chassis: 'FW48',
    powerUnit: 'Mercedes-AMG M15 E Performance',
    entryYear: 1978,
    color: '#005AFF', // Oxford Blue
    borderColor: 'border-[#005AFF]',
    logoChar: 'W',
    stats: {
      championships: 9,
      wins: 114,
      podiums: 313,
      fastestLaps: 133
    },
    longHistory: 'Founded by the indomitable Sir Frank Williams and Sir Patrick Head, Williams Racing is one of the pillars of the F1 paddock. Dominating the late 1980s and 1990s with active-suspension marvels and stellar aerodynamic engineering, Williams achieved 9 constructors championships. Led now by Vowles, Williams is on an intensive rebuilding path to reclaim its historic glory.',
    sponsors: ['Gulf Oil', 'Duracell', 'Stephens', 'Michelob ULTRA', 'MyProtein', 'Pirelli']
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    fullName: 'MoneyGram Haas F1 Team',
    base: 'Kannapolis, USA / Banbury, UK',
    principal: 'Ayao Komatsu',
    techChief: 'Andrea De Zordo',
    chassis: 'VF-26',
    powerUnit: 'Ferrari 066/12',
    entryYear: 2016,
    color: '#D40026', // Haas Red/Black
    borderColor: 'border-[#D40026]',
    logoChar: 'H',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      fastestLaps: 2
    },
    longHistory: 'The only American constructor on the grid, Haas was founded by industrialist Gene Haas in 2016. Drawing heavily on a technical partnership with Scuderia Ferrari and a chassis supply structure with Dallara, Haas utilizes an efficient cross-border operation. Ayao Komatsu assumed leadership, steering the team into consistent points finishes with smart midfield tactics.',
    sponsors: ['MoneyGram', 'Palm Angels', 'Chipotle', 'Haas Automation', 'Oakley', 'Play’n GO']
  },
  {
    id: 'sauber',
    name: 'Stake F1 Sauber',
    fullName: 'Stake F1 Team KICK Sauber',
    base: 'Hinwil, Switzerland',
    principal: 'Alessandro Alunni Bravi',
    techChief: 'James Key',
    chassis: 'C46',
    powerUnit: 'Ferrari 066/12 / Audi prepping',
    entryYear: 1993,
    color: '#52E252', // Neon Green
    borderColor: 'border-[#52E252]',
    logoChar: 'S',
    stats: {
      championships: 0,
      wins: 1, // as BMW Sauber
      podiums: 26,
      fastestLaps: 5
    },
    longHistory: 'Founded by Peter Sauber in the early 1990s, the Hinwil-based Swiss squad has served as the springboard for legendary drivers like Kimi Räikkönen, Sebastian Vettel, and Robert Kubica. Sauber is in full industrial transition to become the official Audi factory team, boasting some of the best wind tunnel facilities in all of Europe.',
    sponsors: ['Stake', 'Kick', 'Pramac', 'Coty', 'Acer', 'Mitsubishi Electric', 'SABIC']
  },
  {
    id: 'racingbulls',
    name: 'Visa Cash App RB',
    fullName: 'Visa Cash App RB Formula One Team',
    base: 'Faenza, Italy / Bicester, UK',
    principal: 'Laurent Mekies',
    techChief: 'Jody Egginton',
    chassis: 'VCARB 02',
    powerUnit: 'Honda Racing (HRC)', // Or Red-bull Ford aligned
    entryYear: 2006,
    color: '#002C9C', // Electric Navy & White
    borderColor: 'border-[#002C9C]',
    logoChar: 'VC',
    stats: {
      championships: 0,
      wins: 2, // as Toro Rosso/AlphaTauri (Vettel 2008, Gasly 2020)
      podiums: 5,
      fastestLaps: 3
    },
    longHistory: 'Tracing roots back to Minardi, then acquired by Red Bull to form Scuderia Toro Rosso, and rebranded in 2024 as Visa Cash App RB (VCARB). Operating from Faenza, Italy, they balance senior independent aerodynamic execution with young engineering genius. They carry two Grand Prix victories from historic rainy afternoons in Monza.',
    sponsors: ['Visa', 'Cash App', 'Hugo Boss', 'Orlen', 'Amex', 'Alpinestars', 'Neft Vodka']
  }
];

export const F1_DRIVERS: Driver[] = [
  // McLaren
  {
    id: 'norris',
    name: 'Lando Norris',
    number: 4,
    code: 'NOR',
    country: 'United Kingdom',
    flagCode: 'GB',
    teamId: 'mclaren',
    teamName: 'McLaren Racing',
    birthDate: '1999-11-13',
    birthPlace: 'Bristol, United Kingdom',
    careerHighlight: '2024 Miami Grand Prix Winner & championship runner-up, securing McLaren’s front-runner revolution.',
    bio: 'Lando Norris entered F1 with McLaren in 2019 after a stunning junior career. He quickly stood out for his lightning-fast qualifying pace, natural racecraft, and charismatic social media presence. Establishing himself as McLaren’s de facto leader, Lando is a regular contender for wins and pole positions.',
    stats: {
      championships: 0,
      wins: 5,
      podiums: 28,
      gps: 125,
      careerPoints: 980,
      currentRank: 2
    },
    helmet: {
      colorScheme: 'Papaya Orange & Matte Volt Green',
      baseColor: '#FF8700',
      accentColor: '#DCFF31',
      topFeature: 'Glossy 4-Leaf/4-Striped personal LN logo on the crown with a fluorescent grid patterned overlay.',
      rearSymbol: 'Two stylized LN arrows pointing upward with his lucky racing number 4 offset.',
      designStory: 'Lando’s helmet blends the iconic Papaya Orange of McLaren with the high-visibility Volt Green that has been his signature since karting. It is highly geometric, sporting carbon-fiber texture reveals on the edges.'
    }
  },
  {
    id: 'piastri',
    name: 'Oscar Piastri',
    number: 81,
    code: 'PIA',
    country: 'Australia',
    flagCode: 'AU',
    teamId: 'mclaren',
    teamName: 'McLaren Racing',
    birthDate: '2001-04-06',
    birthPlace: 'Melbourne, Australia',
    careerHighlight: '2023 Qatar GP Sprint Race Winner and multiple GP winner in only his second season.',
    bio: 'Oscar Piastri is one of the most highly rated young talents in F1 history, having won Formula Renault, F3, and F2 back-to-back in consecutive rookie years. After a highly publicized driver market saga, he joined McLaren in 2023, immediately demonstrating ice-cool composure and exceptional high-speed feel matching seasoned champions.',
    stats: {
      championships: 0,
      wins: 3,
      podiums: 11,
      gps: 44,
      careerPoints: 371,
      currentRank: 4
    },
    helmet: {
      colorScheme: 'Australian Yellow, Red & Electric Cyan',
      baseColor: '#002F6C',
      accentColor: '#FFCB05',
      topFeature: 'Sleek speed stripes representing traditional Australian colors wrapped in modern cyberpunk blue.',
      rearSymbol: 'Boomerang stylized speed outline with the #81 brand logo centered.',
      designStory: 'Oscar’s helmet pay tribute to legendary Australian designs, using strong blocks of yellow and deep red. Bright cyan outlines break up the traditional colors to form a modern silhouette suited for helmet cams.'
    }
  },

  // Red Bull
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    number: 1,
    code: 'VER',
    country: 'Netherlands',
    flagCode: 'NL',
    teamId: 'redbull',
    teamName: 'Red Bull Racing',
    birthDate: '1997-09-30',
    birthPlace: 'Hasselt, Belgium',
    careerHighlight: 'Multi-time F1 World Drivers’ Champion (2021, 2022, 2023, 2024), resetting F1 record books.',
    bio: 'The youngest driver ever to debut in F1 (aged 17) and youngest race winner (aged 18 in Spain 2016). Verstappen represents an absolute force of natural aggression, relentless focus, and near-flawless precision. He drove dominant records including 10 successive race wins in the historic 2023 season under Red Bull.',
    stats: {
      championships: 4,
      wins: 62,
      podiums: 111,
      gps: 206,
      careerPoints: 2975,
      currentRank: 1
    },
    helmet: {
      colorScheme: 'Royal Red Bull Pearl White & Championship Gold',
      baseColor: '#FFFFFF',
      accentColor: '#D4AF37',
      topFeature: 'A giant gold and red roaring lion graphic stretching across the crown, reflecting his Dutch crest.',
      rearSymbol: 'Verstappen wordmark under high-gloss champion laurel wreaths surrounding his crown.',
      designStory: 'Max’s helmet emphasizes prestige. For championship seasons, he transitioned to elegant white base coats, featuring metallic gold laurels on the back. The Dutch national flag is subtly woven into the chin bar and side winglets.'
    }
  },
  {
    id: 'lawson',
    name: 'Liam Lawson',
    number: 30,
    code: 'LAW',
    country: 'New Zealand',
    flagCode: 'NZ',
    teamId: 'redbull',
    teamName: 'Red Bull Racing',
    birthDate: '2002-02-11',
    birthPlace: 'Hastings, New Zealand',
    careerHighlight: 'Secured points finishes during emergency reserve appearances, rising to Red Bull Racing senior seat.',
    bio: 'Hailing from Pukekohe, Liam Lawson’s rise is fueled by the Red Bull Junior program. Highly versatile, he won races on his DTM, Super Formula, F3, and F2 debuts. In 2024/2025, his tenacious wheel-to-wheel battles locked down his promotion to partner Max Verstappen on the primary squad.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 19,
      careerPoints: 24,
      currentRank: 9
    },
    helmet: {
      colorScheme: 'Matte New Zealand Navy-Blue & Neon Red Bull Logo',
      baseColor: '#002341',
      accentColor: '#E20613',
      topFeature: 'Silver Fern of New Zealand layered on a deep midnight blue, creating an stealth Maori design language.',
      rearSymbol: 'Double kiwi bird silver silhouette and Maori wave tattoo patterns.',
      designStory: 'Liam honors New Zealand racing heritage. Using a base of high-contrast navy, his layout integrates the iconic Kiwi silver fern on the left, which pops dramatically against the corporate Charging Bull decals of Red Bull.'
    }
  },

  // Ferrari
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    number: 16,
    code: 'LEC',
    country: 'Monaco',
    flagCode: 'MC',
    teamId: 'ferrari',
    teamName: 'Scuderia Ferrari',
    birthDate: '1997-10-16',
    birthPlace: 'Monte Carlo, Monaco',
    careerHighlight: '2024 Monaco Grand Prix pole and emotional home victory, cementing his place in Ferrari lore.',
    bio: 'Charles Leclerc has been the crown jewel of the Ferrari Driver Academy. Highly emotional, blindingly fast over a single lap, and beloved by the Tifosi, Charles carries the weight of Maranello’s expectations. His victories in Monza and Monte Carlo are masterclasses in grid defense.',
    stats: {
      championships: 0,
      wins: 8,
      podiums: 41,
      gps: 145,
      careerPoints: 1380,
      currentRank: 3
    },
    helmet: {
      colorScheme: 'Monegasque Crimson & Crystal White',
      baseColor: '#E80020',
      accentColor: '#FFFFFF',
      topFeature: 'Split Monaco flag graphic with his childhood race number 16 in a custom brush stroke font.',
      rearSymbol: 'Tributes to Jules Bianchi and his father Herve Leclerc on the back panel.',
      designStory: 'Charles Leclerc’s helmet is traditional flag-based design. It features a stunning fade from deep Ferrari Red into Monaco’s crisp white. The top integrates an elegant clear coat where carbon fiber weaves are proudly exposed.'
    }
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    number: 44,
    code: 'HAM',
    country: 'United Kingdom',
    flagCode: 'GB',
    teamId: 'ferrari',
    teamName: 'Scuderia Ferrari',
    birthDate: '1985-01-07',
    birthPlace: 'Stevenage, United Kingdom',
    careerHighlight: '7-time World Drivers’ Champion with 105 wins, completing the sensational transition to Ferrari.',
    bio: 'Lewis Hamilton is statistically the greatest Formula 1 driver of all time, holding records for wins, poles, and podiums. After a historic 12-season partnership with Mercedes, his blockbuster transition to Scuderia Ferrari in 2025 sent shockwaves across world sports, pursuing his elusive 8th world title.',
    stats: {
      championships: 7,
      wins: 105,
      podiums: 201,
      gps: 353,
      careerPoints: 4829,
      currentRank: 5
    },
    helmet: {
      colorScheme: 'Majestic Royal Purple & Fluo Yellow HP Accent',
      baseColor: '#3d165a',
      accentColor: '#CCFF00',
      topFeature: '7 Stars engraved horizontally along the crown, shimmering under dynamic race track lights.',
      rearSymbol: 'His iconic life mantra "Still I Rise" emblazoned in stylized gothic text.',
      designStory: 'Lewis’s helmet represents a high-fashion, high-impact aesthetic. It pairs a premium Amethyst deep purple with reflective neon yellow. Upon moving to Maranello, a tiny Prancing Horse emblem was added on the visor strip.'
    }
  },

  // Mercedes
  {
    id: 'russell',
    name: 'George Russell',
    number: 63,
    code: 'RUS',
    country: 'United Kingdom',
    flagCode: 'GB',
    teamId: 'mercedes',
    teamName: 'Mercedes-AMG',
    birthDate: '1998-02-15',
    birthPlace: 'King\'s Lynn, United Kingdom',
    careerHighlight: 'Snatched a thrilling maiden win at Brazil 2022, securing Mercedes leadership credentials.',
    bio: 'Known for his exceptional qualifying exploits at Williams, George joined Mercedes in 2022. He quickly proved his championship core, demonstrating analytical consistency, exceptional tyre management, and brilliant overtaking maneuvers.',
    stats: {
      championships: 0,
      wins: 3,
      podiums: 16,
      gps: 125,
      careerPoints: 663,
      currentRank: 6
    },
    helmet: {
      colorScheme: 'Piano Black & Petronas Turquoise Outline',
      baseColor: '#0C0C0C',
      accentColor: '#1EE5C9',
      topFeature: 'Abstract matte black stripes offset by glowing teal pinstripes representing PETRONAS liquids.',
      rearSymbol: 'His signature GR63 block letter logo with a red highlights.',
      designStory: 'George flipped to a stealthy black helmet design to distinguish himself on TV broadcasts. The Petronas teal lines wrap cleanly around the aerodynamic edges, offering a high-tech modern aesthetic.'
    }
  },
  {
    id: 'antonelli',
    name: 'Kimi Antonelli',
    number: 12,
    code: 'ANT',
    country: 'Italy',
    flagCode: 'IT',
    teamId: 'mercedes',
    teamName: 'Mercedes-AMG',
    birthDate: '2006-08-25',
    birthPlace: 'Bologna, Italy',
    careerHighlight: 'Bypassed F3 directly to land Mercedes’ legendary seat after dominance in standard junior championships.',
    bio: 'Andrea Kimi Antonelli is the ultimate prodigy of modern motorsport, fast-tracked into Lewis Hamilton’s legendary Brackley seat. Toto Wolff’s academy standout since age 12, Kimi brings incredible natural speed and Italian flare back to the Mercedes squad.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 24,
      careerPoints: 95,
      currentRank: 8
    },
    helmet: {
      colorScheme: 'Electric Azure Blue, Emerald Green & White',
      baseColor: '#005AAA',
      accentColor: '#009246',
      topFeature: 'Tricolore Italian wings matching the classic Formula 1 speed arches, with silver chrome flecks.',
      rearSymbol: 'Childhood lucky number 12 styled as double overlapping curves.',
      designStory: 'Kimi’s helmet evokes national Italian pride. Deep sky-blue base panels represent Azzurri sports, paired with green-white-red streaks which slice through sponsors logos to maintain high visual speed.'
    }
  },

  // Aston Martin
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    number: 14,
    code: 'ALO',
    country: 'Spain',
    flagCode: 'ES',
    teamId: 'astonmartin',
    teamName: 'Aston Martin',
    birthDate: '1981-07-29',
    birthPlace: 'Oviedo, Spain',
    careerHighlight: 'Double F1 World Champion (2005, 2006) and Le Mans winner, standard bearer for supreme longevity.',
    bio: 'The undisputed "Gladiator" of the paddock. Fernando Alonso is celebrated for his supreme racing IQ, unmatched adaptiveness in difficult cars, and ruthless determination. His move to Aston Martin yielded a sensational resurgence of podiums.',
    stats: {
      championships: 2,
      wins: 32,
      podiums: 106,
      gps: 405,
      careerPoints: 2315,
      currentRank: 7
    },
    helmet: {
      colorScheme: 'Asturian Blue, Spanish Gold & Crimson',
      baseColor: '#0F4C81',
      accentColor: '#FFCC00',
      topFeature: 'Retro yellow victory arrows on the top, a design he has carried since karting in Oviedo in 1995.',
      rearSymbol: 'His personal FA branding next to a miniature Asturian cross flag.',
      designStory: 'Fernando’s legendary helmet incorporates the vibrant blue of Asturias along with the brilliant red and yellow of Spain. The yellow retro arrows on top are instantly recognizable and remain unchanged in nearly 30 years.'
    }
  },
  {
    id: 'stroll',
    name: 'Lance Stroll',
    number: 18,
    code: 'STR',
    country: 'Canada',
    flagCode: 'CA',
    teamId: 'astonmartin',
    teamName: 'Aston Martin',
    birthDate: '1998-10-29',
    birthPlace: 'Montreal, Canada',
    careerHighlight: 'Maiden pole position on wet tarmac in Turkey 2020, revealing immense high-friction adaptability.',
    bio: 'Lance Stroll has F1 history in his pockets, stepping onto the podium in his rookie year at Baku 2017. He remains a highly capable, solid driver, performing particularly well in unpredictable wet races.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 3,
      gps: 165,
      careerPoints: 298,
      currentRank: 12
    },
    helmet: {
      colorScheme: 'Metallic Aston British Green & Silver Chrome',
      baseColor: '#002F24',
      accentColor: '#C0C0C0',
      topFeature: 'Clean metallic green gloss with matching silver Aston winglets across his temporal band.',
      rearSymbol: 'Canadian Red Maple Leaf embedded in transparent carbon detailing.',
      designStory: 'Lance has transitioned to a highly integrated corporate design. Painted almost entirely in Aston Martin Green, his helmet features silver metallic lines that mimic luxury British design engineering.'
    }
  },

  // Alpine
  {
    id: 'gasly',
    name: 'Pierre Gasly',
    number: 10,
    code: 'GAS',
    country: 'France',
    flagCode: 'FR',
    teamId: 'alpine',
    teamName: 'Alpine F1 Team',
    birthDate: '1996-02-07',
    birthPlace: 'Rouen, France',
    careerHighlight: 'Historic, sensational victory in AlphaTauri at Monza 2020 after a thrilling grid battle.',
    bio: 'After surviving a brutal, highly public Red Bull demotion, Pierre re-asserted his pedigree through sheer speed and podiums. He represents Enstone’s driving experience, bringing tactical grit to the historic French outfit Alpine.',
    stats: {
      championships: 0,
      wins: 1,
      podiums: 5,
      gps: 153,
      careerPoints: 422,
      currentRank: 11
    },
    helmet: {
      colorScheme: 'Vibrant Graffiti Pink & Matte Charcoal Grey',
      baseColor: '#D10D69',
      accentColor: '#303030',
      topFeature: 'Abstract French tricolor flags running along his visor, paired with bright pink BWT-themed splashes.',
      rearSymbol: 'Monza glory laurel crown alongside his number 10 styled in hand-painted spray art.',
      designStory: 'Pierre’s helmet is a beautiful and artistic blend. It splits his personal logo with heavy streaks of BWT pink, French blue, and dark carbon highlights, fitting the aesthetic of contemporary street styling.'
    }
  },
  {
    id: 'doohan',
    name: 'Jack Doohan',
    number: 61,
    code: 'DOO',
    country: 'Australia',
    flagCode: 'AU',
    teamId: 'alpine',
    teamName: 'Alpine F1 Team',
    birthDate: '2003-01-20',
    birthPlace: 'Gold Coast, Australia',
    careerHighlight: 'Multiple F2 feature race victories, rising from reserve duties to Alpine factory pilot.',
    bio: 'Son of five-time legendary MotoGP world champion Mick Doohan, Jack built his own four-wheel legacy. Fast, technical, and analytical, Jack earned high praise inside Enstone as simulator lead before taking Alpine’s second seat.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 24,
      careerPoints: 48,
      currentRank: 15
    },
    helmet: {
      colorScheme: 'Classic Royal Blue, Crimson & Brilliant Gold Waves',
      baseColor: '#002C5B',
      accentColor: '#FFD700',
      topFeature: 'Lethal traditional white swoops over deep red, paying a direct tribute to his father Mick Doohan’s bike helmets.',
      rearSymbol: 'His personal Aussie kangaroo stamp with ' + String.fromCharCode(39) + 'DOOHAN' + String.fromCharCode(39) + ' written in heavy collegiate letters.',
      designStory: 'Jack’s design is a direct continuation of motorsport royalty. Reflected from his father’s iconic helmet, his F1 helmet utilizes the identical red, yellow, and blue striped wrap, updating it with metallic highlights.'
    }
  },

  // Williams
  {
    id: 'albon',
    name: 'Alexander Albon',
    number: 23,
    code: 'ALB',
    country: 'Thailand',
    flagCode: 'TH',
    teamId: 'williams',
    teamName: 'Williams Racing',
    birthDate: '1996-03-23',
    birthPlace: 'London, United Kingdom',
    careerHighlight: 'Reinvigorated Williams with outstanding defensive drives, repeatedly claiming heroic, slim points.',
    bio: 'Respected for his extreme kindness off-track and sharp intelligence on-track, Alex Albon clawed his way back to Williams. He built a reputation as a tyre-whisperer, routinely scoring vital points for Williams.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 2,
      gps: 105,
      careerPoints: 247,
      currentRank: 10
    },
    helmet: {
      colorScheme: 'Oxford Navy & Royal Thai Crimson Red',
      baseColor: '#001A3F',
      accentColor: '#DA291C',
      topFeature: 'Traditional stylized elephant symbol and the seal of Buddhist peace on the crown.',
      rearSymbol: 'His signature ALB brand overlay with colorful Thai heritage patterns.',
      designStory: 'Alex uses deep Williams dark blues overlaid with prominent Thai flags. The graphics are sharp and sharp, presenting a very professional profile that matches Williams’ current tech rebrand.'
    }
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz',
    number: 55,
    code: 'SAI',
    country: 'Spain',
    flagCode: 'ES',
    teamId: 'williams',
    teamName: 'Williams Racing',
    birthDate: '1994-09-01',
    birthPlace: 'Madrid, Spain',
    careerHighlight: 'Only non-Red Bull race winner of 2023 (Singapore), pulling off his famous intentional-DRS tactic.',
    bio: 'Known as "The Smooth Operator", Carlos Sainz is highly tactical, combining racecraft with deep, analytical tire management. He joined Williams Racing in 2025/2026, creating a spectacular lineup with Alex Albon under James Vowles.',
    stats: {
      championships: 0,
      wins: 4,
      podiums: 25,
      gps: 206,
      careerPoints: 1115,
      currentRank: 5
    },
    helmet: {
      colorScheme: 'Madrid Crimson, Canary Yellow & Charcoal Black',
      baseColor: '#D10000',
      accentColor: '#FFD700',
      topFeature: 'Spain flag splitting his profile directly in half, flanked by his trademark Chili logo on the temporal panel.',
      rearSymbol: 'Large number 55 graphic resembling overlapping hot chili curves.',
      designStory: 'Carlos’s helmet is built for immediate identification. With bright Spanish red and gold bands wrap around a carbon black core, it is widely considered one of the grid’s cleanest and most modern helmets.'
    }
  },

  // Haas
  {
    id: 'ocon',
    name: 'Esteban Ocon',
    number: 31,
    code: 'OCO',
    country: 'France',
    flagCode: 'FR',
    teamId: 'haas',
    teamName: 'Haas F1 Team',
    birthDate: '1996-09-17',
    birthPlace: 'Évreux, France',
    careerHighlight: '2021 Hungarian Grand Prix Winner after an extremely tense defensive battle with Sebastian Vettel.',
    bio: 'Esteban Ocon, known for his towering height and aggressive wheel-to-wheel battles, represents tremendous racing grit. Having driven for Force India, Renault, and Alpine, his transition to Haas F1 Team brings championship-caliber grit.',
    stats: {
      championships: 0,
      wins: 1,
      podiums: 4,
      gps: 157,
      careerPoints: 445,
      currentRank: 13
    },
    helmet: {
      colorScheme: 'Spider-man Electric Red, Cyan & Matte Charcoal',
      baseColor: '#E10600',
      accentColor: '#002C9C',
      topFeature: 'Fierce web-designed red racing lines with aggressive visor arches inspired by classic superheroes.',
      rearSymbol: 'His lucky emblem, the Eiffel Tower, next to his number 31.',
      designStory: 'Esteban has a massive affinity for vibrant, high-contrast comic-book artwork. His helmet features striking geometric patterns and eye-shaped arches around the visor, allowing the helmet to glow under high-contrast track lights.'
    }
  },
  {
    id: 'bearman',
    name: 'Oliver Bearman',
    number: 87,
    code: 'BEA',
    country: 'United Kingdom',
    flagCode: 'GB',
    teamId: 'haas',
    teamName: 'Haas F1 Team',
    birthDate: '2005-05-08',
    birthPlace: 'Chelmsford, United Kingdom',
    careerHighlight: 'F1 debut as Ferrari emergency stand-in at Jeddah, finishing a heroic P7 at only 18 years old.',
    bio: 'A standout from the Scuderia Ferrari Driver Academy, Oliver "Ollie" Bearman took the F1 paddock by storm. His poise, physical stamina, and racing speed as Haas F1 Team full-time pilot make him Britain’s hottest rising star.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 25,
      careerPoints: 42,
      currentRank: 14
    },
    helmet: {
      colorScheme: 'Classic Royal Blue & Neon Green Pinstripes',
      baseColor: '#0047AB',
      accentColor: '#39FF14',
      topFeature: 'Traditional British racing navy split by electric green lines, displaying his lucky four-leaf clover.',
      rearSymbol: 'Ollie Bearman signature initials alongside coordinates of Chelmsford.',
      designStory: 'Oliver’s helmet pays homage to his early karting helmet designs, utilizing an intense block of deep royal blue, highlighted by neon green decals to match Haas Racing’s sleek sidepods.'
    }
  },

  // Sauber
  {
    id: 'hulkenberg',
    name: 'Nico Hülkenberg',
    number: 27,
    code: 'HUL',
    country: 'Germany',
    flagCode: 'DE',
    teamId: 'sauber',
    teamName: 'Stake F1 Sauber',
    birthDate: '1987-08-19',
    birthPlace: 'Emmerich am Rhein, Germany',
    careerHighlight: 'Stunning rookie pole on a drying Interlagos 2010, plus highly celebrated Le Mans 24 Hours Winner.',
    bio: 'One of the most reliable and highly respected qualifiers in F1 history. Nico "The Hulk" Hülkenberg is legendary for his rapid reflex speed on mixed tires. He took Sauber’s lead seat for its Audi integration phase.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 228,
      careerPoints: 552,
      currentRank: 16
    },
    helmet: {
      colorScheme: 'Hyper Radiation Neon Green & Sleek Matte Black',
      baseColor: '#39FF14',
      accentColor: '#0D0D0D',
      topFeature: 'Aggressive neon green slashes wrapping the visor band, designed to match his nickname "The Hulk".',
      rearSymbol: 'HULK word emblem with toxic warning barrel silhouettes on the bottom.',
      designStory: 'Nico’s helmet is arguably the most recognizable from helicopter viewports. He relies exclusively on hyper-neon lime green paint that vibrates on camera, pairing nicely with black carbon splits.'
    }
  },
  {
    id: 'bortoleto',
    name: 'Gabriel Bortoleto',
    number: 85,
    code: 'BOR',
    country: 'Brazil',
    flagCode: 'BR',
    teamId: 'sauber',
    teamName: 'Stake F1 Sauber',
    birthDate: '2004-10-14',
    birthPlace: 'São Paulo, Brazil',
    careerHighlight: 'Sensational Formula 3 Rookie Champion and Formula 2 title winner, securing Brazil’s proud return to F1.',
    bio: 'Guided under Fernando Alonso’s A1 management academy, Gabriel Bortoleto’s explosive climb through F3 and F2 captured public attention. He represents Sauber’s future, bringing Brazil’s glorious motorsport heritage back to the F1 grid.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 24,
      careerPoints: 22,
      currentRank: 18
    },
    helmet: {
      colorScheme: 'Brazilian Green, Yellow & Indigo Blue',
      baseColor: '#009739',
      accentColor: '#FFDF00',
      topFeature: 'Senna-inspired Brazilian national speed lines running along the lower chin guard and ear winglets.',
      rearSymbol: 'Compass star with Brazilian flag motif next to lucky number 85.',
      designStory: 'Gabriel proudly shoulders Brazil’s rich F1 legacy. His helmet uses highly polished grass green and deep schoolbus yellow colors, mirroring the national flag, blended with deep space indigo accents on the rear diffuser.'
    }
  },

  // Visa Cash App RB
  {
    id: 'tsunoda',
    name: 'Yuki Tsunoda',
    number: 22,
    code: 'TSU',
    country: 'Japan',
    flagCode: 'JP',
    teamId: 'racingbulls',
    teamName: 'Visa Cash App RB',
    birthDate: '2000-05-11',
    birthPlace: 'Sagamihara, Japan',
    careerHighlight: 'Sensational debut points at Bahrain, driving brilliant aggressive overtakes that stunned veterans.',
    bio: 'Yuki Tsunoda combines diminutive height with a fierce, highly outspoken radio personality and incredible car control. Under Mekies, Yuki matured into VCARB’s crucial points leader, renowned for his lightning starts.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 90,
      careerPoints: 89,
      currentRank: 10
    },
    helmet: {
      colorScheme: 'Traditional Japanese Autumn Leaves & Cream Gold',
      baseColor: '#FFFFFF',
      accentColor: '#B22234',
      topFeature: 'Stunning hand-painted Japanese Momiji (Red Autumn Maple Leaves) drifting across the rear diffuser.',
      rearSymbol: 'Traditional Kanji speed stamps overlaid with a golden wind-crescent design.',
      designStory: 'Yuki’s helmet is widely celebrated as an artistic masterpiece. It depicts flowing Japanese maple leaves in autumn crimson, layered over a soft, pearl cream gold base, representing traditional Japanese water art.'
    }
  },
  {
    id: 'hadjar',
    name: 'Isack Hadjar',
    number: 6,
    code: 'HAD',
    country: 'France',
    flagCode: 'FR',
    teamId: 'racingbulls',
    teamName: 'Visa Cash App RB',
    birthDate: '2004-09-28',
    birthPlace: 'Paris, France',
    careerHighlight: 'Dominated the Formula 2 Feature races on technical tracks, fast-tracked as Red Bull’s next rookie prodigy.',
    bio: 'Isack Hadjar is highly praised by Dr. Helmut Marko for his brilliant car saving instincts and hyper-aggressive race starts. The French-Algerian standout clinched his promotion into VCARB to lead the next gen of Red Bull junior stars.',
    stats: {
      championships: 0,
      wins: 0,
      podiums: 0,
      gps: 24,
      careerPoints: 18,
      currentRank: 17
    },
    helmet: {
      colorScheme: 'Chrome Silver & Charging Bull Metallic Red',
      baseColor: '#C0C0C0',
      accentColor: '#1A3060',
      topFeature: 'Aggressive silver-chrome reflections on the cheekbones, matching the Navy bull of Red Bull.',
      rearSymbol: 'His home city Paris GPS stamp next to signature initials.',
      designStory: 'Isack features a striking metallic chrome aesthetic. Highly reflective silver segments are paired with deep Red Bull navy blue and racing crimson borders, completing a high-contrast style that shines in night GPs.'
    }
  }
];

export const F1_RACES: RaceGP[] = [
  {
    round: 1,
    name: 'Gulf Air Bahrain Grand Prix',
    circuit: 'Bahrain International Circuit',
    location: 'Sakhir, Bahrain',
    city: 'Sakhir',
    country: 'Bahrain',
    date: '2026-03-06 - 2026-03-08',
    laps: 57,
    lengthKm: 5.412,
    lapRecord: { time: '1:30.252', holder: 'Michael Schumacher', year: 2004 },
    status: 'completed',
    topThree: ['Max Verstappen', 'Charles Leclerc', 'Lando Norris']
  },
  {
    round: 2,
    name: 'Saudi Arabian Grand Prix',
    circuit: 'Jeddah Corniche Circuit',
    location: 'Jeddah, Saudi Arabia',
    city: 'Jeddah',
    country: 'Saudi Arabia',
    date: '2026-03-20 - 2026-03-22',
    laps: 50,
    lengthKm: 6.174,
    lapRecord: { time: '1:30.734', holder: 'Lewis Hamilton', year: 2021 },
    status: 'completed',
    topThree: ['Max Verstappen', 'Lando Norris', 'Charles Leclerc']
  },
  {
    round: 3,
    name: 'Rolex Australian Grand Prix',
    circuit: 'Albert Park Circuit',
    location: 'Melbourne, Australia',
    city: 'Melbourne',
    country: 'Australia',
    date: '2026-04-03 - 2026-04-05',
    laps: 58,
    lengthKm: 5.278,
    lapRecord: { time: '1:19.813', holder: 'Charles Leclerc', year: 2024 },
    status: 'completed',
    topThree: ['Lando Norris', 'Oscar Piastri', 'Charles Leclerc']
  },
  {
    round: 4,
    name: 'Azerbaijan Grand Prix',
    circuit: 'Baku City Circuit',
    location: 'Baku, Azerbaijan',
    city: 'Baku',
    country: 'Azerbaijan',
    date: '2026-04-17 - 2026-04-19',
    laps: 51,
    lengthKm: 6.003,
    lapRecord: { time: '1:43.009', holder: 'Charles Leclerc', year: 2019 },
    status: 'completed',
    topThree: ['Charles Leclerc', 'Oscar Piastri', 'Lewis Hamilton']
  },
  {
    round: 5,
    name: 'Crypto.com Miami Grand Prix',
    circuit: 'Miami International Autodrome',
    location: 'Miami, USA',
    city: 'Miami',
    country: 'USA',
    date: '2026-05-01 - 2026-05-03',
    laps: 57,
    lengthKm: 5.412,
    lapRecord: { time: '1:29.708', holder: 'Max Verstappen', year: 2023 },
    status: 'completed',
    topThree: ['Lando Norris', 'Max Verstappen', 'Charles Leclerc']
  },
  {
    round: 6,
    name: 'Grand Prix de Monaco',
    circuit: 'Circuit de Monaco',
    location: 'Monte Carlo, Monaco',
    city: 'Monte Carlo',
    country: 'Monaco',
    date: '2026-05-22 - 2026-05-24',
    laps: 78,
    lengthKm: 3.337,
    lapRecord: { time: '1:12.909', holder: 'Lewis Hamilton', year: 2021 },
    status: 'ongoing' // currently live this weekend in our simulated time frame!
  },
  {
    round: 7,
    name: 'Pirelli Grand Prix du Canada',
    circuit: 'Circuit Gilles-Villeneuve',
    location: 'Montreal, Canada',
    city: 'Montreal',
    country: 'Canada',
    date: '2026-06-05 - 2026-06-07',
    laps: 70,
    lengthKm: 4.361,
    lapRecord: { time: '1:13.078', holder: 'Valtteri Bottas', year: 2019 },
    status: 'upcoming'
  },
  {
    round: 8,
    name: 'Gran Premio de España',
    circuit: 'Circuit de Barcelona-Catalunya',
    location: 'Barcelona, Spain',
    city: 'Barcelona',
    country: 'Spain',
    date: '2026-06-19 - 2026-06-21',
    laps: 66,
    lengthKm: 4.657,
    lapRecord: { time: '1:16.330', holder: 'Max Verstappen', year: 2023 },
    status: 'upcoming'
  },
  {
    round: 9,
    name: 'Großer Preis von Österreich',
    circuit: 'Red Bull Ring',
    location: 'Spielberg, Austria',
    city: 'Spielberg',
    country: 'Austria',
    date: '2026-07-03 - 2026-07-05',
    laps: 71,
    lengthKm: 4.318,
    lapRecord: { time: '1:05.619', holder: 'Carlos Sainz', year: 2020 },
    status: 'upcoming'
  },
  {
    round: 10,
    name: 'Qatar Airways British Grand Prix',
    circuit: 'Silverstone Circuit',
    location: 'Silverstone, United Kingdom',
    city: 'Silverstone',
    country: 'United Kingdom',
    date: '2026-07-17 - 2026-07-19',
    laps: 52,
    lengthKm: 5.891,
    lapRecord: { time: '1:27.097', holder: 'Max Verstappen', year: 2020 },
    status: 'upcoming'
  },
  {
    round: 11,
    name: 'Hungarian Grand Prix',
    circuit: 'Hungaroring',
    location: 'Budapest, Hungary',
    city: 'Budapest',
    country: 'Hungary',
    date: '2026-07-31 - 2026-08-02',
    laps: 70,
    lengthKm: 4.381,
    lapRecord: { time: '1:16.627', holder: 'Lewis Hamilton', year: 2020 },
    status: 'upcoming'
  },
  {
    round: 12,
    name: 'Belgian Grand Prix',
    circuit: 'Circuit de Spa-Francorchamps',
    location: 'Stavelot, Belgium',
    city: 'Spa',
    country: 'Belgium',
    date: '2026-08-14 - 2026-08-16',
    laps: 44,
    lengthKm: 7.004,
    lapRecord: { time: '1:46.286', holder: 'Valtteri Bottas', year: 2018 },
    status: 'upcoming'
  },
  {
    round: 13,
    name: 'Heineken Dutch Grand Prix',
    circuit: 'Circuit Zandvoort',
    location: 'Zandvoort, Netherlands',
    city: 'Zandvoort',
    country: 'Netherlands',
    date: '2026-08-28 - 2026-08-30',
    laps: 72,
    lengthKm: 4.259,
    lapRecord: { time: '1:11.097', holder: 'Lewis Hamilton', year: 2021 },
    status: 'upcoming'
  },
  {
    round: 14,
    name: 'Pirelli Gran Premio d’Italia',
    circuit: 'Autodromo Nazionale Monza',
    location: 'Monza, Italy',
    city: 'Monza',
    country: 'Italy',
    date: '2026-09-11 - 2026-09-13',
    laps: 53,
    lengthKm: 5.793,
    lapRecord: { time: '1:21.046', holder: 'Rubens Barrichello', year: 2004 },
    status: 'upcoming'
  },
  {
    round: 15,
    name: 'Singapore Airlines Singapore Grand Prix',
    circuit: 'Marina Bay Street Circuit',
    location: 'Marina Bay, Singapore',
    city: 'Singapore',
    country: 'Singapore',
    date: '2026-10-02 - 2026-10-04',
    laps: 62,
    lengthKm: 4.940,
    lapRecord: { time: '1:35.867', holder: 'Lewis Hamilton', year: 2023 },
    status: 'upcoming'
  },
  {
    round: 16,
    name: 'Lenovo Japanese Grand Prix',
    circuit: 'Suzuka International Racing Course',
    location: 'Suzuka, Japan',
    city: 'Suzuka',
    country: 'Japan',
    date: '2026-10-16 - 2026-10-18',
    laps: 53,
    lengthKm: 5.807,
    lapRecord: { time: '1:30.983', holder: 'Lewis Hamilton', year: 2019 },
    status: 'upcoming'
  },
  {
    round: 17,
    name: 'Pirelli United States Grand Prix',
    circuit: 'Circuit of The Americas',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    country: 'USA',
    date: '2026-10-30 - 2026-11-01',
    laps: 56,
    lengthKm: 5.513,
    lapRecord: { time: '1:36.169', holder: 'Charles Leclerc', year: 2019 },
    status: 'upcoming'
  },
  {
    round: 18,
    name: 'Gran Premio de la Ciudad de México',
    circuit: 'Autódromo Hermanos Rodríguez',
    location: 'Mexico City, Mexico',
    city: 'Mexico City',
    country: 'Mexico',
    date: '2026-11-06 - 202 Mexico-11-08',
    laps: 71,
    lengthKm: 4.304,
    lapRecord: { time: '1:18.741', holder: 'Valtteri Bottas', year: 2021 },
    status: 'upcoming'
  },
  {
    round: 19,
    name: 'Lenovo Grande Prêmio de São Paulo',
    circuit: 'Autódromo José Carlos Pace (Interlagos)',
    location: 'São Paulo, Brazil',
    city: 'São Paulo',
    country: 'Brazil',
    date: '2026-11-20 - 2026-11-22',
    laps: 71,
    lengthKm: 4.309,
    lapRecord: { time: '1:10.540', holder: 'Valtteri Bottas', year: 2018 },
    status: 'upcoming'
  },
  {
    round: 20,
    name: 'Heineken Silver Las Vegas Grand Prix',
    circuit: 'Las Vegas Strip Circuit',
    location: 'Las Vegas, Nevada, USA',
    city: 'Las Vegas',
    country: 'USA',
    date: '2026-11-26 - 2026-11-28',
    laps: 50,
    lengthKm: 6.201,
    lapRecord: { time: '1:35.490', holder: 'Oscar Piastri', year: 2023 },
    status: 'upcoming'
  },
  {
    round: 21,
    name: 'Qatar Airways Qatar Grand Prix',
    circuit: 'Lusail International Circuit',
    location: 'Lusail, Qatar',
    city: 'Doha',
    country: 'Qatar',
    date: '2026-12-04 - 2026-12-06',
    laps: 57,
    lengthKm: 5.419,
    lapRecord: { time: '1:24.319', holder: 'Max Verstappen', year: 2023 },
    status: 'upcoming'
  },
  {
    round: 22,
    name: 'Etihad Airways Abu Dhabi Grand Prix',
    circuit: 'Yas Marina Circuit',
    location: 'Yas Island, Abu Dhabi, UAE',
    city: 'Abu Dhabi',
    country: 'UAE',
    date: '2026-12-11 - 2026-12-13',
    laps: 58,
    lengthKm: 5.281,
    lapRecord: { time: '1:26.103', holder: 'Max Verstappen', year: 2021 },
    status: 'upcoming'
  }
];

export const F1_TROPHIES: TrophyInfo[] = [
  {
    id: 'drivers-championship',
    name: 'L’Automobile Club de Monaco World Drivers Championship Cup',
    significance: 'Presented annually to the driver who accumulates the most championship points across the season.',
    weightKr: '8.5 kg',
    materials: 'High-polish British Sterling Silver with gold plating accents and a pure solid obsidian base.',
    originYear: 1950,
    anecdotes: [
      'Each champion’s signature is engraved into a silver block wrapping the tiered obsidian base.',
      'The current champion is legally required to return the actual perpetual trophy to FIA Headquarters 4 weeks before the annual FIA Prizegiving Ceremony.',
      'Sir Jackie Stewart famously stated that holding this cup felt heavier than pushing his active F1 racer across the finish line.'
    ],
    historicalContext: 'Instigated in 1950 by the FIA to honor motorsport’s ultimate pilot. The design shows high classic speed arches with double winglets modeled after legendary Alfa Romeo and Maserati front wings.'
  },
  {
    id: 'constructors-championship',
    name: 'FIA Formula One World Constructors Trophy',
    significance: 'Recognizes the absolute pinnacle of engineering, logistics, and design teamwork among manufacturers.',
    weightKr: '12.4 kg',
    materials: 'Heavy Carbon steel plated in 24k gold, highlighted by a glowing titanium core.',
    originYear: 1958,
    anecdotes: [
      'Vanwall was the very first team to lay their hands on this masterpiece in 1958.',
      'Ferrari is the record holder, possessing 16 gold engravings on the outer perimeter.',
      'Engineers frequently celebrate by drenching this trophy in high-quality Italian champagne during team photographs, leading to repeated seal restorations.'
    ],
    historicalContext: 'Introduced in 1958 to offset the driver-centric culture, forcing teams to focus equally on engineering completeness. The trophy design includes 10 gold-leaf gears interlooping together, representing the constructor team harmony.'
  },
  {
    id: 'monaco-cup',
    name: 'Coupe du Grand Prix de Monaco',
    significance: 'Awarded specifically inside the Prince’s Palace of Monaco for climbing the apex of Monte Carlo street circuit.',
    weightKr: '6.2 kg',
    materials: 'Solid 18k yellow gold, hand-molded onto a rare piece of red French marble.',
    originYear: 1929,
    anecdotes: [
      'Unlike standard trophies manufactured by contracted firms, are hand-formed by the royal jeweler in Monaco.',
      'Ayrton Senna held a record 6 Monaco cups, keeping three of them inside dynamic glass panels in his head offices.',
      'It represents the exact map layout of the Monaco Grand Prix, starting from Sainte Devote right to Anthony Noghes.'
    ],
    historicalContext: 'Represents the pure soul of luxury Grand Prix racing. Designed to resemble an stylized steering wheel reaching up to hold the Monaco Principality seal. It is considered the single most difficult non-championship cup to win on Earth.'
  },
  {
    id: 'british-gp-trophy',
    name: 'The Royal Automobile Club Tourist Trophy',
    significance: 'An ancient silver cup awarded to the winner of the historic British Grand Prix at Silverstone.',
    weightKr: '9.8 kg',
    materials: 'Victorian-era sterling silver, meticulously hand-chased with delicate classical scrolls.',
    originYear: 1948,
    anecdotes: [
      'This is technically the oldest trophy awarded in F1, predating the official World Championship by 2 years.',
      'Winners do not get to keep the original cup; it resides permanently in the RAC Club in London, with drivers receiving smaller replicas.',
      'Hamilton has lifted this specific trophy 8 times, more than any other driver on home soil.'
    ],
    historicalContext: 'The masterpiece embodies British heritage, styled like an Edwardian loving cup with double handle loops. It represents the origins of Grand Prix racing from the outer airbases of World War II.'
  }
];

export const F1_SPONSORS: SponsorInfo[] = [
  {
    id: 'aramco',
    name: 'Aramco',
    category: 'Global F1 Title Partner & Fuels Sponsor',
    founded: 1933,
    hq: 'Dhahran, Saudi Arabia',
    overview: 'The world\'s leading integrated energy and chemicals enterprise, serving as the central engine of sustainable fuel research in Formula 1.',
    relationshipWithF1: 'Aramco is a Global Partner of Formula 1. They are at the direct vanguard of engineering 100% sustainable advanced fuels scheduled for F1 engines by the 2026 regulations package, heavily investing in carbon Capture and direct injection fuels testing.',
    associatedTeams: ['Aston Martin (Title Sponsor)']
  },
  {
    id: 'petronas',
    name: 'PETRONAS',
    category: 'Fluid Technology Solutions Partner',
    founded: 1974,
    hq: 'Kuala Lumpur, Malaysia',
    overview: 'Malaysian national oil and gas corporation, universally famed for supplying the lifeblood fluids of Mercedes’ historical dominant hybrid engine.',
    relationshipWithF1: 'Sponsoring Mercedes since 2010, Petronas is responsible for the cooling water, high-performance synthetics, and fuels that propelled Lewis Hamilton to multiple championships. They are a core pillar of Brackley’s technical lab.',
    associatedTeams: ['Mercedes-AMG']
  },
  {
    id: 'oracle',
    name: 'Oracle',
    category: 'Cloud Infrastructure & Analytics Partner',
    founded: 1977,
    hq: 'Austin, Texas, USA',
    overview: 'Global computing titan, executing millions of cloud racing simulations per second to optimize race strategy.',
    relationshipWithF1: 'Serving as Red Bull’s Title Partner, Oracle Cloud Infrastructure runs up to 4 billion strategy Monte Carlo simulations every race weekend. They calculate real-time tire degradation under high-speed curves.',
    associatedTeams: ['Red Bull Racing (Title Sponsor)']
  },
  {
    id: 'hp',
    name: 'HP Inc.',
    category: 'Title Technology & Computing Partner',
    founded: 1939,
    hq: 'Palo Alto, California, USA',
    overview: 'A pioneer of personal computers and printing hardware, supplying high-speed telemetry readouts to Scuderia Ferrari.',
    relationshipWithF1: 'Sponsoring Scuderia Ferrari since 2024, HP provides massive on-track computing rigs, real-time visualization units, and deep AI model execution. Their logo occupies a prominent classic spot on Ferrari’s engine cover.',
    associatedTeams: ['Scuderia Ferrari (Title Sponsor)', 'Red Bull Racing (minor)']
  },
  {
    id: 'pirelli',
    name: 'Pirelli',
    category: 'Sole F1 Global Tyre Provider',
    founded: 1872,
    hq: 'Milan, Italy',
    overview: 'Eminent Italian tyre manufacturer, engineering the exclusive rubber compound bounds that keep 1000hp machines glued to the track.',
    relationshipWithF1: 'Pirelli has served as the sole tyre supplier for Formula 1 since 2011. They engineer 5 dry compounds (C1 to C5), intermediates (Green), and full wets (Blue), managing rapid thermal degradation to create high-drama race strategy.',
    associatedTeams: ['All 10 Constructors']
  },
  {
    id: 'rolex',
    name: 'Rolex',
    category: 'Official Timekeeper and Global Partner',
    founded: 1905,
    hq: 'Geneva, Switzerland',
    overview: 'The epitome of high luxury, hand-made precision, and prestige watches, timing every millisecond of F1 races.',
    relationshipWithF1: 'As the Official Timekeeper since 2013, Rolex’s iconic green and gold clock crowns are visible at every pit lane entry. They embody the elite, hyper-precise timing where thousandths of a second make historical differences.',
    associatedTeams: ['F1 Global Partner']
  },
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'Official Cloud & Performance Analytics Engine',
    founded: 2006,
    hq: 'Seattle, Washington, USA',
    overview: 'Cloud hosting powerhouse driving the live television graphic telemetry data that breaks down race speed differences.',
    relationshipWithF1: 'AWS drives "F1 Insights", using machine learning to calculate "Undercut Threat," "Striking Distance," and "Close-Up Corner Battles." They parse thousands of live telemetry endpoints to tell viewers what will happen 3 laps in advance.',
    associatedTeams: ['F1 Global Partner']
  },
  {
    id: 'dhl',
    name: 'DHL',
    category: 'Official Logistics and Fastest Lap Partner',
    founded: 1969,
    hq: 'Bonn, Germany',
    overview: 'Global courier force, executing the high-velocity freight logistics to move the complete F1 circus across 24 countries.',
    relationshipWithF1: 'DHL transports tons of high-value parts, engines, and hospitality units from one continent to another in less than 72 hours. They sponsor the "DHL Fastest Pit Stop Trophy" and the "Fastest Lap Award".',
    associatedTeams: ['F1 Global Partner']
  }
];
