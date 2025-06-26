import { CANTOS } from '../data/cantos';
import type { CantoButtonsProps } from '../types';
import { Button } from './ui/Button';

export const CantoButtons = ({ teams, onAddCanto }: CantoButtonsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
      <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Cantos
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CANTOS.map((canto) => (
          <div key={canto.type} className="space-y-2">
            <div className="text-center">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: canto.color }}
              >
                {canto.name}
              </span>
            </div>
            
            <div className="flex gap-2 justify-center">
              {teams.map((team) => (
                <Button
                  key={`${canto.type}-${team.id}`}
                  onClick={() => onAddCanto(team.id, canto.type, canto.basePoints)}
                  variant="outline"
                >
                  {team.name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 