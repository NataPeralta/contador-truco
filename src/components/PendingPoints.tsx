import { Button } from './ui/Button';
import type { PendingPointsProps } from '../types';
import { getCantoInfo } from '../data/cantos';  

export const PendingPoints = ({
  pendingPoints,
  teams,
  onRemovePoint,
  onConfirm,
  hasPoints
}: PendingPointsProps) => {
  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Equipo';
  };

  const getTeamPoints = (teamId: string) => {
    return pendingPoints
      .filter(point => point.teamId === teamId)
      .reduce((sum, point) => sum + point.points, 0);
  };

  const teamPoints = teams.map(team => ({
    teamId: team.id,
    points: getTeamPoints(team.id)
  })).filter(team => team.points > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          ⏳ Puntos Pendientes
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {pendingPoints.length} puntos
        </span>
      </div>

      {pendingPoints.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏰</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No hay puntos pendientes
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Agrega puntos para confirmarlos
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Resumen por equipo */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Resumen por Equipo:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teamPoints.map((team) => (
                <div 
                  key={team.teamId}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {getTeamName(team.teamId)}
                  </span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +{team.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista detallada */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Detalle de Puntos:
            </h4>
            <div className="space-y-2">
              {pendingPoints.map((point, index ) => {
                const globalIndex = pendingPoints.findIndex(p => p === point);
                const cantoInfo = point.cantoType ? getCantoInfo(point.cantoType) : null;
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        +{point.points}
                      </span>
                      
                      <div className="flex flex-col">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {getTeamName(point.teamId)}
                        </span>
                        {cantoInfo && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${cantoInfo.color}20`,
                              color: cantoInfo.color 
                            }}
                          >
                            {cantoInfo.name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onRemovePoint(globalIndex)}
                      variant="red"
                      className="p-1 rounded"
                      aria-label="Eliminar punto"
                      size="sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              onClick={onConfirm}
              disabled={!hasPoints}
              className="flex-1"
              variant="green"
            >
              <span className="flex items-center gap-2">
                <span>✅</span>
                Confirmar Puntos
              </span>
            </Button>
            
            <Button
              onClick={() => pendingPoints.forEach((_) => onRemovePoint(0))}
              variant="red"
              className="px-4"
              aria-label="Limpiar todos los puntos"
            > 
              🗑️
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 