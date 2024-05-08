import React, { createContext, useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const commonComponents = {
    Menu: {
      lineWidth: 0
    }
  };

  const newTheme = theme === 'dark' ? {
    ...commonComponents,
    algorithm: antdTheme.darkAlgorithm,
    token: {
      // colorBgBase: '#202836',
    }
  } : {
    ...commonComponents,
    algorithm: antdTheme.defaultAlgorithm
  };

  return (
    <ConfigProvider theme={newTheme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export { ThemeProvider, ThemeContext };
