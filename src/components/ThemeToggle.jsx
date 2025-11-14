import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { currentTheme, changeTheme, getAvailableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = getAvailableThemes();

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.key === currentTheme);

  return (
    <div className="theme-toggle">
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <span className="theme-icon">🎨</span>
        <span className="theme-name">{currentThemeData?.name || 'Theme'}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <button
              key={theme.key}
              className={`theme-option ${currentTheme === theme.key ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.key)}
            >
              <div className="theme-preview">
                <div 
                  className="theme-preview-bg" 
                  style={{ backgroundColor: theme.background.primary }}
                />
                <div 
                  className="theme-preview-accent" 
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <span className="theme-option-name">{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
