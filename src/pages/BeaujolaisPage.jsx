import React, { useState, useMemo } from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';

const BeaujolaisPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const { data: attractions, loading, error } = useSupabaseData('attractions');
  
  // Extract unique categories
  const categories = useMemo(() => {
    if (!attractions || attractions.length === 0) return ['Tous'];
    return ['Tous', ...new Set(attractions.map(item => item.category))];
  }, [attractions]);
  
  // Filter attractions based on active category
  const filteredAttractions = useMemo(() => {
    if (!attractions) return [];
    return activeCategory === 'Tous'
      ? attractions
      : attractions.filter(item => item.category === activeCategory);
  }, [attractions, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/Beaujolais.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Découvrir le Beaujolais</h1>
          <p className="text-xl max-w-2xl">Profitez de votre séjour pour explorer cette magnifique région viticole aux paysages enchanteurs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8">🍷 Lieux à visiter 🌴</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Le Beaujolais regorge de trésors à découvrir, des villages pittoresques aux vignobles renommés. 
            Voici quelques suggestions pour enrichir votre séjour.
          </p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="ml-3 text-lg text-gray-600">Chargement des attractions...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Erreur!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {/* No Data State */}
          {!loading && !error && (!attractions || attractions.length === 0) && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">Aucune attraction disponible pour le moment.</p>
            </div>
          )}

          {/* Content when data is available */}
          {!loading && !error && attractions && attractions.length > 0 && (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeCategory === category 
                      ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                      : 'bg-white text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* No Results for Selected Category */}
              {filteredAttractions.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-xl text-gray-600">Aucune attraction trouvée pour la catégorie sélectionnée.</p>
                  <button 
                    onClick={() => setActiveCategory('Tous')}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300 font-semibold"
                  >
                    Voir toutes les attractions
                  </button>
                </div>
              )}

              {/* Attractions Grid */}
              {filteredAttractions.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAttractions.map((attraction, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={attraction.image || '/gallery/beaujolais/beaujolais-landscape.jpg'} 
                          alt={attraction.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/gallery/beaujolais/beaujolais-landscape.jpg';
                          }}
                        />
                        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg">
                          {attraction.category || 'Attraction'}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-medium mb-3">{attraction.name || 'Lieu à visiter'}</h3>
                        <p className="text-gray-600 mb-4">{attraction.description || 'Aucune description disponible'}</p>
                        
                        <div className="space-y-3 text-sm">
                          {attraction.address && (
                            <div>
                              <p className="font-semibold">Adresse:</p>
                              <p>{attraction.address}</p>
                            </div>
                          )}
                          
                          {attraction.distance && (
                            <div>
                              <p className="font-semibold">Distance:</p>
                              <p>{attraction.distance}</p>
                            </div>
                          )}
                          
                          {attraction.website && (
                            <div>
                              <p className="font-semibold">Site web:</p>
                              <a 
                                href={attraction.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-orange-600 hover:text-orange-700 hover:underline transition-colors duration-300"
                              >
                                {attraction.website}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        {attraction.address && (
                          <div className="mt-6">
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.address)}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors duration-300 font-medium"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              Voir sur Google Maps
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeaujolaisPage;
