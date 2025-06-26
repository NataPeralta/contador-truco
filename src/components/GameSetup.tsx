import { Button } from './ui/Button';
import { POINTS_OPTIONS } from '../data/cantos';
import type { GameSetupProps } from '../types';

export const GameSetup = ({ 
  totalPoints, 
  onTotalPointsChange, 
  onStartGame, 
  canStart,
  teamCount = 0
}: GameSetupProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        🎮 Configurar Partida
      </h2>
      
      <div className="space-y-6">
        {/* Configuración de puntos */}
        <div className="text-center">
          <label className="block text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            🎯 Total de puntos para ganar:
          </label>
          <div className="flex justify-center gap-4 mb-6">
            {POINTS_OPTIONS.map((points) => (
              <Button
                key={points}
                onClick={() => onTotalPointsChange(points)}
                variant={totalPoints === points ? 'blue' : 'outline'}
                size="lg"
              >
                {points}
              </Button>
            ))}
          </div>
        </div>

        {/* Estado de equipos */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Equipos configurados
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {teamCount} equipos
                </p>
              </div>
            </div>
            
            <div className="text-right">
              {teamCount >= 2 ? (
                <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                  ✅ Listo
                </div>
              ) : (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
                  ⚠️ Mínimo 2 equipos
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de inicio */}
        <div className="text-center">
          <Button
            onClick={onStartGame}
            disabled={!canStart}
            variant="blue"
            size="lg"
            className="w-full max-w-xs"
          >
            {canStart ? (
              <>
                🚀 Comenzar Juego
              </>
            ) : (
              <>
                ⏳ Configurar Equipos
              </>
            )}
          </Button>
          
          {!canStart && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Completa la configuración de equipos para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 