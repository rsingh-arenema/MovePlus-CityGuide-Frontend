import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  GraduationCap, 
  Bus, 
  Plane, 
  CreditCard, 
  Wifi, 
  Smartphone, 
  Heart,
  ChevronRight
} from 'lucide-react';

interface FloatingSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isVisible: boolean;
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'transportation', label: 'Transportation', icon: Bus },
  { id: 'travel', label: 'Travel & Airports', icon: Plane },
  { id: 'banking', label: 'Banking & Finance', icon: CreditCard },
  { id: 'internet', label: 'Internet & TV', icon: Wifi },
  { id: 'mobile', label: 'Mobile Phones', icon: Smartphone },
  { id: 'healthcare', label: 'Healthcare', icon: Heart },
];

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ 
  activeSection, 
  onSectionClick, 
  isVisible 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 100
          }}
          className="fixed right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block"
        >
          {/* Simplified glass morphism container */}
          <div className="relative">
            {/* Simplified animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl p-[1px]">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl h-full w-full" />
            </div>
            
            {/* Main content */}
            <div className="relative bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/50 p-4 max-w-xs">
              {/* Reduced floating orbs */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400/60 rounded-full blur-sm animate-pulse" />
              
              <motion.h4 
                className="text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4 px-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Quick Navigation
              </motion.h4>
              
              <div className="space-y-1">
                {sidebarItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => onSectionClick(item.id)}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + index * 0.03 }}
                      whileHover={{ 
                        x: 4, 
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center space-x-3 w-full text-left p-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-600 shadow-md'
                          : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Simplified shimmer effect for active item */}
                      {isActive && (
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      )}
                      
                      <motion.div
                        whileHover={{ rotate: isActive ? 180 : 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0 relative z-10" />
                      </motion.div>
                      
                      <span className="text-sm font-medium truncate relative z-10">{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-3 h-3 ml-auto text-teal-600 dark:text-teal-400 relative z-10" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSidebar;