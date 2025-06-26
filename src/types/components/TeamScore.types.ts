import type { Team } from '../game';

export interface TeamScoreProps {
  team: Team;
  onAddPoints: (teamId: string, points: number) => void;
  totalPoints: number;
  onUpdateTeamName: (teamId: string, newName: string) => void;
} 