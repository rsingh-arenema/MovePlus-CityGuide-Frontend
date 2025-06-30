import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SectionCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  overview?: string;
  content: string;
  items?: Array<{
    name: string;
    value: string | number;
    description?: string;
    details?: string;
  }>;
  subsections?: {
    [key: string]: {
      title: string;
      description: string;
      items?: Array<{
        name: string;
        value: string | number;
        description?: string;
      }>;
    };
  };
}

// Background images for different sections
const sectionBackgrounds = {
  overview: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  education: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  transportation: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  travel: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  banking: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  internet: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  mobile: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  healthcare: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
};

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  icon: Icon,
  overview,
  content,
  items,
  subsections,
}) => {
  const backgroundImage = sectionBackgrounds[id as keyof typeof sectionBackgrounds];

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut"
      }}
      className="py-12 md:py-16 lg:py-20 scroll-mt-20 relative overflow-hidden"
    >
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single floating orb for performance */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-teal-400/8 to-blue-400/8 rounded-full blur-xl"
        />
        
        {/* Enhanced Background Image with Better Visibility */}
        {backgroundImage && (
          <motion.div
            initial={{ scale: 1.02, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-30"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-blue-50/50 dark:from-teal-900/40 dark:via-transparent dark:to-blue-900/40" />
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Mobile Optimized with Fixed Text Wrapping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 dark:from-teal-800 dark:via-teal-700 dark:to-teal-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 shadow-xl relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-teal-600 dark:text-teal-300 relative z-10" />
            </motion.div>
            
            {/* Fixed title with proper text wrapping and responsive sizing */}
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight break-words hyphens-auto px-4"
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            {overview && (
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {overview}
              </motion.p>
            )}
          </motion.div>

          {/* Main Content with Enhanced Glass Morphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            {/* Glass morphism container - Mobile Optimized */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl md:rounded-[2rem] shadow-xl border border-white/40 dark:border-gray-700/60 overflow-hidden relative">
              {/* Simplified gradient border for performance */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/8 via-blue-500/8 to-purple-500/8 rounded-2xl md:rounded-[2rem]" />
              
              <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16">
                <motion.p 
                  className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 md:mb-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {content}
                </motion.p>

                {/* Enhanced Key Statistics - Mobile Responsive with Faster Loading */}
                {items && items.length > 0 && (
                  <motion.div 
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 md:mb-8">Key Information</h3>
                    <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.3 + index * 0.03
                          }}
                          whileHover={{ 
                            y: -3, 
                            scale: 1.01,
                            transition: { duration: 0.15 }
                          }}
                          className="group relative"
                        >
                          {/* Glass card with mobile optimization */}
                          <div className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-700/95 dark:to-gray-800/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/40 dark:border-gray-600/40 shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden">
                            {/* Simplified shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            
                            <div className="relative z-10">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 md:mb-4">
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg mb-2 sm:mb-0 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 break-words">
                                  {item.name}
                                </h4>
                                <motion.span 
                                  className="text-2xl md:text-3xl font-black bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300 bg-clip-text text-transparent flex-shrink-0"
                                  whileHover={{ scale: 1.03 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {item.value}
                                </motion.span>
                              </div>
                              {item.description && (
                                <p className="text-gray-600 dark:text-gray-300 mb-2 md:mb-3 leading-relaxed text-sm md:text-base">
                                  {item.description}
                                </p>
                              )}
                              {item.details && (
                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 opacity-80">
                                  {item.details}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Subsections - Mobile Responsive with Faster Loading */}
                {subsections && Object.entries(subsections).map(([key, subsection], sectionIndex) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + sectionIndex * 0.05 }}
                    className="mb-12 md:mb-16 last:mb-0"
                  >
                    <div className="relative">
                      {/* Animated border line */}
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 rounded-full"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + sectionIndex * 0.05 }}
                      />
                      
                      <div className="pl-6 md:pl-8">
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6"
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.25 + sectionIndex * 0.05 }}
                        >
                          {subsection.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 md:mb-8"
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + sectionIndex * 0.05 }}
                        >
                          {subsection.description}
                        </motion.p>
                        
                        {subsection.items && subsection.items.length > 0 && (
                          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                            {subsection.items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.35 + sectionIndex * 0.05 + itemIndex * 0.02 }}
                                whileHover={{ 
                                  scale: 1.01,
                                  boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)"
                                }}
                                className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-5 border border-white/50 dark:border-gray-600/50 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-200"
                              >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 md:mb-3">
                                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base mb-1 sm:mb-0 break-words">
                                    {item.name}
                                  </h5>
                                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-md self-start flex-shrink-0">
                                    {item.value}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                    {item.description}
                                  </p>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionCard;