import { useState } from 'react';
import type { TeamManagerProps, Team } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useAlerts } from '../hooks/useAlerts';

export const TeamManager = ({
  teams,
  onAddTeam,
  onUpdateTeamName,
  onRemoveTeam,
  gameStatus
}: TeamManagerProps) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const { showAlert, showConfirm } = useAlerts();  

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      onAddTeam(newTeamName.trim());
      setNewTeamName('');
      showAlert(`Equipo "${newTeamName.trim()}" agregado correctamente`, 'Equipo agregado correctamente', 'success');
    }
  };

  const handleStartEdit = (team: Team) => {
    setEditingTeam(team.id);
    setEditName(team.name);
  };

  const handleSaveEdit = () => {
    if (editingTeam && editName.trim()) {
      onUpdateTeamName(editingTeam, editName.trim());
      setEditingTeam(null);
      setEditName('');
      showAlert(`Nombre del equipo actualizado a "${editName.trim()}"`, 'Nombre del equipo actualizado correctamente', 'success');
    }
  };

  const handleCancelEdit = () => {
    setEditingTeam(null);
    setEditName('');
  };

  const handleRemoveTeam = (team: Team) => {
    showConfirm({
      title: `Equipo "${team.name}" eliminado correctamente`,
      message: 'Equipo eliminado correctamente',
      onConfirm: () => {
        onRemoveTeam(team.id);
      }
    });
  };

  const canRemoveTeam = teams.length > 2;
  const isGameActive = gameStatus === 'playing';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            👥 Equipos Participantes
          </h3>
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            {teams.length} <span className="text-gray-500 dark:text-gray-400">equipos</span>
          </span>
        </div>
        
        {teams.length < 2 && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
            Mínimo 2 equipos
          </div>
        )}
      </div>

      {/* Lista de equipos */}
      <div className="space-y-3 mb-6">
        {teams.map((team, index) => (
          <div 
            key={team.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              
              {editingTeam === team.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1"
                    placeholder="Nombre del equipo"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                  />
                  <Button
                    onClick={handleSaveEdit}
                    variant="green"
                    size="sm"
                    className="w-min"
                    disabled={!editName.trim()}
                  >
                    ✅
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="gray"
                    size="sm"
                    className="w-min"
                  >
                    ❌
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-gray-800 dark:text-white font-medium">
                    {team.name}
                  </span>
                  {isGameActive && (
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {team.score} pts
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isGameActive && editingTeam !== team.id && (
                <Button
                  onClick={() => handleStartEdit(team)}
                  variant="blue"
                  size="sm"
                  className="w-min"
                  aria-label="Editar nombre"
                >
                  ✏️
                </Button>
              )}
              
              {canRemoveTeam && !isGameActive && (
                <Button
                  onClick={() => handleRemoveTeam(team)}
                  variant="red"
                  size="sm"
                  className="w-min"
                  aria-label="Eliminar equipo"
                >
                  🗑️
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Agregar nuevo equipo */}
      {!isGameActive && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ➕ Agregar Nuevo Equipo:
          </h4>
          <div className="flex gap-3">
            <Input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="flex-1"
              placeholder="Nombre del nuevo equipo"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTeam();
              }}
            />
            <Button
              onClick={handleAddTeam}
              variant="green"
              size="sm"
              className="w-min"
              disabled={!newTeamName.trim()}
            >
              Agregar
            </Button>
          </div>
        </div>
      )}

      {/* Información */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Configuración de Equipos:</p>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Mínimo 2 equipos</strong> para poder iniciar el juego</li>
              <li>• Puedes editar los nombres de los equipos antes de comenzar</li>
              <li>• Los equipos se pueden eliminar si hay más de 2</li>
              <li>• No se pueden modificar durante el juego</li>
              <li>• Cada equipo tiene 2 jugadores por defecto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 