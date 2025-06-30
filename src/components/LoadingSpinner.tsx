import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Reduced animated background elements for performance */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-center relative z-10"
      >
        {/* Optimized glass morphism container */}
        <div className="bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl border border-white/30 dark:border-gray-700/50 relative overflow-hidden">
          {/* Simplified animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl md:rounded-3xl" />
          
          <div className="relative z-10">
            {/* Optimized loading spinner */}
            <motion.div
              className="relative inline-block mb-6 md:mb-8"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="relative">
                <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-teal-600 dark:text-teal-400" />
                
                {/* Simplified outer ring */}
                <motion.div
                  className="absolute inset-0 border-2 md:border-4 border-teal-200 dark:border-teal-800 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-3 md:mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Loading City Data
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 text-base md:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Fetching the latest information...
            </motion.p>
            
            {/* Loading dots */}
            <div className="flex justify-center space-x-2 mt-4 md:mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-teal-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;