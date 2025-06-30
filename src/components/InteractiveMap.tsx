import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
}

interface InteractiveMapProps {
  neighborhoods: NeighborhoodData[];
  officeLocation?: {
    address: string;
    coordinates: [number, number];
    neighborhood: string;
  };
  onNeighborhoodClick: (neighborhood: NeighborhoodData) => void;
  selectedNeighborhood?: NeighborhoodData | null;
}

// Custom marker icons based on grade
const createCustomIcon = (grade: string, isSelected: boolean = false) => {
  const getColor = (grade: string) => {
    switch (grade) {
      case 'A+': return '#10b981'; // emerald-500
      case 'A': return '#22c55e';   // green-500
      case 'B+': return '#eab308';  // yellow-500
      case 'B': return '#f97316';   // orange-500
      default: return '#ef4444';    // red-500
    }
  };

  const color = getColor(grade);
  const size = isSelected ? 35 : 25;
  const borderWidth = isSelected ? 4 : 2;

  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: ${borderWidth}px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${size > 30 ? '12px' : '10px'};
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        ${grade}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Office marker icon
const officeIcon = L.divIcon({
  html: `
    <div style="
      width: 30px;
      height: 30px;
      background-color: #dc2626;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2s infinite;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    </style>
  `,
  className: 'office-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  neighborhoods,
  officeLocation,
  onNeighborhoodClick,
  selectedNeighborhood
}) => {
  // Default center on London
  const defaultCenter: [number, number] = [51.5074, -0.1278];
  const mapCenter = officeLocation?.coordinates || defaultCenter;

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Office Location Marker */}
        {officeLocation && (
          <Marker
            position={officeLocation.coordinates}
            icon={officeIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">Your Office</h3>
                <p className="text-sm text-gray-600">{officeLocation.address}</p>
                <p className="text-xs text-gray-500 mt-1">{officeLocation.neighborhood}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Neighborhood Markers */}
        {neighborhoods.map((neighborhood) => (
          <Marker
            key={neighborhood.id}
            position={neighborhood.coordinates}
            icon={createCustomIcon(
              neighborhood.grade, 
              selectedNeighborhood?.id === neighborhood.id
            )}
            eventHandlers={{
              click: () => onNeighborhoodClick(neighborhood),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{neighborhood.name}</h3>
                  <span className={`px-2 py-1 text-xs font-bold text-white rounded ${
                    neighborhood.grade === 'A+' ? 'bg-emerald-500' :
                    neighborhood.grade === 'A' ? 'bg-green-500' :
                    neighborhood.grade === 'B+' ? 'bg-yellow-500' :
                    neighborhood.grade === 'B' ? 'bg-orange-500' : 'bg-red-500'
                  }`}>
                    {neighborhood.grade}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium">{neighborhood.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent:</span>
                    <span className="font-medium">{neighborhood.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commute:</span>
                    <span className="font-medium">{neighborhood.commute}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-teal-600">{neighborhood.stats.walkScore}</div>
                      <div className="text-gray-500">Walk Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-teal-600">{neighborhood.stats.transitScore}</div>
                      <div className="text-gray-500">Transit</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onNeighborhoodClick(neighborhood)}
                  className="w-full mt-3 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;