import { Button } from './ui/Button';
import { TeamScore } from './TeamScore';
import { CantoButtons } from './CantoButtons';
import { PendingPoints } from './PendingPoints';
import { RoundHistory } from './RoundHistory';
import { useAlerts } from '../hooks/useAlerts';
import type { GameBoardProps } from '../types';

export const GameBoard = ({
  gameState,
  onAddPoints,
  onAddCanto,
  onRemovePoint,
  onConfirmPoints,
  onResetGame,
  onUpdateTeamName,
  hasPendingPoints
}: GameBoardProps) => {
  const { showAlert } = useAlerts();

  const handleConfirmPoints = () => {
    onConfirmPoints();
    showAlert('Puntos confirmados correctamente', 'Puntos confirmados correctamente', 'success');
  };

  const handleAddCanto = (teamId: string, cantoType: string, points: number) => {
    onAddCanto(teamId, cantoType, points);
    const team = gameState.teams.find(t => t.id === teamId);
    const cantoName = cantoType === 'truco' ? 'Truco' : 
                     cantoType === 'envido' ? 'Envido' : 
                     cantoType === 'flor' ? 'Flor' : cantoType;
    showAlert(`${cantoName} agregado para ${team?.name} (+${points} puntos)`, `${cantoName} agregado para ${team?.name} (+${points} puntos)`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header del juego */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Partida en Curso
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Total: <span className="font-bold">{gameState.settings.totalPoints}</span> puntos
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 w-full">
              Ronda {gameState.currentRound}
            </span>
            <Button
              onClick={onResetGame}
              variant="gray"
              size="sm"
              
            >
              Nuevo Juego
            </Button>
          </div>
        </div>
      </div>

      {/* Equipos */}
      <div className="grid grid-cols-2 gap-4">
        {gameState.teams.map((team) => (
          <TeamScore
            key={team.id}
            team={team}
            onAddPoints={onAddPoints}
            totalPoints={gameState.settings.totalPoints}
            onUpdateTeamName={onUpdateTeamName}
          />
        ))}
      </div>

      {/* Cantos */}
      <CantoButtons
        teams={gameState.teams}
        onAddCanto={handleAddCanto}
      />

      {/* Puntos pendientes */}
      <PendingPoints
        pendingPoints={gameState.pendingPoints}
        teams={gameState.teams}
        onRemovePoint={onRemovePoint}
        onConfirm={handleConfirmPoints}
        hasPoints={hasPendingPoints}
      />

      {/* Historial */}
      <RoundHistory history={gameState.roundHistory} teams={gameState.teams} />
    </div>
  );
}; 