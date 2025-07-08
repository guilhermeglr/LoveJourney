import { Theme } from '@/hooks/use-theme';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex space-x-2">
        <button
          onClick={() => onThemeChange('romantic')}
          className={`w-8 h-8 rounded-full gradient-romantic border-2 border-white shadow-lg transition-transform hover:scale-110 ${
            currentTheme === 'romantic' ? 'ring-2 ring-white' : ''
          }`}
          title="Tema Romântico"
        />
        <button
          onClick={() => onThemeChange('sunset')}
          className={`w-8 h-8 rounded-full gradient-sunset border-2 border-white shadow-lg transition-transform hover:scale-110 ${
            currentTheme === 'sunset' ? 'ring-2 ring-white' : ''
          }`}
          title="Tema Pôr do Sol"
        />
        <button
          onClick={() => onThemeChange('ocean')}
          className={`w-8 h-8 rounded-full gradient-ocean border-2 border-white shadow-lg transition-transform hover:scale-110 ${
            currentTheme === 'ocean' ? 'ring-2 ring-white' : ''
          }`}
          title="Tema Oceano"
        />
      </div>
    </div>
  );
}
