import React, { createContext, useContext, useState, useEffect } from 'react';
import colors from '../../colors.json';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [customColors, setCustomColors] = useState({});

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColors = localStorage.getItem('customColors');
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedColors) {
      try {
        setCustomColors(JSON.parse(savedColors));
      } catch (error) {
        console.error('Error parsing saved custom colors:', error);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Apply custom colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(customColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [customColors]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  const updateCustomColor = (colorKey, colorValue) => {
    const newCustomColors = { ...customColors, [colorKey]: colorValue };
    setCustomColors(newCustomColors);
    localStorage.setItem('customColors', JSON.stringify(newCustomColors));
  };

  const resetCustomColors = () => {
    setCustomColors({});
    localStorage.removeItem('customColors');
    
    // Reset CSS variables to default values
    const root = document.documentElement;
    Object.keys(customColors).forEach(key => {
      root.style.removeProperty(`--${key}`);
    });
  };

  const getThemeColors = () => {
    return colors.themes[currentTheme] || colors.themes.light;
  };

  const getAvailableThemes = () => {
    return Object.keys(colors.themes).map(key => ({
      key,
      ...colors.themes[key]
    }));
  };

  const getColorValue = (colorPath) => {
    // Support dot notation like 'primary.900' or 'text.primary'
    const keys = colorPath.split('.');
    let value = colors;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return value;
  };

  const value = {
    currentTheme,
    customColors,
    changeTheme,
    updateCustomColor,
    resetCustomColors,
    getThemeColors,
    getAvailableThemes,
    getColorValue,
    colors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
