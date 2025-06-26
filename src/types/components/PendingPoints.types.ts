import type { Team, PendingPoints } from '../game';

export interface PendingPointsProps {
  pendingPoints: PendingPoints[];
  teams: Team[];
  onRemovePoint: (index: number) => void;
  onConfirm: () => void;
  hasPoints: boolean;
} 