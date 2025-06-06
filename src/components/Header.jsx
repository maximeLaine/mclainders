import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-white z-20">
      {/* Logo/Brand */}
      <Link to="/" className="text-xl font-light">Mc Lainders</Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/notre-clan" className="hover:underline">Notre Clan</Link>
        <Link to="/logement" className="hover:underline">Hébergements</Link>
        <Link to="/beaujolais" className="hover:underline">A voir</Link>
        <Link to="/liste-de-mariage" className="hover:underline">Liste de mariage</Link>
        <Link to="/rsvp" className="bg-white text-black px-4 py-2 uppercase text-sm font-semibold hover:bg-gray-100">
          Confirmez votre venue
        </Link>
      </nav>
      
      {/* Mobile Burger Button */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </button>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-90 z-10">
          <div className="flex flex-col p-4">
            <Link 
              to="/" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/notre-histoire" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Notre histoire
            </Link>
            <Link 
              to="/logement" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Hébergement
            </Link>
            <Link 
              to="/beaujolais" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Beaujolais
            </Link>
            <Link 
              to="/liste-de-mariage" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Liste de mariage
            </Link>
            <Link 
              to="/rsvp" 
              className="py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Confirmez votre venue
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
