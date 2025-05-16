import React from 'react';
import accommodations from '../data/accommodations.json';

const TravelPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/gallery/van_max_seul.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Voyage et hébergement</h1>
          <p className="text-xl max-w-2xl">Si vous n'avez pas votre propre Dobby (notre van libre 🧦), voici quelque infos pour vous.</p>
        </div>
      </div>

      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-16">Conseils pour se loger</h2>

          <div className="grid grid-cols-1 gap-10">
            {accommodations.map((a, i) => (
              <div key={i} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col md:flex-row">
                {a.image && (
                  <div className="md:w-1/2">
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover" style={{ minHeight: '250px' }} />
                  </div>
                )}
                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl font-medium mb-4">{a.name}</h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Contact:</p>
                      <p className="whitespace-pre-line">{a.contact}</p>
                    </div>

                    {a.website && a.website !== "Non" && (
                      <div>
                        <p className="font-semibold">Site web:</p>
                        <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
                          {a.website}
                        </a>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">Capacity:</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPage;
