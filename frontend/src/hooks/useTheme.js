import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/slices/uiSlice';
import { storage } from '../utils/storage';

// Keeps the <html> class and localStorage in sync with the Redux theme
export default function useTheme() {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    storage.set('theme', theme);
  }, [theme]);

  return theme;
}
