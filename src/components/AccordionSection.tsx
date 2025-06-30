import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  icon: LucideIcon;
  content: string;
  overview?: string;
  items?: Array<{
    name: string;
    value: string | number;
    description?: string;
    details?: string;
    link?: string;
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
  defaultOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ 
  title, 
  icon: Icon, 
  content, 
  overview,
  items,
  subsections,
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Icon className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="pt-6">
                {/* Overview Section */}
                {overview && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Overview</h4>
                    <p className="text-gray-700 leading-relaxed">{overview}</p>
                  </div>
                )}
                
                {/* Main Description */}
                <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
                
                {/* Key Statistics */}
                {items && items.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-teal-600">
                                {item.value}
                              </span>
                              {item.link && (
                                <ExternalLink className="w-3 h-3 text-gray-400" />
                              )}
                            </div>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                          )}
                          {item.details && (
                            <p className="text-xs text-gray-500">{item.details}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subsections */}
                {subsections && Object.entries(subsections).map(([key, subsection], sectionIndex) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + sectionIndex * 0.1 }}
                    className="mb-6 last:mb-0"
                  >
                    <div className="border-l-4 border-teal-200 pl-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{subsection.title}</h4>
                      <p className="text-gray-700 leading-relaxed mb-4">{subsection.description}</p>
                      
                      {subsection.items && subsection.items.length > 0 && (
                        <div className="grid gap-3 md:grid-cols-2">
                          {subsection.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="bg-white rounded-lg p-3 border border-gray-200"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <h6 className="font-medium text-gray-800 text-sm">{item.name}</h6>
                                <span className="text-xs font-semibold text-teal-600">
                                  {item.value}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-xs text-gray-600">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionSection;