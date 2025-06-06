import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/gallery/header.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white text-center px-4 pt-52">
          <p className="text-lg md:text-xl mb-4">Venez fêter l'amour avec nous !</p>
          <h1 className="text-5xl md:text-7xl font-light mb-6">Mc Lainders</h1>
          <p className="text-lg md:text-2xl tracking-widest mb-12">07 . 11 . 26</p>
          <Link to="/rsvp" className="inline-block bg-white text-black px-8 py-3 uppercase text-sm font-semibold hover:bg-gray-100 transition">
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
            <p className="text-xl mb-2">de 14 h 00 au bout de la nuit</p>
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
          
          {/* Reception */}
          <div className="text-center">
            <h2 className="text-3xl mb-4">à la Bastide des Hirondelles</h2>
            <p className="text-xl mb-2">Dans le Beaujolais</p>
            <p className="mb-1">Au milieu des vignes</p>
            <p className="mb-4">dans les pierres dorées</p>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl mb-3">Que faire dans la région ?</h2>
            <p className="text-lg text-gray-600">Trouvez votre nid douillet pour la nuit et des occupations pour la journée</p>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gray-400 my-6"></div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
            <Link to="/beaujolais" className="block bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300 max-w-sm w-full group">
              <div className="text-center">
                <div className="bg-purple-100 inline-block p-3 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lieux à visiter</h3>
                <p className="text-gray-600 mb-4">Nos coups de cœur autour du lieu</p>
                <span className="text-green-600 font-medium inline-flex items-center group-hover:underline">
                  En savoir plus
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link to="/logement" className="block bg-white p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300 max-w-sm w-full group">
              <div className="text-center">
                <div className="bg-green-100 inline-block p-3 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Logements</h3>
                <p className="text-gray-600 mb-4">Gites et Airbnb charmants pour les petits groupes</p>
                <span className="text-green-600 font-medium inline-flex items-center group-hover:underline">
                  Voir les options
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* RSVP Call to Action */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_sorlet.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Nous espérons vous compter parmi nous !</h2>
          <Link to="/rsvp" className="inline-block bg-white text-black px-8 py-3 uppercase text-sm font-semibold hover:bg-gray-100 transition">
            CONFIRMEZ VOTRE VENUE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
