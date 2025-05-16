import React from 'react';

const RegistryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/gallery/agathe_sorlet.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-10">Liste de Mariage</h1>
          
          <p className="text-xl md:text-2xl mb-6 leading-relaxed">
            Vous êtes nombreux à venir de très loin pour célébrer notre union.
          </p>
          <p className="text-xl md:text-2xl mb-6 leading-relaxed">
            Votre présence est le plus beau cadeau que vous puissiez nous faire.
          </p>
          <p className="text-xl md:text-2xl mb-10 leading-relaxed">
            Mais si vous souhaitez également nous offrir un des cadeaux qui
            figurent sur notre liste de mariage ou participer à notre cagnotte Lune
            de miel, veuillez cliquer sur le lien ci-dessous.
          </p>
          
          <a 
            href="https://www.millemercismariage.com/claireandmaxime/liste.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-white text-black px-10 py-4 text-lg uppercase tracking-wider font-medium hover:bg-gray-100 transition"
          >
            LISTE DE MARIAGE DE CLAIRE & MAXIME
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
