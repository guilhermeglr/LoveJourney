import { useState, useEffect } from 'react';

export type Theme = 'romantic' | 'sunset' | 'ocean';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('romantic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('selected-theme', newTheme);
  };

  return { theme, switchTheme };
}
