import { useEffect, useState } from 'react';
import { IoMdSunny } from 'react-icons/io';
import { MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // 👈 Default is now 'light'
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-white dark:bg-color-dark-lite">
      {theme === 'dark' ? <IoMdSunny size={20} color="#000000" /> : <MdDarkMode size={20} color="#1E1E1E" />}
    </button>
  );
};

export default ThemeToggle;
