import { useEffect, useState } from 'react';
import type { NextComponentType } from 'next';
import SVG from 'react-inlinesvg';
import ThemeLocalStorage, { ThemeTypes } from '../../../configs/ThemeLocalStorage';
import styles from './DarkMode.module.scss';

const DarkMode: NextComponentType = () => {
  const [theme, setTheme] = useState<ThemeTypes>('light');

  useEffect(() => {
    // Get initial state
    setTheme(ThemeLocalStorage.getTheme());
  }, []);

  /**
   * Set colors in CSS root
   */
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    root?.style.setProperty('--bg-dark', isDark ? '#010101' : '#fefefe');
    root?.style.setProperty('--bg-light', isDark ? '#222222' : '#dee4e7');
    root?.style.setProperty('--text-dark', isDark ? '#fefefe' : '#000');
    root?.style.setProperty('--text-light', isDark ? '#dee4e7' : '#222222');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((p) => {
      const t = p === 'dark' ? 'light' : 'dark';
      ThemeLocalStorage.setTheme(t);

      return t;
    });
  };

  return (
    <button
      className={styles['theme-toggle']}
      id="theme-toggle"
      title="Toggles light & dark themes"
      aria-label="auto"
      aria-live="polite"
      onClick={toggleTheme}>
      <SVG src="/assets/sun-icon.svg" data-theme={theme} />
    </button>
  );
};

export default DarkMode;
