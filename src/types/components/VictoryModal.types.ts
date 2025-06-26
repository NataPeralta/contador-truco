import type { Team } from '../game';

export interface VictoryModalProps {
  winner: Team;
  onNewGame: () => void;
} 