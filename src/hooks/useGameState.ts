import { useState, useEffect, useCallback } from 'react';
import type { GameState, Team, RoundHistory, GameSettings } from '../types';

const STORAGE_KEY = 'Truco-game-state';

const initialSettings: GameSettings = {
  totalPoints: 30,
  theme: 'system',
  soundEnabled: true
};

const initialTeams: Team[] = [
  {
    id: 'team1',
    name: 'Equipo 1',
    players: [
      { id: 'player1', name: 'Jugador 1', score: 0 },
      { id: 'player2', name: 'Jugador 2', score: 0 }
    ],
    score: 0
  },
  {
    id: 'team2',
    name: 'Equipo 2',
    players: [
      { id: 'player3', name: 'Jugador 3', score: 0 },
      { id: 'player4', name: 'Jugador 4', score: 0 }
    ],
    score: 0
  }
];

const initialGameState: GameState = {
  teams: initialTeams,
  settings: initialSettings,
  pendingPoints: [],
  roundHistory: [],
  currentRound: 1,
  gameStatus: 'setup'
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialGameState;
    } catch {
      return initialGameState;
    }
  });

  // Persistir estado en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Verificar condición de victoria
  useEffect(() => {
    const winner = gameState.teams.find(team => team.score >= gameState.settings.totalPoints);
    if (winner && gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'finished',
        winner
      }));
    }
  }, [gameState.teams, gameState.settings.totalPoints, gameState.gameStatus]);

  const setTotalPoints = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        totalPoints: points
      }
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      teams: prev.teams.map(team => ({ ...team, score: 0 })),
      roundHistory: [],
      currentRound: 1,
      pendingPoints: [],
      winner: undefined
    }));
  }, []);

  const addPendingPoints = useCallback((teamId: string, points: number, type: 'basic' | 'canto' = 'basic', cantoType?: string) => {
    setGameState(prev => ({
      ...prev,
      pendingPoints: [
        ...prev.pendingPoints,
        {
          teamId,
          points,
          type,
          cantoType: cantoType as any
        }
      ]
    }));
  }, []);

  const removePendingPoints = useCallback((index: number) => {
    setGameState(prev => ({
      ...prev,
      pendingPoints: prev.pendingPoints.filter((_, i) => i !== index)
    }));
  }, []);

  const confirmPoints = useCallback(() => {
    setGameState(prev => {
      const newTeams = prev.teams.map(team => {
        const teamPoints = prev.pendingPoints
          .filter(p => p.teamId === team.id)
          .reduce((sum, p) => sum + p.points, 0);

        return {
          ...team,
          score: team.score + teamPoints
        };
      });

      const roundHistory: RoundHistory = {
        id: Date.now().toString(),
        roundNumber: prev.currentRound,
        timestamp: new Date(),
        points: [...prev.pendingPoints],
        description: prev.pendingPoints.map(p => {
          const team = prev.teams.find(t => t.id === p.teamId);
          return `${team?.name}: +${p.points}`;
        }).join(', ')
      };

      return {
        ...prev,
        teams: newTeams,
        pendingPoints: [],
        roundHistory: [roundHistory, ...prev.roundHistory],
        currentRound: prev.currentRound + 1
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'setup',
      teams: initialTeams,
      pendingPoints: [],
      roundHistory: [],
      currentRound: 1,
      winner: undefined
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    setGameState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings
      }
    }));
  }, []);

  const updateTeamName = useCallback((teamId: string, newName: string) => {
    setGameState(prev => ({
      ...prev,
      teams: prev.teams.map(team =>
        team.id === teamId
          ? { ...team, name: newName }
          : team
      )
    }));
  }, []);

  const addTeam = useCallback((name: string) => {
    setGameState(prev => {
      const newTeamId = `team${prev.teams.length + 1}`;
      const newTeam: Team = {
        id: newTeamId,
        name,
        players: [
          { id: `${newTeamId}_player1`, name: `${name} - Jugador 1`, score: 0 },
          { id: `${newTeamId}_player2`, name: `${name} - Jugador 2`, score: 0 }
        ],
        score: 0
      };

      return {
        ...prev,
        teams: [...prev.teams, newTeam]
      };
    });
  }, []);

  const removeTeam = useCallback((teamId: string) => {
    setGameState(prev => {
      // No permitir eliminar equipos si hay menos de 2
      if (prev.teams.length <= 2) {
        return prev;
      }

      // Eliminar puntos pendientes del equipo
      const filteredPendingPoints = prev.pendingPoints.filter(p => p.teamId !== teamId);

      // Eliminar el equipo
      const filteredTeams = prev.teams.filter(team => team.id !== teamId);

      return {
        ...prev,
        teams: filteredTeams,
        pendingPoints: filteredPendingPoints
      };
    });
  }, []);

  return {
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
    hasPendingPoints: gameState.pendingPoints.length > 0,
    canStartGame: gameState.settings.totalPoints > 0 && gameState.teams.length >= 2
  };
}; 