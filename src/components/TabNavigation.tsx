import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  GraduationCap, 
  Bus, 
  Plane, 
  CreditCard, 
  Wifi, 
  Smartphone, 
  Heart 
} from 'lucide-react';

interface TabNavigationProps {
  activeSection: string;
  onTabClick: (sectionId: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'transportation', label: 'Transportation', icon: Bus },
  { id: 'travel', label: 'Travel & Airports', icon: Plane },
  { id: 'banking', label: 'Banking & Finance', icon: CreditCard },
  { id: 'internet', label: 'Internet & TV', icon: Wifi },
  { id: 'mobile', label: 'Mobile Phones', icon: Smartphone },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeSection, onTabClick }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500;
      setIsSticky(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 z-50 ${
        isSticky ? 'fixed top-0 left-0 right-0 shadow-xl' : 'sticky top-0'
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simplified background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ 
                  y: -1,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-3 sm:px-4 md:px-6 py-4 md:py-5 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-2 md:space-x-3 whitespace-nowrap min-w-0 ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {/* Glass effect background for active tab */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/30 dark:border-gray-600/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <motion.div
                  whileHover={{ rotate: isActive ? 180 : 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex-shrink-0"
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                
                <span className="relative z-10 truncate hidden sm:inline">{tab.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Simplified hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default TabNavigation;