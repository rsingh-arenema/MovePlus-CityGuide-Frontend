import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionCard from './SectionCard';
import FloatingSidebar from './FloatingSidebar';
import { CityData } from '../types/city';
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

interface CityGuideProps {
  cityData: CityData;
}

const sectionIcons = {
  overview: Info,
  education: GraduationCap,
  transportation: Bus,
  travel: Plane,
  banking: CreditCard,
  internet: Wifi,
  mobile: Smartphone,
  healthcare: Heart,
};

const CityGuide: React.FC<CityGuideProps> = ({ cityData }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showSidebar, setShowSidebar] = useState(false);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: Info,
      content: cityData.overview,
    },
    ...Object.entries(cityData.categories).map(([key, category]) => ({
      id: key,
      title: category.title,
      icon: sectionIcons[key as keyof typeof sectionIcons] || Info,
      content: category.description,
      overview: category.overview,
      items: category.items,
      subsections: category.subsections,
    }))
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      // Show sidebar after scrolling past hero
      setShowSidebar(window.scrollY > 400);
      
      // Update active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-300">
      {/* Sections */}
      <div className="space-y-0">
        {sections.map((section, index) => (
          <SectionCard
            key={section.id}
            id={section.id}
            title={section.title}
            icon={section.icon}
            content={section.content}
            overview={section.overview}
            items={section.items}
            subsections={section.subsections}
          />
        ))}
      </div>

      {/* Floating Sidebar */}
      <FloatingSidebar
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isVisible={showSidebar}
      />
    </div>
  );
};

export default CityGuide;