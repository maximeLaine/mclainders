import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/gallery/ghibli.jpg')" }}>
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

      {/* Discover Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-6">Découvrez comment tout a commencé</h2>
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          <Link to="/notre-histoire" className="inline-block bg-black text-white px-6 py-2 uppercase text-sm font-semibold hover:bg-gray-800 transition">
            Notre histoire
          </Link>
        </div>
      </section>
      
      {/* Ceremony & Reception Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Ceremony */}
          <div className="text-center">
            <h2 className="text-3xl mb-4">Cérémonie</h2>
            <p className="text-xl mb-2">16 h 00</p>
            <p className="mb-1">Grace Church</p>
            <p className="mb-1">123 rue Démo</p>
            <p className="mb-4">Flagstaff, AZ 12345</p>
            <Link to="/voyage" className="inline-block underline text-sm">Carte</Link>
          </div>
          
          {/* Reception */}
          <div className="text-center">
            <h2 className="text-3xl mb-4">Réception</h2>
            <p className="text-xl mb-2">De 16 h 30 à 22 h 00</p>
            <p className="mb-1">The Barrel Keg</p>
            <p className="mb-1">123 rue Démo</p>
            <p className="mb-4">Flagstaff, AZ 12345</p>
            <Link to="/voyage" className="inline-block underline text-sm">Carte</Link>
          </div>
        </div>
      </section>
      
      {/* RSVP Call to Action */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/gallery/agathe_sorlet.jpeg')" }}>
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
