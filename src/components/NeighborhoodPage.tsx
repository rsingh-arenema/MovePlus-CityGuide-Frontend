import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  TrendingUp, 
  Home, 
  Car, 
  Clock, 
  DollarSign,
  Star,
  Navigation,
  Building,
  Train,
  Coffee,
  ShoppingBag,
  Heart,
  GraduationCap,
  Wifi,
  Shield,
  Users,
  ArrowLeft,
  Filter,
  Settings,
  Sparkles,
  Target
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../App';

interface NeighborhoodData {
  id: string;
  name: string;
  score: string;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C';
  rent: string;
  commute: string;
  coordinates: [number, number];
  stats: {
    walkScore: number;
    transitScore: number;
    bikeScore: number;
    crimeRate: string;
    schools: number;
    restaurants: number;
    cafes: number;
    shops: number;
  };
  details: {
    overview: string;
    transportation: string;
    amenities: string;
    demographics: string;
  };
  nearbyPlaces: Array<{
    name: string;
    type: string;
    distance: string;
    rating: number;
  }>;
}

interface OfficeLocation {
  address: string;
  coordinates: [number, number];
  neighborhood: string;
}

interface NeighborhoodPageProps {
  onBack: () => void;
}

const NeighborhoodPage: React.FC<NeighborhoodPageProps> = ({ onBack }) => {
  const { isDark } = useTheme();
  const [officeAddress, setOfficeAddress] = useState('');
  const [officeLocation, setOfficeLocation] = useState<OfficeLocation | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodData[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('best-match');
  const [maxCommute, setMaxCommute] = useState(60);
  const [maxRent, setMaxRent] = useState(3000);

  // Mock neighborhood data with real London coordinates
  const mockNeighborhoods: NeighborhoodData[] = [
    {
      id: 'kensington',
      name: 'Kensington',
      score: '95',
      grade: 'A+',
      rent: '£2,800',
      commute: '25min',
      coordinates: [51.5020, -0.1947], // Real Kensington coordinates
      stats: {
        walkScore: 92,
        transitScore: 88,
        bikeScore: 75,
        crimeRate: 'Low',
        schools: 15,
        restaurants: 120,
        cafes: 45,
        shops: 80
      },
      details: {
        overview: 'Upscale area known for museums, parks, and Victorian architecture. Home to the Natural History Museum and Hyde Park.',
        transportation: 'Excellent tube connections with District, Circle, and Piccadilly lines. Multiple bus routes.',
        amenities: 'High-end shopping, world-class museums, beautiful parks, and fine dining establishments.',
        demographics: 'Mix of young professionals and established families. International community.'
      },
      nearbyPlaces: [
        { name: 'Hyde Park', type: 'Park', distance: '0.3 miles', rating: 4.8 },
        { name: 'Natural History Museum', type: 'Museum', distance: '0.5 miles', rating: 4.7 },
        { name: 'Harrods', type: 'Shopping', distance: '0.8 miles', rating: 4.5 },
        { name: 'Royal Albert Hall', type: 'Entertainment', distance: '0.4 miles', rating: 4.6 }
      ]
    },
    {
      id: 'shoreditch',
      name: 'Shoreditch',
      score: '88',
      grade: 'A',
      rent: '£2,400',
      commute: '18min',
      coordinates: [51.5225, -0.0786], // Real Shoreditch coordinates
      stats: {
        walkScore: 95,
        transitScore: 85,
        bikeScore: 82,
        crimeRate: 'Medium',
        schools: 8,
        restaurants: 200,
        cafes: 85,
        shops: 150
      },
      details: {
        overview: 'Trendy area known for street art, nightlife, and creative industries. Popular with young professionals.',
        transportation: 'Great connections via Overground and multiple bus routes. Close to Liverpool Street.',
        amenities: 'Vibrant nightlife, street food markets, independent shops, and co-working spaces.',
        demographics: 'Young professionals, artists, and creatives. Very diverse and international.'
      },
      nearbyPlaces: [
        { name: 'Brick Lane Market', type: 'Market', distance: '0.4 miles', rating: 4.4 },
        { name: 'Old Street Station', type: 'Transport', distance: '0.6 miles', rating: 4.2 },
        { name: 'Boxpark Shoreditch', type: 'Shopping', distance: '0.2 miles', rating: 4.3 },
        { name: 'Columbia Road Flower Market', type: 'Market', distance: '0.5 miles', rating: 4.6 }
      ]
    },
    {
      id: 'clapham',
      name: 'Clapham',
      score: '82',
      grade: 'A',
      rent: '£2,100',
      commute: '32min',
      coordinates: [51.4618, -0.1384], // Real Clapham coordinates
      stats: {
        walkScore: 88,
        transitScore: 90,
        bikeScore: 70,
        crimeRate: 'Low',
        schools: 12,
        restaurants: 95,
        cafes: 35,
        shops: 60
      },
      details: {
        overview: 'Popular residential area with great parks and nightlife. Known for its young professional community.',
        transportation: 'Excellent tube and rail connections. Northern line and National Rail services.',
        amenities: 'Large common spaces, good restaurants, active nightlife, and fitness facilities.',
        demographics: 'Predominantly young professionals in their 20s and 30s. Very social community.'
      },
      nearbyPlaces: [
        { name: 'Clapham Common', type: 'Park', distance: '0.2 miles', rating: 4.5 },
        { name: 'Clapham Junction', type: 'Transport', distance: '0.8 miles', rating: 4.1 },
        { name: 'Northcote Road', type: 'Shopping', distance: '0.6 miles', rating: 4.3 },
        { name: 'The Windmill', type: 'Entertainment', distance: '0.3 miles', rating: 4.4 }
      ]
    },
    {
      id: 'canary-wharf',
      name: 'Canary Wharf',
      score: '78',
      grade: 'B+',
      rent: '£2,600',
      commute: '5min',
      coordinates: [51.5054, -0.0235], // Real Canary Wharf coordinates
      stats: {
        walkScore: 85,
        transitScore: 95,
        bikeScore: 65,
        crimeRate: 'Very Low',
        schools: 5,
        restaurants: 80,
        cafes: 25,
        shops: 40
      },
      details: {
        overview: 'Modern financial district with high-rise living. Perfect for finance professionals.',
        transportation: 'Exceptional transport links with DLR, Jubilee line, and Crossrail.',
        amenities: 'Modern shopping centers, corporate dining, and waterfront views.',
        demographics: 'Finance professionals and international business people. Very career-focused.'
      },
      nearbyPlaces: [
        { name: 'Canary Wharf Shopping Centre', type: 'Shopping', distance: '0.1 miles', rating: 4.2 },
        { name: 'Museum of London Docklands', type: 'Museum', distance: '0.3 miles', rating: 4.4 },
        { name: 'Jubilee Park', type: 'Park', distance: '0.2 miles', rating: 4.1 },
        { name: 'Crossrail Place', type: 'Transport', distance: '0.1 miles', rating: 4.3 }
      ]
    },
    {
      id: 'camden',
      name: 'Camden',
      score: '85',
      grade: 'A',
      rent: '£2,200',
      commute: '22min',
      coordinates: [51.5424, -0.1419], // Real Camden coordinates
      stats: {
        walkScore: 90,
        transitScore: 92,
        bikeScore: 78,
        crimeRate: 'Medium',
        schools: 10,
        restaurants: 150,
        cafes: 60,
        shops: 120
      },
      details: {
        overview: 'Vibrant area famous for its markets, music venues, and alternative culture. Great for creative types.',
        transportation: 'Excellent Northern line connections and multiple bus routes.',
        amenities: 'Famous markets, live music venues, diverse dining, and canal-side walks.',
        demographics: 'Mix of students, young professionals, and artists. Very eclectic community.'
      },
      nearbyPlaces: [
        { name: 'Camden Market', type: 'Market', distance: '0.1 miles', rating: 4.3 },
        { name: 'Regent\'s Park', type: 'Park', distance: '0.5 miles', rating: 4.7 },
        { name: 'The Roundhouse', type: 'Entertainment', distance: '0.3 miles', rating: 4.5 },
        { name: 'Camden Lock', type: 'Attraction', distance: '0.2 miles', rating: 4.4 }
      ]
    },
    {
      id: 'greenwich',
      name: 'Greenwich',
      score: '75',
      grade: 'B+',
      rent: '£1,800',
      commute: '35min',
      coordinates: [51.4934, 0.0098], // Real Greenwich coordinates
      stats: {
        walkScore: 82,
        transitScore: 85,
        bikeScore: 68,
        crimeRate: 'Low',
        schools: 14,
        restaurants: 70,
        cafes: 25,
        shops: 45
      },
      details: {
        overview: 'Historic maritime area with beautiful parks and river views. More affordable option with character.',
        transportation: 'DLR and National Rail connections. River bus services available.',
        amenities: 'Historic sites, Greenwich Park, weekend markets, and riverside pubs.',
        demographics: 'Families and young professionals seeking more space and value.'
      },
      nearbyPlaces: [
        { name: 'Greenwich Park', type: 'Park', distance: '0.2 miles', rating: 4.6 },
        { name: 'National Maritime Museum', type: 'Museum', distance: '0.3 miles', rating: 4.5 },
        { name: 'Greenwich Market', type: 'Market', distance: '0.1 miles', rating: 4.2 },
        { name: 'Cutty Sark', type: 'Attraction', distance: '0.4 miles', rating: 4.3 }
      ]
    }
  ];

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeAddress.trim()) return;

    setLoading(true);
    setSearchSubmitted(true);

    // Simulate API call with faster loading
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mock office location - City of London
    setOfficeLocation({
      address: officeAddress,
      coordinates: [51.5074, -0.1278], // City of London coordinates
      neighborhood: 'City of London'
    });

    setNeighborhoods(mockNeighborhoods);
    setLoading(false);
  };

  const getScoreColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-emerald-500';
      case 'A': return 'bg-green-500';
      case 'B+': return 'bg-yellow-500';
      case 'B': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  const filteredNeighborhoods = neighborhoods.filter(n => {
    const commuteMinutes = parseInt(n.commute);
    const rentAmount = parseInt(n.rent.replace(/[£,]/g, ''));
    return commuteMinutes <= maxCommute && rentAmount <= maxRent;
  });

  const sortedNeighborhoods = [...filteredNeighborhoods].sort((a, b) => {
    switch (activeFilter) {
      case 'rent':
        return parseInt(a.rent.replace(/[£,]/g, '')) - parseInt(b.rent.replace(/[£,]/g, ''));
      case 'commute':
        return parseInt(a.commute) - parseInt(b.commute);
      case 'score':
        return parseInt(b.score) - parseInt(a.score);
      default:
        return parseInt(b.score) - parseInt(a.score);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs for visual appeal */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 dark:bg-teal-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-400/5 via-blue-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/5 via-pink-400/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Enhanced Header with Glass Morphism */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 transition-colors duration-300 relative"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button 
                onClick={onBack}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-xl transition-all duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="p-2 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 rounded-xl">
                  <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Neighborhoods
                </h1>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Enhanced Filter Buttons */}
              <motion.div 
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Filters:</span>
                <div className="flex space-x-1">
                  {['BEST MATCH', 'RENT', 'COMMUTE', 'CLOSER LOOK'].map((filter, index) => (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter.toLowerCase().replace(' ', '-'))}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 relative overflow-hidden ${
                        activeFilter === filter.toLowerCase().replace(' ', '-')
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                      }`}
                    >
                      {activeFilter === filter.toLowerCase().replace(' ', '-') && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                      )}
                      <span className="relative z-10">{filter}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {!searchSubmitted ? (
        /* Enhanced Office Address Input Section */
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
          {/* Enhanced Background */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 dark:from-black/95 dark:via-black/85 dark:to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Floating particles */}
            <div className="absolute inset-0 hidden md:block">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 h-full flex items-center justify-center"
          >
            <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
              {/* Enhanced Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/15 backdrop-blur-md rounded-3xl mb-8 border border-white/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20" />
                <Target className="w-10 h-10 md:w-12 md:h-12 text-teal-400 relative z-10" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
              >
                We need your{' '}
                <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  office address!
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light"
              >
                For accurate information and neighborhood match, we need your new office location
              </motion.p>

              {/* Enhanced Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                onSubmit={handleAddressSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              >
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    placeholder="Enter office address"
                    className="w-full pl-12 md:pl-14 pr-4 py-4 md:py-5 rounded-2xl border-0 text-lg md:text-xl bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300 shadow-xl"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 text-white font-bold rounded-2xl hover:from-teal-700 hover:via-teal-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>ANALYZING...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>LET'S DO THIS</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
          
          {/* Enhanced bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent" />
        </div>
      ) : (
        /* Enhanced Main Content */
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enhanced Map Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Glass morphism container */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/60 overflow-hidden relative">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl" />
                  
                  {/* Enhanced Map Controls */}
                  <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 relative z-10">
                    <div className="flex flex-wrap items-center gap-4">
                      {[
                        { color: 'emerald-500', label: 'A+ (Excellent)' },
                        { color: 'green-500', label: 'A (Very Good)' },
                        { color: 'yellow-500', label: 'B+ (Good)' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <div className={`w-3 h-3 bg-${item.color} rounded-full shadow-sm`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">MATCH SCORE</span>
                      <div className="flex space-x-1">
                        {['red-400', 'orange-400', 'yellow-400', 'green-400', 'emerald-500'].map((color, index) => (
                          <motion.div
                            key={color}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                            className={`w-2 h-4 bg-${color} rounded-sm shadow-sm`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">LOW → HIGH</span>
                    </motion.div>
                  </div>

                  {/* Map Container */}
                  <div className="h-96 md:h-[500px] relative z-10">
                    <InteractiveMap
                      neighborhoods={sortedNeighborhoods}
                      officeLocation={officeLocation || undefined}
                      onNeighborhoodClick={setSelectedNeighborhood}
                      selectedNeighborhood={selectedNeighborhood}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Enhanced Preferences Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/60 p-6 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        Preferences
                      </h3>
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Settings className="w-5 h-5 text-teal-500" />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Enhanced Commute Slider */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Max daily commute one way
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            min="10"
                            max="90"
                            value={maxCommute}
                            onChange={(e) => setMaxCommute(parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${((maxCommute - 10) / 80) * 100}%, #e5e7eb ${((maxCommute - 10) / 80) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                          <motion.span 
                            className="text-sm font-bold text-teal-600 dark:text-teal-400 min-w-[70px] bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-lg"
                            key={maxCommute}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {maxCommute} min
                          </motion.span>
                        </div>
                      </div>
                      
                      {/* Enhanced Rent Slider */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Max monthly rent
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            min="1000"
                            max="5000"
                            step="100"
                            value={maxRent}
                            onChange={(e) => setMaxRent(parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${((maxRent - 1000) / 4000) * 100}%, #e5e7eb ${((maxRent - 1000) / 4000) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                          <motion.span 
                            className="text-sm font-bold text-teal-600 dark:text-teal-400 min-w-[80px] bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-lg"
                            key={maxRent}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            £{maxRent}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Neighborhood List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/60 p-6 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        Top Neighborhoods ({sortedNeighborhoods.length})
                      </h3>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Filter className="w-5 h-5 text-blue-500" />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                      {sortedNeighborhoods.map((neighborhood, index) => (
                        <motion.div
                          key={neighborhood.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + index * 0.03 }}
                          onClick={() => setSelectedNeighborhood(neighborhood)}
                          whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative cursor-pointer"
                        >
                          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-gray-600/50 hover:border-teal-300 dark:hover:border-teal-500 transition-all duration-300 relative overflow-hidden">
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            
                            <div className="relative z-10">
                              <div className="flex items-center space-x-3 mb-3">
                                <motion.div 
                                  className={`w-4 h-4 rounded-full ${getScoreColor(neighborhood.grade)} shadow-sm`}
                                  whileHover={{ scale: 1.2 }}
                                  transition={{ duration: 0.2 }}
                                />
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                  {neighborhood.name}
                                </h4>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3 text-sm">
                                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                                  <TrendingUp className="w-3 h-3" />
                                  <span className="font-medium">{neighborhood.grade}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                                  <Home className="w-3 h-3" />
                                  <span className="font-medium">{neighborhood.rent}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                                  <Clock className="w-3 h-3" />
                                  <span className="font-medium">{neighborhood.commute}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Neighborhood Detail Modal */}
      <AnimatePresence>
        {selectedNeighborhood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedNeighborhood(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/40 dark:border-gray-700/60 relative z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Content */}
              <div className="p-8 relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl" />
                
                <div className="relative z-10">
                  {/* Enhanced Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-8 h-8 rounded-full ${getScoreColor(selectedNeighborhood.grade)} shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                          {selectedNeighborhood.name}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-md font-medium">
                            Score: {selectedNeighborhood.score}
                          </span>
                          <span className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md font-medium">
                            Grade: {selectedNeighborhood.grade}
                          </span>
                          <span className="bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md font-medium">
                            Rent: {selectedNeighborhood.rent}
                          </span>
                          <span className="bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-md font-medium">
                            Commute: {selectedNeighborhood.commute}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => setSelectedNeighborhood(null)}
                      whileHover={{ scale: 1.05, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                    >
                      <span className="text-gray-500 dark:text-gray-400 text-2xl font-light">✕</span>
                    </motion.button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Enhanced Overview Section */}
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 dark:border-gray-600/50">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                          <Building className="w-5 h-5 text-teal-500" />
                          <span>Overview</span>
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {selectedNeighborhood.details.overview}
                        </p>
                        
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center space-x-2">
                          <Train className="w-4 h-4 text-blue-500" />
                          <span>Transportation</span>
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {selectedNeighborhood.details.transportation}
                        </p>
                        
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center space-x-2">
                          <Coffee className="w-4 h-4 text-purple-500" />
                          <span>Amenities</span>
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedNeighborhood.details.amenities}
                        </p>
                      </div>
                    </motion.div>

                    {/* Enhanced Stats Section */}
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 dark:border-gray-600/50">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span>Scores & Stats</span>
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {[
                            { label: 'Walk Score', value: selectedNeighborhood.stats.walkScore, color: 'teal' },
                            { label: 'Transit Score', value: selectedNeighborhood.stats.transitScore, color: 'blue' },
                            { label: 'Bike Score', value: selectedNeighborhood.stats.bikeScore, color: 'green' },
                            { label: 'Crime Rate', value: selectedNeighborhood.stats.crimeRate, color: 'purple', isText: true }
                          ].map((stat, index) => (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 relative overflow-hidden"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                  {stat.label}
                                </span>
                                <span className={`font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                  {stat.value}{!stat.isText && '%'}
                                </span>
                              </div>
                              {!stat.isText && (
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <motion.div 
                                    className={`bg-${stat.color}-600 dark:bg-${stat.color}-400 h-2 rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Enhanced Nearby Places */}
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span>Nearby Places</span>
                        </h4>
                        
                        <div className="space-y-3">
                          {selectedNeighborhood.nearbyPlaces.map((place, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-teal-500 rounded-full" />
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {place.name}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                    ({place.type})
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3 text-sm">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                  {place.distance}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                                    {place.rating}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-10 text-center shadow-2xl border border-white/40 dark:border-gray-700/60 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Enhanced loading spinner */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full"
                  />
                </div>
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  Analyzing Neighborhoods
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Finding the best matches for your office location...
                </p>
                
                {/* Loading dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-teal-500 rounded-full"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeighborhoodPage;