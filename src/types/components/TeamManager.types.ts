import type { Team } from '../game';

export interface TeamManagerProps {
  teams: Team[];
  onAddTeam: (name: string) => void;
  onRemoveTeam: (teamId: string) => void;
  onUpdateTeamName: (teamId: string, newName: string) => void;
  gameStatus: 'setup' | 'playing' | 'finished';
} 