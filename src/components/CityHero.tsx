import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Cloud, Users, Globe, Calendar, Coins } from 'lucide-react';
import { CityData } from '../types/city';

interface CityHeroProps {
  cityData: CityData;
}

const CityHero: React.FC<CityHeroProps> = ({ cityData }) => {
  const quickStats = [
    { label: 'Population', value: cityData.population, icon: Users },
    { label: 'Area', value: cityData.area, icon: MapPin },
    { label: 'Timezone', value: cityData.timezone, icon: Calendar },
    { label: 'Currency', value: cityData.currency, icon: Coins },
    { label: 'Language', value: cityData.language, icon: Globe },
  ].filter(stat => stat.value);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Optimized Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${cityData.imageUrl})`,
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Enhanced gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 dark:from-black/95 dark:via-black/85 dark:to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Reduced particles for performance */}
        <div className="absolute inset-0 hidden md:block">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            {/* Location Badge - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center mb-6 md:mb-8"
            >
              <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 border border-white/20">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-teal-400 mr-2 md:mr-3" />
                <span className="text-white/90 text-lg md:text-xl font-medium">{cityData.country}</span>
              </div>
            </motion.div>
            
            {/* City Name - Mobile Responsive */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 md:mb-8 leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {cityData.name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + index * 0.03,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="inline-block hover:text-teal-400 transition-colors duration-300 cursor-default"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Snippet - Mobile Optimized */}
            {cityData.snippet && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mb-8 md:mb-10"
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl font-light">
                  {cityData.snippet}
                </p>
              </motion.div>
            )}
            
            {/* Weather Info - Mobile Responsive */}
            {cityData.weather && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-10 md:mb-12"
              >
                <motion.div 
                  className="flex items-center space-x-3 bg-white/15 backdrop-blur-md rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 border border-white/20"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                  <span className="text-white font-medium text-base md:text-lg">{cityData.weather.temperature}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 bg-white/15 backdrop-blur-md rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 border border-white/20"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Cloud className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                  <span className="text-white font-medium text-base md:text-lg">{cityData.weather.condition}</span>
                </motion.div>
              </motion.div>
            )}
            
            {/* Enhanced Quick Stats Grid - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
            >
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
                    }}
                    className="group relative"
                  >
                    {/* Glass morphism card - Mobile Optimized */}
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 text-center border border-white/20 relative overflow-hidden">
                      {/* Simplified background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: 180, scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-teal-400 mx-auto mb-2 md:mb-3" />
                        </motion.div>
                        
                        <motion.div 
                          className="text-white font-bold text-lg md:text-xl mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          {stat.value}
                        </motion.div>
                        
                        <div className="text-white/70 text-xs md:text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent" />
    </div>
  );
};

export default CityHero;