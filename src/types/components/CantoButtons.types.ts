import type { Team } from '../game';

export interface CantoButtonsProps {
  teams: Team[];
  onAddCanto: (teamId: string, cantoType: string, points: number) => void;
} 