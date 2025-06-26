import React from 'react';
import SunIcon from '../assets/SunIcon';
import MoonIcon from '../assets/MoonIcon';
import SettingsIcon from '../assets/SettingsIcon';
import type { HeaderProps } from '../types/components/Header.types';
import { Button } from './ui/Button';

export const Header: React.FC<HeaderProps> = ({
  resolvedTheme,
  onThemeToggle,
  onOpenSettings
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center h-12 sm:h-14 md:h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎴</span>
              <div className="text-white">
                <h1 className="text-xl font-bold">Contador Truco</h1>
                <p className="text-sm text-blue-100">Aplicación Gratuita</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Toggle de tema */}
            <Button
              onClick={onThemeToggle}
              variant="transparent"
              className="text-white hover:bg-white/20"
              aria-label="Cambiar tema"
            >
              {resolvedTheme === 'dark' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </Button>

            {/* Configuración */}
            <Button
              onClick={onOpenSettings}
              variant="transparent"
              className="text-white hover:bg-white/20"
              aria-label="Configuración"
            >
              <SettingsIcon />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}; 