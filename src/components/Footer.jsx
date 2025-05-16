import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and brief description */}
          <div>
            <h3 className="text-2xl font-light mb-4">Claire & Maxime</h3>
            <p className="text-gray-400">
              Nous sommes impatients de célébrer ce jour spécial avec vous.
            </p>
          </div>
          
          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Liens rapides</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-white transition">Accueil</Link>
              <Link to="/notre-clan" className="text-gray-400 hover:text-white transition">Notre clan</Link>
              <Link to="/voyage" className="text-gray-400 hover:text-white transition">Voyage et hébergement</Link>
              <Link to="/liste-de-mariage" className="text-gray-400 hover:text-white transition">Liste de mariage</Link>
              <Link to="/rsvp" className="text-gray-400 hover:text-white transition">RSVP</Link>
            </nav>
          </div>
          
          {/* Column 3: Contact info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">
              Pour toute question, n'hésitez pas à nous contacter :
            </p>
            <p className="text-gray-400">
              <a href="mailto:contact@soria-antoine.com" className="hover:text-white transition">
                contact@soria-antoine.com
              </a>
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Claire & Maxime. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
