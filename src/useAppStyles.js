// useAppStyles.js
import { useEffect } from 'react';
import useSettingsStore from './SettingsStore';

export const useAppStyles = () => {
  const { fontSize, fontFamily, lineHeight, theme } = useSettingsStore();

  useEffect(() => {
    // Apply styles to root element
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--font-family', fontFamily);
    document.documentElement.style.setProperty('--line-height', lineHeight);
    
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update meta theme-color
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
      
  }, [fontSize, fontFamily, lineHeight, theme]);
};