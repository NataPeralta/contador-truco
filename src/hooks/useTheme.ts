import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = (initialTheme: Theme = 'system') => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar obtener el tema guardado en localStorage
    try {
      const saved = localStorage.getItem('truco-theme');
      return saved ? (saved as Theme) : initialTheme;
    } catch {
      return initialTheme;
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    // Determinar el tema inicial basado en la preferencia del sistema
    if (typeof window !== 'undefined') {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme;
    }
    return 'light';
  });

  useEffect(() => {
    const updateResolvedTheme = () => {
      let newResolvedTheme: 'light' | 'dark';

      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newResolvedTheme = theme;
      }

      setResolvedTheme(newResolvedTheme);

      // Aplicar tema al documento inmediatamente
      const root = document.documentElement;
      if (newResolvedTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateResolvedTheme();

    // Escuchar cambios en la preferencia del sistema
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Guardar el tema en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('truco-theme', theme);
    } catch {
      // Ignorar errores de localStorage
    }
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme
  };
}; 