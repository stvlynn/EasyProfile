import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
}

export interface ThemeConfig {
  current: string;
  available: Theme[];
}

interface ThemeContextType {
  currentTheme: Theme | null;
  themes: Theme[];
  switchTheme: (themeId: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  themeConfig?: ThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, themeConfig }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (themeConfig) {
      setThemes(themeConfig.available);
      
      // 尝试从localStorage获取用户选择的主题
      const savedThemeId = localStorage.getItem('selectedTheme');
      let selectedTheme: Theme | undefined;
      
      if (savedThemeId) {
        selectedTheme = themeConfig.available.find(theme => theme.id === savedThemeId);
      }
      
      // 如果没有保存的主题或找不到保存的主题，使用配置中的默认主题
      if (!selectedTheme) {
        selectedTheme = themeConfig.available.find(
          theme => theme.id === themeConfig.current
        ) || themeConfig.available[0];
      }
      
      setCurrentTheme(selectedTheme);
      setIsLoading(false);
    }
  }, [themeConfig]);

  const switchTheme = (themeId: string) => {
    const newTheme = themes.find(theme => theme.id === themeId);
    if (newTheme) {
      setCurrentTheme(newTheme);
      // 保存用户选择的主题到localStorage
      localStorage.setItem('selectedTheme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, switchTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};