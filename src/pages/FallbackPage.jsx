import React from 'react';

const FallbackPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Claire & Maxime</h1>
        <p className="mb-4 text-gray-700">
          Bienvenue sur notre site de mariage. Nous travaillons actuellement à résoudre un problème technique.
        </p>
        <p className="mb-4 text-gray-700">
          Merci de votre patience. Vous pouvez nous contacter directement à <a href="mailto:mclainders@gmail.com" className="text-blue-500 hover:underline">mclainders@gmail.com</a> si vous avez besoin d'informations.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Rafraîchir la page
        </button>
      </div>
    </div>
  );
};

export default FallbackPage;
