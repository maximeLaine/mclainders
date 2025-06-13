import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Logo */}
          <div>
            <h3 className="text-xl font-light mb-2">Claire & Maxime</h3>
          </div>
          
          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-base font-medium mb-2">Liens rapides</h4>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition">Accueil</Link>
              <Link to="/notre-clan" className="text-gray-400 hover:text-white transition">Notre clan</Link>
              <Link to="/logement" className="text-gray-400 hover:text-white transition">Hébergements</Link>
              <Link to="/beaujolais" className="text-gray-400 hover:text-white transition">A voir</Link>
              <Link to="/nous-avons-besoin-de-vous" className="text-gray-400 hover:text-white transition">Aidez-nous</Link>
              <Link to="/rsvp" className="text-gray-400 hover:text-white transition">RSVP</Link>
            </nav>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 className="text-base font-medium mb-2">Contact</h4>
            <p className="text-gray-400 text-sm">
              <a href="mailto:mclainders@gmail.com" className="hover:text-white transition">
                mclainders@gmail.com
              </a>
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-500 text-xs">
          <p>&copy; {currentYear} Claire & Maxime</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
