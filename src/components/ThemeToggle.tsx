import React, { useState } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { currentTheme, themes, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentTheme || themes.length <= 1) {
    return null;
  }

  // 根据当前主题调整按钮样式
  const isMinimalTheme = currentTheme.id === 'minimal';
  const buttonBaseClasses = "flex items-center px-3 py-2 rounded-lg shadow-lg transition-colors duration-300";
  const buttonThemeClasses = isMinimalTheme 
    ? "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50" 
    : "bg-gray-800 hover:bg-gray-700 text-white";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonBaseClasses} ${buttonThemeClasses}`}
      >
        <Palette size={18} className="mr-2" />
        <span className="text-sm font-medium">{currentTheme.name}</span>
        <ChevronDown 
          size={16} 
          className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-xl border z-50 ${
            isMinimalTheme 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="py-2">
              {themes.map((theme) => {
                const isActive = currentTheme.id === theme.id;
                const buttonClasses = isMinimalTheme
                  ? `w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  : `w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`;
                
                return (
                <button
                  key={theme.id}
                  onClick={() => {
                    switchTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={buttonClasses}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{theme.name}</div>
                      <div className={`text-xs mt-1 ${isMinimalTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                        {theme.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className={`w-2 h-2 rounded-full ${isMinimalTheme ? 'bg-gray-800' : 'bg-blue-500'}`} />
                    )}
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};