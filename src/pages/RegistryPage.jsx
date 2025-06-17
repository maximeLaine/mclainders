import React from 'react';

/**
 * RegistryPage Component
 * Displays wedding registry information
 */
const RegistryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/gallery/agathe_sorlet.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6">🎁 Liste de Mariage 💝</h1>
          <p className="text-xl max-w-2xl mx-auto">Un petit geste pour nous aider dans notre nouvelle vie</p>
        </div>
      </div>

      {/* Registry Content */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-8 text-gray-800">✨ Votre présence est notre plus beau cadeau ✨</h2>
          
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          
          <div className="space-y-6 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              Vous êtes nombreux à venir de très loin pour célébrer notre union.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Votre présence est le plus beau cadeau que vous puissiez nous faire.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Mais si vous souhaitez également nous offrir un des cadeaux qui
              figurent sur notre liste de mariage ou participer à notre cagnotte Lune
              de miel, veuillez cliquer sur le bouton ci-dessous.
            </p>
          </div>
          
          <div className="mt-12">
            <a 
              href="https://www.millemercismariage.com/claireandmaxime/liste.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-full transition-colors duration-300 uppercase tracking-wider"
              onError={(e) => {
                console.error('Error loading registry link');
              }}
            >
              Liste de Mariage de Claire & Maxime
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
