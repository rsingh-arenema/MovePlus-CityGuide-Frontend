export interface WeatherData {
  temperature: string;
  condition: string;
  icon: string;
  country: string;
}

export interface CategoryData {
  title: string;
  description: string;
  overview?: string;
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

export interface CityData {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  weather?: WeatherData;
  overview: string;
  snippet?: string;
  population?: string;
  area?: string;
  timezone?: string;
  currency?: string;
  language?: string;
  categories: {
    [key: string]: CategoryData;
  };
}