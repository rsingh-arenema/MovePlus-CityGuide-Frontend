import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CityHero from './components/CityHero';
import TabNavigation from './components/TabNavigation';
import CityGuide from './components/CityGuide';
import NeighborhoodPage from './components/NeighborhoodPage';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import { CityData } from './types/city';
import { fetchCityData } from './services/api';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'city' | 'neighborhoods'>('city');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const loadCityData = async () => {
      try {
        setLoading(true);
        const data = await fetchCityData('London');
        setCityData(data);
      } catch (err) {
        setError('Failed to load city data');
        console.error('Error loading city data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCityData();
  }, []);

  useEffect(() => {
    if (currentPage === 'city') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 150;
        
        const sections = ['overview', 'education', 'transportation', 'travel', 'banking', 'internet', 'mobile', 'healthcare'];
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const element = document.getElementById(sectionId);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Oops!</h2>
          <p className="text-gray-600 dark:text-gray-400">{error || 'Failed to load city data'}</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'neighborhoods') {
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <NeighborhoodPage onBack={() => setCurrentPage('city')} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <CityHero cityData={cityData} />
        
        {/* Navigation Header */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setCurrentPage('city')}
                  className="px-4 py-4 text-sm font-medium text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 transition-colors"
                >
                  City Guide
                </button>
                <button
                  onClick={() => setCurrentPage('neighborhoods')}
                  className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors border-b-2 border-transparent"
                >
                  Neighborhoods
                </button>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        <TabNavigation 
          activeSection={activeSection} 
          onTabClick={scrollToSection}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CityGuide cityData={cityData} />
        </motion.div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;