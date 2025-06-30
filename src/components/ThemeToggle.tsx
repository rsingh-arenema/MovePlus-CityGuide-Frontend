import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;