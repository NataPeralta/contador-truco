import type { GameState } from '../game';

export interface GameBoardProps {
  gameState: GameState;
  onAddPoints: (teamId: string, points: number) => void;
  onAddCanto: (teamId: string, cantoType: string, points: number) => void;
  onRemovePoint: (index: number) => void;
  onConfirmPoints: () => void;
  onResetGame: () => void;
  onUpdateTeamName: (teamId: string, newName: string) => void;
  hasPendingPoints: boolean;
} 