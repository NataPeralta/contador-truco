import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import type { VictoryModalProps } from '../types';

export const VictoryModal = ({ winner, onNewGame }: VictoryModalProps) => {
  return (
    <Modal isOpen={true} onClose={() => {}} title="Victoria">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          ¡Victoria!
        </h2>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {winner.name}
          </span> ha ganado la partida
        </p>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-300 font-medium">
            Puntuación final: {winner.score} puntos
          </p>
        </div>
        
        <Button
          onClick={onNewGame}
          variant="green"
          className="w-full max-w-xs"
        >
          Jugar Otra Vez
        </Button>
      </div>
    </Modal>
  );
}; 