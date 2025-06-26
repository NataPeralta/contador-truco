import type { RoundHistoryProps } from '../types';

export const RoundHistory = ({ history, teams }: RoundHistoryProps) => {

  const getTotalPoints = (points: any[]) => {
    return points.reduce((sum, point) => sum + point.points, 0);
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Equipo';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          📋 Historial de Rondas
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
          {history.length} rondas
        </span>
      </div>
      
      <div className="max-h-80 overflow-y-auto space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay rondas registradas
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Las rondas aparecerán aquí después de confirmar puntos
            </p>
          </div>
        ) : (
          history.map((round) => (
            <div 
              key={round.id}
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header de la ronda */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-3 rounded-t-lg border-b border-gray-100 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      Ronda {round.roundNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      Total: +{getTotalPoints(round.points)} pts
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido de la ronda */}
              <div className="p-4">
                {/* Resumen de puntos */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Puntos Anotados:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {round.points.map((point, pointIndex) => (
                      <div 
                        key={pointIndex}
                        className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          +{point.points}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {getTeamName(point.teamId)}
                        </span>
                        {point.cantoType && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                            {point.cantoType}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 