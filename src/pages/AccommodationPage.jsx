import React, { useState } from 'react';
import accommodations from '../data/accommodations.json';

const AccommodationPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  
  // Extract unique categories
  const categories = ['Tous', ...new Set(accommodations.map(item => {
    if (item.contact && item.contact.includes('Airbnb')) {
      return 'Airbnb';
    } else {
      return 'Gîte';
    }
  }))];
  
  // Filter accommodations based on active category
  const filteredAccommodations = activeCategory === 'Tous' 
    ? accommodations 
    : accommodations.filter(item => {
        if (activeCategory === 'Airbnb') {
          return item.contact && item.contact.includes('Airbnb');
        } else {
          return !item.contact || !item.contact.includes('Airbnb');
        }
      });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/dobby_van.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Hébergement</h1>
          <p className="text-xl max-w-2xl">Si vous n'avez pas votre propre Dobby (notre van libre 🧦), voici quelque infos pour vous.</p>
        </div>
      </div>

      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8">Conseils pour se loger</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Voici une sélection d'hébergements à proximité du lieu de la fête pour vous permettre de profiter pleinement de l'événement.
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

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAccommodations.map((a, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  {a.image && (
                    <img 
                      src={a.image} 
                      alt={a.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  )}
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg">
                    {a.contact && a.contact.includes('Airbnb') ? 'Airbnb' : 'Gîte'}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-3">{a.name}</h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Contact:</p>
                      <p className="whitespace-pre-line">{a.contact}</p>
                    </div>
                    
                    {a.website && a.website !== "Non" && (
                      <div>
                        <p className="font-semibold">Site web:</p>
                        <a 
                          href={a.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-purple-600 hover:text-purple-800 hover:underline transition-colors duration-300 break-words"
                        >
                          {a.website}
                        </a>
                      </div>
                    )}
                    
                    <div>
                      <p className="font-semibold">Capacité:</p>
                      <p className="whitespace-pre-line">{a.capacity}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Logements:</p>
                      <p className="whitespace-pre-line">{a.chambre}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Distance du lieu de la fête:</p>
                      <p>{a.distance}</p>
                    </div>
                  </div>
                  
                  {a.contact && a.contact !== "Airbnb" && (
                    <div className="mt-6">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.name + " Val d'Oingt")}`}
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;
