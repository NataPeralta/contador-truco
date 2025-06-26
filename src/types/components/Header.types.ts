export interface HeaderProps {
  resolvedTheme: 'light' | 'dark' | 'system';
  onThemeToggle: () => void;
  onOpenSettings: () => void;
}