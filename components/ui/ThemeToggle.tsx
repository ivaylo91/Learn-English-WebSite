'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-[var(--bg-2)]"
      style={{ color: 'var(--muted)' }}
      aria-label={theme === 'dark' ? 'Светъл режим' : 'Тъмен режим'}
    >
      {theme === 'dark'
        ? <Sun className="w-4 h-4" />
        : <Moon className="w-4 h-4" />}
    </button>
  );
}
