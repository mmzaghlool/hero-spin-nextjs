export type ThemeTypes = 'dark' | 'light';

class ThemeLocalStorage {
  static KEY = 'THEME';

  static getTheme(): ThemeTypes {
    let theme = localStorage.getItem(ThemeLocalStorage.KEY);
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return theme as ThemeTypes;
  }

  static setTheme(theme: ThemeTypes) {
    localStorage.setItem(ThemeLocalStorage.KEY, theme);
  }

  static listenToSystemPreferences(callback: (isDark: boolean) => void) {
    // Listen to state changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
      callback(isDark);
    });
  }
}

export default ThemeLocalStorage;
