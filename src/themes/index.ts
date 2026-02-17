export const THEMES = {
  matrix: { bg: 'bg-black', text: 'text-green-400', prompt: 'text-green-300', cursor: 'bg-green-400', name: 'Matrix' },
  amber: { bg: 'bg-black', text: 'text-amber-500', prompt: 'text-amber-400', cursor: 'bg-amber-500', name: 'Amber' },
  blue: { bg: 'bg-blue-950', text: 'text-blue-300', prompt: 'text-blue-200', cursor: 'bg-blue-300', name: 'IBM Blue' },
  hacker: { bg: 'bg-black', text: 'text-lime-400', prompt: 'text-lime-300', cursor: 'bg-lime-400', name: 'Hacker' },
  cyberpunk: { bg: 'bg-purple-950', text: 'text-pink-400', prompt: 'text-cyan-400', cursor: 'bg-pink-400', name: 'Cyberpunk' },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type ThemeConfig = (typeof THEMES)[ThemeKey];
