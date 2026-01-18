import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/gallery/baniere_accueil_1.jpeg')", backgroundPosition: "center 52%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white text-center px-4 pt-52 md:pr-20">
          <p className="text-lg md:text-xl mb-4">💖 Venez fêter l'amour avec nous ! 💖</p>
          <h1 className="text-5xl md:text-7xl font-light mb-6">Mc Lainders</h1>
          <p className="text-lg md:text-2xl tracking-widest mb-12">07 . 11 . 26</p>
          <Link to="/confirmez-votre-venue" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full uppercase text-sm font-semibold hover:bg-orange-600 transition-colors duration-300">
            CONFIRMEZ VOTRE VENUE
          </Link>
        </div>
      </div>      

     
      {/* Ceremony & Reception Section */}
      <section className="py-20 px-6 bg-white ">
        <div className="max-w-4xl mx-auto text-center" >
          <h2 className="text-3xl mb-6">Nous vous donnons rendez-vous</h2>
        </div>
        <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Ceremony */}
          <div className="text-center">
            <h2 className="text-3xl mb-4">Le samedi 7 novembre 2026</h2>
            <p className="text-xl mb-2">de 14h00 au bout de la nuit</p>
            <p className="mb-1">Au milieu des vignes</p>
            <p className="mb-4">dans les pierres dorées</p>   
          </div>
          
          {/* Reception */}
          <div className="text-center">
            <h2 className="text-3xl mb-4">à la Bastide des Hirondelles</h2>
            <p className="text-xl mb-2">Dans le Beaujolais</p>
            <a href="https://maps.google.com/?q=253+Rte+du+Gonnet,+Val+d'Oingt,+69620,+France" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              <p className="mb-1">253 Rte du Gonnet</p>
              <p className="mb-4 flex items-center justify-center">
                Val d'Oingt, 69620
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* RSVP Call to Action */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_test_2.png')", backgroundPosition: "center 20%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Nous espérons vous compter parmi nous! 🎉</h2>
          <Link to="/confirmez-votre-venue" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full uppercase text-sm font-semibold hover:bg-orange-600 transition-colors duration-300">
            CONFIRMEZ VOTRE VENUE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
