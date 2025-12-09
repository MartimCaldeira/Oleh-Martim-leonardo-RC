import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 py-4 bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3 neu-flat px-4 py-2 rounded-full">
          <Globe className="w-6 h-6 text-primary animate-pulse-slow" />
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            REST <span className="text-primary">Explorer</span>
          </h1>
        </div>

        <button 
          onClick={toggleTheme}
          className="neu-icon-btn"
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </button>
      </div>
    </header>
  );
}
