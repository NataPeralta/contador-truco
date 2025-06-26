import type { TeamScoreProps } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useState } from 'react';
export const TeamScore = ({ team, onAddPoints, totalPoints, onUpdateTeamName }: TeamScoreProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(team.name);
  
  const isWinning = team.score >= totalPoints;
  const progressPercentage = Math.min((team.score / totalPoints) * 100, 100);
  const remainingPoints = totalPoints - team.score;

  const handleEditStart = () => {
    setIsEditing(true);
    setEditName(team.name);
  };

  const handleEditSave = () => {
    if (editName.trim()) {
      onUpdateTeamName(team.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditName(team.name);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      {/* Header del equipo */}
      <div className="text-center mb-6">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              type="text"
              value={editName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-center text-lg font-bold"
            />
            <div className="flex justify-center gap-2">
              <Button
                onClick={handleEditSave}
                variant="green"
                size="sm"
              >
                ✓ Guardar
              </Button>
              <Button
                onClick={handleEditCancel}
                variant="gray"
                size="sm"
              >
                ✕ Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <h3 
            className="text-xl font-bold text-gray-800 dark:text-white mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
            onClick={handleEditStart}
            title="Haz clic para editar el nombre"
          >
            {team.name}
            <span className="ml-2 text-sm opacity-50">✏️</span>
          </h3>
        )}
        
        <div className="flex justify-center items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {team.players.length} jugadores
          </span>
        </div>
      </div>
      
      {/* Puntuación principal */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-3 transition-all duration-500 ${
          isWinning 
            ? 'text-green-600 dark:text-green-400 animate-pulse' 
            : 'text-blue-600 dark:text-blue-400'
        }`}>
          {team.score}
        </div>
        
        {/* Barra de progreso */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full transition-all duration-700 ease-out ${
                isWinning ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {team.score} / {totalPoints}
            </span>
            {!isWinning && (
              <span className="text-gray-500 dark:text-gray-400">
                Faltan {remainingPoints} pts
              </span>
            )}
          </div>
        </div>

        {/* Estado del equipo */}
        {isWinning ? (
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg font-medium">
            🏆 ¡Victoria!
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {progressPercentage >= 80 ? '¡Casi gana!' : 
             progressPercentage >= 60 ? 'Bien posicionado' :
             progressPercentage >= 40 ? 'En carrera' : 'Comenzando'}
          </div>
        )}
      </div>

      {/* Botones de puntos */}
      <div className="space-y-3">
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Agregar Puntos:
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((points) => (
            <Button
              key={points}
              onClick={() => onAddPoints(team.id, points)}
              disabled={isWinning}
              variant="blue"
              size="md"
            >
              +{points}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}; 