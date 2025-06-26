import type { CantoInfo } from '../types';

export const CANTOS: CantoInfo[] = [
  {
    type: 'flores',
    name: 'Flores',
    description: 'Canto básico del juego',
    basePoints: 1,
    color: '#10B981'
  },
  {
    type: 'envido',
    name: 'Envido',
    description: 'Canto de envido',
    basePoints: 2,
    color: '#3B82F6'
  },
  {
    type: 'real-envido',
    name: 'Real Envido',
    description: 'Canto de real envido',
    basePoints: 3,
    color: '#8B5CF6'
  },
  {
    type: 'truco',
    name: 'Truco',
    description: 'Canto de truco',
    basePoints: 2,
    color: '#F59E0B'
  },
  {
    type: 're-truco',
    name: 'Re Truco',
    description: 'Canto de re truco',
    basePoints: 3,
    color: '#EF4444'
  },
  {
    type: 'vale-4',
    name: 'Vale 4',
    description: 'Canto de vale 4',
    basePoints: 4,
    color: '#EC4899'
  }
];

export const getCantoInfo = (cantoType: string): CantoInfo | undefined => {
  return CANTOS.find(c => c.type === cantoType);
};

export const POINTS_OPTIONS = [20, 30, 40] as const; 
