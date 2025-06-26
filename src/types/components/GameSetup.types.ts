export interface GameSetupProps {
  totalPoints: number;
  onTotalPointsChange: (points: number) => void;
  onStartGame: () => void;
  canStart: boolean;
  teamCount?: number;
} 