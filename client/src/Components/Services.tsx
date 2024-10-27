import React from 'react';

// Define type for the service items
interface ServiceItem {
  name: string;
  icon: string; // Use emojis here or replace with your own SVG component or icon library component
}

// Array of service items
const services: ServiceItem[] = [
  { name: 'Restaurants', icon: '🍽️' },
  { name: 'Hotels', icon: '🏨' },
  { name: 'Beauty Spa', icon: '💆' },
  { name: 'Home Decor', icon: '🛋️' },
  { name: 'Hospitals', icon: '🏥' },
  { name: 'Contractors', icon: '👷' },
  { name: 'PG/Hostels', icon: '🏢' },
  { name: 'Dentists', icon: '🦷' },
  { name: 'Gym', icon: '🏋️' },
  { name: 'Courier Service', icon: '📦' },
];

const ServiceGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {services.map((service, index) => (
        <button
          key={index}
          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
        >
          <span className="text-4xl mb-2">{service.icon}</span>
          <span className="text-sm font-medium text-gray-700">{service.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceGrid;