import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeClass = "dark";
    const element = document.documentElement;

    if (isDarkMode) {
      element.classList.add(darkModeClass);
      element.style.colorScheme = "dark";
    } else {
      element.classList.remove(darkModeClass);
      element.style.colorScheme = "light";
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white mr-4"
    >
      Mode
    </button>
  );
}
