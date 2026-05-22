import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { RestaurantConfig } from '../types';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  secondaryHover: string;
  secondaryLight: string;
  accent: string;
  accentHover: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  config: RestaurantConfig | null;
  setConfig: (config: RestaurantConfig) => void;
}

const defaultColors: ThemeColors = {
  primary: '#dc2626',
  primaryHover: '#b91c1c',
  primaryLight: '#fef2f2',
  secondary: '#16a34a',
  secondaryHover: '#15803d',
  secondaryLight: '#f0fdf4',
  accent: '#f59e0b',
  accentHover: '#d97706',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateColorVariants(baseColor: string) {
  const hsl = hexToHSL(baseColor);
  return {
    base: baseColor,
    hover: hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 10, 10)),
    light: hslToHex(hsl.h, Math.min(hsl.s, 30), 97),
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    if (config) {
      const primary = generateColorVariants(config.primaryColor || '#dc2626');
      const secondary = generateColorVariants(config.secondaryColor || '#16a34a');
      const accent = generateColorVariants(config.accentColor || '#f59e0b');

      const newColors: ThemeColors = {
        primary: primary.base,
        primaryHover: primary.hover,
        primaryLight: primary.light,
        secondary: secondary.base,
        secondaryHover: secondary.hover,
        secondaryLight: secondary.light,
        accent: accent.base,
        accentHover: accent.hover,
      };

      setColors(newColors);

      // Aplicar CSS variables
      const root = document.documentElement;
      root.style.setProperty('--color-primary', primary.base);
      root.style.setProperty('--color-primary-hover', primary.hover);
      root.style.setProperty('--color-primary-light', primary.light);
      root.style.setProperty('--color-secondary', secondary.base);
      root.style.setProperty('--color-secondary-hover', secondary.hover);
      root.style.setProperty('--color-secondary-light', secondary.light);
      root.style.setProperty('--color-accent', accent.base);
      root.style.setProperty('--color-accent-hover', accent.hover);
    }
  }, [config]);

  return (
    <ThemeContext.Provider value={{ colors, config, setConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
