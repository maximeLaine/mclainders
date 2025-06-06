import React, { useState } from 'react';
import attractions from '../data/beaujolais_attractions.json';

const BeaujolaisPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  
  // Extract unique categories
  const categories = ['Tous', ...new Set(attractions.map(item => item.category))];
  
  // Filter attractions based on active category
  const filteredAttractions = activeCategory === 'Tous' 
    ? attractions 
    : attractions.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/beaujolais/beaujolais-landscape.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Découvrir le Beaujolais</h1>
          <p className="text-xl max-w-2xl">Profitez de votre séjour pour explorer cette magnifique région viticole aux paysages enchanteurs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8">Lieux à visiter</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Le Beaujolais regorge de trésors à découvrir, des villages pittoresques aux vignobles renommés. 
            Voici quelques suggestions pour enrichir votre séjour.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category 
                  ? 'bg-purple-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-700 hover:bg-purple-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Attractions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAttractions.map((attraction, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg">
                    {attraction.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-3">{attraction.name}</h3>
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Adresse:</p>
                      <p>{attraction.address}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Distance:</p>
                      <p>{attraction.distance}</p>
                    </div>
                    
                    {attraction.website && (
                      <div>
                        <p className="font-semibold">Site web:</p>
                        <a 
                          href={attraction.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-300"
                        >
                          {attraction.website}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.address)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeaujolaisPage;
