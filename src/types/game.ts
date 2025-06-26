export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  score: number;
}

export interface GameSettings {
  totalPoints: number;
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
}

export interface GameState {
  teams: Team[];
  settings: GameSettings;
  pendingPoints: PendingPoints[];
  roundHistory: RoundHistory[];
  currentRound: number;
  gameStatus: 'setup' | 'playing' | 'finished';
  winner?: Team;
}

export interface PendingPoints {
  teamId: string;
  points: number;
  type: 'basic' | 'canto';
  cantoType?: CantoType;
}

export type CantoType = 'flores' | 'envido' | 'real-envido' | 'truco' | 're-truco' | 'vale-4';

export interface RoundHistory {
  id: string;
  roundNumber: number;
  timestamp: Date;
  points: PendingPoints[];
  description: string;
}

export interface CantoInfo {
  type: CantoType;
  name: string;
  description: string;
  basePoints: number;
  color: string;
} 