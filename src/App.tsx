import { Header } from './components/Header';
import { GameSetup } from './components/GameSetup';
import { GameBoard } from './components/GameBoard';
import { VictoryModal } from './components/VictoryModal';
import { TeamManager } from './components/TeamManager';
import { useGameState } from './hooks/useGameState';
import { useTheme } from './hooks/useTheme';

function App() {
  const {
    gameState,
    setTotalPoints,
    startGame,
    addPendingPoints,
    removePendingPoints,
    confirmPoints,
    resetGame,
    updateSettings,
    updateTeamName,
    addTeam,
    removeTeam,
    hasPendingPoints,
    canStartGame
  } = useGameState();

  // Usar el tema desde el estado del juego
  const { resolvedTheme } = useTheme(gameState.settings.theme);

  const handleThemeToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    // Actualizar en el estado del juego
    updateSettings({ theme: newTheme });
  };

  const handleOpenSettings = () => {
    // TODO: Implementar configuración
    console.log('Abrir configuración');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header 
        resolvedTheme={resolvedTheme}
        onThemeToggle={handleThemeToggle}
        onOpenSettings={handleOpenSettings}
      />

      <main className="container mx-auto px-4 py-8">
        {gameState.gameStatus === 'setup' ? (
          <div className="space-y-6">
            <GameSetup
              totalPoints={gameState.settings.totalPoints}
              onTotalPointsChange={setTotalPoints}
              onStartGame={startGame}
              canStart={canStartGame}
              teamCount={gameState.teams.length}
            />
            
            <TeamManager
              teams={gameState.teams}
              onAddTeam={addTeam}
              onRemoveTeam={removeTeam}
              onUpdateTeamName={updateTeamName}
              gameStatus={gameState.gameStatus}
            />
          </div>
        ) : (
          <GameBoard
            gameState={gameState}
            onAddPoints={addPendingPoints}
            onAddCanto={(teamId, cantoType, points) => 
              addPendingPoints(teamId, points, 'canto', cantoType)
            }
            onRemovePoint={removePendingPoints}
            onConfirmPoints={confirmPoints}
            onResetGame={resetGame}
            onUpdateTeamName={updateTeamName}
            hasPendingPoints={hasPendingPoints}
          />
        )}
      </main>

      {gameState.gameStatus === 'finished' && gameState.winner && (
        <VictoryModal
          winner={gameState.winner}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}

export default App;