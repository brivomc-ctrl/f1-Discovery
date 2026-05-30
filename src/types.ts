export interface DriverStats {
  championships: number;
  wins: number;
  podiums: number;
  gps: number;
  careerPoints: number;
  currentRank?: number;
}

export interface HelmetInfo {
  colorScheme: string;
  baseColor: string;
  accentColor: string;
  topFeature: string;
  rearSymbol: string;
  designStory: string;
  svgPathAccent?: string; // custom decoration helper
}

export interface Driver {
  id: string;
  name: string;
  number: number;
  code: string; // e.g., "VER", "HAM"
  country: string;
  flagCode: string; // used for flag icons / text
  teamId: string;
  teamName: string;
  birthDate: string;
  birthPlace: string;
  careerHighlight: string;
  bio: string;
  stats: DriverStats;
  helmet: HelmetInfo;
}

export interface TeamStats {
  championships: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  base: string;
  principal: string;
  techChief: string;
  chassis: string;
  powerUnit: string;
  entryYear: number;
  color: string; // Hex color for team theme
  borderColor: string;
  logoChar: string; // F1 short letters
  stats: TeamStats;
  longHistory: string;
  sponsors: string[];
}

export interface RaceGP {
  round: number;
  name: string;
  circuit: string;
  location: string;
  city: string;
  country: string;
  date: string;
  laps: number;
  lengthKm: number;
  lapRecord: {
    time: string;
    holder: string;
    year: number;
  };
  status: 'upcoming' | 'completed' | 'ongoing';
  topThree?: string[]; // Driver names if completed
}

export interface TrophyInfo {
  id: string;
  name: string;
  significance: string;
  weightKr: string;
  materials: string;
  originYear: number;
  anecdotes: string[];
  historicalContext: string;
}

export interface SponsorInfo {
  id: string;
  name: string;
  category: string;
  founded: number;
  hq: string;
  overview: string;
  relationshipWithF1: string;
  associatedTeams: string[];
}

export interface ContactInquiry {
  name: string;
  email: string;
  favoriteTeam: string;
  favoriteDriver: string;
  subject: string;
  message: string;
}
