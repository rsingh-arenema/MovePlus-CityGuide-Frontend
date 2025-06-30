import { CityData } from '../types/city';

// Comprehensive dummy data for demonstration
const dummyCityData: CityData = {
  id: 'london',
  name: 'London',
  country: 'United Kingdom',
  imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  weather: {
    temperature: '12°C',
    condition: 'Partly Cloudy',
    icon: '⛅',
    country: 'United Kingdom'
  },
  overview: 'London is the capital and largest city of England and the United Kingdom. A global financial and cultural hub, London offers world-class museums, historic landmarks, diverse neighborhoods, and excellent transport links. With over 9 million residents in the greater metropolitan area, it\'s one of the world\'s most cosmopolitan cities.',
  snippet: 'Global financial hub with rich history, world-class culture, and excellent connectivity.',
  population: '9.5 million',
  area: '1,572 km²',
  timezone: 'GMT (UTC+0)',
  currency: 'British Pound (GBP)',
  language: 'English',
  categories: {
    education: {
      title: 'Education',
      description: 'London boasts some of the world\'s most prestigious educational institutions, from primary schools to world-renowned universities.',
      overview: 'The British school system includes 13 years of compulsory education, divided into primary school (ages 4-10), secondary school (ages 10-15), and sixth form (ages 15-17). The primary and secondary school year runs from September to July. A formal exam called the General Certificate of Secondary Education (GCSE) is taken at the end of secondary school and determines admission to sixth form. Subject-based qualifications (A-Levels) are taken at the end of sixth form to determine eligibility for university, further study, vocational training, or employment.',
      items: [
        {
          name: 'Primary Schools',
          value: '2,500+',
          description: 'State and independent primary schools across London',
          details: 'Ages 4-11, following the National Curriculum'
        },
        {
          name: 'Secondary Schools',
          value: '450+',
          description: 'Comprehensive, grammar, and independent schools',
          details: 'Ages 11-18, including sixth forms and colleges'
        },
        {
          name: 'Universities',
          value: '40+',
          description: 'Including Imperial College, UCL, King\'s College',
          details: 'Home to some of the world\'s top-ranked institutions'
        },
        {
          name: 'International Schools',
          value: '150+',
          description: 'Schools offering international curricula',
          details: 'IB, American, French, German, and other systems'
        }
      ],
      subsections: {
        stateSchools: {
          title: 'State Schools',
          description: 'State schools are funded by the government, follow the national curriculum, and give priority to students who reside in the nearby geographic area. Parents who would like to enroll their child in a school outside their catchment area can apply to do so, but acceptance is not guaranteed. State schooling is free of charge for all legal residents.',
          items: [
            {
              name: 'Application Process',
              value: 'Online',
              description: 'Apply through local council websites'
            },
            {
              name: 'Catchment Areas',
              value: 'Varies',
              description: 'Distance-based admission criteria'
            }
          ]
        },
        independentSchools: {
          title: 'Independent Schools',
          description: 'Independent schools (also called private schools) charge fees and have their own admission processes. They often have smaller class sizes and more resources.',
          items: [
            {
              name: 'Average Fees',
              value: '£15,000-£45,000',
              description: 'Annual fees vary significantly by school'
            },
            {
              name: 'Entrance Exams',
              value: 'Required',
              description: 'Most require entrance examinations'
            }
          ]
        }
      }
    },
    transportation: {
      title: 'Transportation',
      description: 'London has one of the world\'s most comprehensive public transport networks, making it easy to navigate the city without a car.',
      overview: 'Transport for London (TfL) operates an integrated network of buses, underground trains (the Tube), overground trains, trams, and river services. The system uses contactless payment and Oyster cards for seamless travel across all modes.',
      items: [
        {
          name: 'Underground Lines',
          value: '11',
          description: '272 stations across Greater London',
          details: 'Operates 5am-12:30am (later on weekends)'
        },
        {
          name: 'Bus Routes',
          value: '700+',
          description: '24-hour service on many routes',
          details: 'Extensive network covering all areas'
        },
        {
          name: 'Oyster Card Zones',
          value: '9',
          description: 'Zone-based pricing system',
          details: 'Zone 1-2 covers central London'
        },
        {
          name: 'Cycle Hire Stations',
          value: '800+',
          description: 'Santander Cycles (Boris Bikes)',
          details: '11,500 bikes available across the city'
        }
      ],
      subsections: {
        tubeSystem: {
          title: 'London Underground',
          description: 'The Tube is the backbone of London\'s transport system, with 11 color-coded lines serving 272 stations.',
          items: [
            {
              name: 'Peak Hours',
              value: '7:30-9:30am, 5-7pm',
              description: 'Busiest travel times'
            },
            {
              name: 'Night Tube',
              value: 'Fri-Sat',
              description: 'Selected lines run all night'
            }
          ]
        },
        buses: {
          title: 'Bus Network',
          description: 'London\'s iconic red buses provide comprehensive coverage with over 700 routes operating across the city.',
          items: [
            {
              name: 'Night Buses',
              value: '50+ routes',
              description: 'Operate when Tube is closed'
            },
            {
              name: 'Frequency',
              value: '2-15 minutes',
              description: 'Varies by route and time'
            }
          ]
        }
      }
    },
    travel: {
      title: 'Travel & Airports',
      description: 'London is a major international gateway with multiple airports and excellent rail connections to Europe and beyond.',
      overview: 'London is served by six airports, with Heathrow being one of the world\'s busiest. The city is also connected to continental Europe via the Channel Tunnel and Eurostar high-speed rail service.',
      items: [
        {
          name: 'Heathrow Airport',
          value: 'LHR',
          description: 'Main international hub, 4 terminals',
          details: '15 miles west, Tube/Express connections'
        },
        {
          name: 'Gatwick Airport',
          value: 'LGW',
          description: 'Second busiest, 30 miles south',
          details: 'Gatwick Express to Victoria (30 mins)'
        },
        {
          name: 'Eurostar Destinations',
          value: '15+',
          description: 'High-speed rail to Europe',
          details: 'Paris (2h 15m), Brussels (2h), Amsterdam (3h 40m)'
        },
        {
          name: 'International Routes',
          value: '350+',
          description: 'Direct flights worldwide',
          details: 'Connections to every continent'
        }
      ]
    },
    banking: {
      title: 'Banking & Finance',
      description: 'London is a global financial center with comprehensive banking services and fintech innovation.',
      overview: 'As one of the world\'s leading financial centers, London offers extensive banking services from traditional high street banks to innovative digital-only providers. The city is home to the Bank of England and numerous international financial institutions.',
      items: [
        {
          name: 'Major Banks',
          value: '50+',
          description: 'Including Barclays, HSBC, Lloyds, NatWest',
          details: 'Extensive branch and ATM networks'
        },
        {
          name: 'Digital Banks',
          value: '20+',
          description: 'Monzo, Starling, Revolut, and others',
          details: 'App-based banking with competitive rates'
        },
        {
          name: 'ATMs',
          value: '70,000+',
          description: 'Widespread availability',
          details: 'Most are free to use for UK account holders'
        },
        {
          name: 'Currency Exchange',
          value: 'Everywhere',
          description: 'Banks, bureaux de change, airports',
          details: 'Competitive rates in central London'
        }
      ]
    },
    internet: {
      title: 'Internet & TV',
      description: 'London offers excellent internet connectivity with multiple providers offering high-speed broadband and comprehensive TV packages.',
      overview: 'The UK has well-developed telecommunications infrastructure with fiber broadband widely available. Multiple providers compete on price and service, offering bundled packages for internet, TV, and phone services.',
      items: [
        {
          name: 'Fiber Broadband',
          value: 'Up to 1Gbps',
          description: 'Available in most areas',
          details: 'Virgin Media, BT, Sky, TalkTalk'
        },
        {
          name: 'Average Speed',
          value: '67 Mbps',
          description: 'UK average download speed',
          details: 'London typically exceeds national average'
        },
        {
          name: 'TV Channels',
          value: '500+',
          description: 'Freeview, Sky, Virgin packages',
          details: 'Including international channels'
        },
        {
          name: 'Streaming Services',
          value: 'All major',
          description: 'Netflix, Amazon Prime, Disney+, etc.',
          details: 'High-speed internet supports 4K streaming'
        }
      ]
    },
    mobile: {
      title: 'Mobile Phones',
      description: 'Excellent mobile coverage across London with competitive providers and comprehensive 4G/5G networks.',
      overview: 'The UK mobile market is highly competitive with four major networks (EE, O2, Three, Vodafone) plus numerous virtual operators. 5G coverage is expanding rapidly across London.',
      items: [
        {
          name: 'Network Coverage',
          value: '99%+',
          description: '4G coverage across London',
          details: '5G available in most central areas'
        },
        {
          name: 'Major Networks',
          value: '4',
          description: 'EE, O2, Three, Vodafone',
          details: 'Plus 20+ virtual network operators'
        },
        {
          name: 'Average Monthly Cost',
          value: '£20-50',
          description: 'Varies by data allowance',
          details: 'Unlimited plans available from £20'
        },
        {
          name: 'International Roaming',
          value: 'EU included',
          description: 'Many plans include EU roaming',
          details: 'Additional charges for other countries'
        }
      ]
    },
    healthcare: {
      title: 'Healthcare',
      description: 'The NHS provides free healthcare to residents, with excellent hospitals and medical facilities throughout London.',
      overview: 'The National Health Service (NHS) provides free healthcare to UK residents. London has some of the world\'s leading hospitals and medical research facilities, plus numerous private healthcare options.',
      items: [
        {
          name: 'NHS Hospitals',
          value: '40+',
          description: 'Including world-renowned teaching hospitals',
          details: 'Free treatment for residents'
        },
        {
          name: 'GP Practices',
          value: '1,500+',
          description: 'Local doctors throughout London',
          details: 'Register with local practice'
        },
        {
          name: 'Private Hospitals',
          value: '50+',
          description: 'Premium healthcare options',
          details: 'Insurance or self-pay'
        },
        {
          name: 'Pharmacies',
          value: '2,000+',
          description: 'Boots, independent pharmacies',
          details: 'Many open late or 24 hours'
        }
      ]
    }
  }
};

const API_BASE_URL = 'https://city-guide-backend.onrender.com/api';

export async function fetchCityData(city: string): Promise<CityData> {
  try {
    // For now, return dummy data to showcase the full functionality
    // In production, this would make the actual API call
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Uncomment below for actual API integration
    /*
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        city,
        includeDetails: true,
        sections: [
          'overview',
          'education', 
          'transportation', 
          'travel', 
          'banking', 
          'internet', 
          'mobile',
          'healthcare'
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as CityData;
    */
    
    return dummyCityData;
  } catch (error) {
    console.error('Failed to fetch city data:', error);
    // Return dummy data as fallback
    return dummyCityData;
  }
}

export async function askCityQuestion(city: string, query: string): Promise<CityData> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city, query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as CityData;
  } catch (error) {
    console.error('Failed to ask city question:', error);
    throw error;
  }
}